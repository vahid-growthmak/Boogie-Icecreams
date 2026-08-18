---
name: boogie-seo-schema
description: Per-route metadata, JSON-LD structured data, canonical URLs, sitemap, robots and Open Graph images for Boogie Ice Creams. Use when adding or editing metadata or generateMetadata, writing a page title or description, adding structured data, touching lib/seo.ts, app/sitemap.ts, app/robots.ts or opengraph-image.tsx, or when a page needs to be indexable and shareable. Triggers on "add metadata", "generateMetadata", "page title", "meta description", "SEO", "canonical", "open graph", "OG image", "JSON-LD", "structured data", "product schema markup", "rich results", "sitemap", "robots.txt".
---

# SEO and structured data

Everything lives in `lib/seo.ts`. Route files call builders; they do not hand-write
metadata objects.

## Every route needs

| Field | Rule |
|---|---|
| `title` | Unique. `<Page> · Boogie Ice Creams` via `metadata.title.template` in the root layout |
| `description` | Unique, 140–160 chars, written to brand voice, no keyword stuffing |
| `alternates.canonical` | Absolute, built from `NEXT_PUBLIC_SITE_URL` |
| `openGraph` | `title`, `description`, `url`, `type`, `images[]`, `siteName` |
| `twitter` | `summary_large_image` |

```ts
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: { default: 'Boogie Ice Creams', template: '%s · Boogie Ice Creams' },
};
```

## Canonicals and filtered URLs

`/products?category=sorbet&sort=price-asc` is shareable and server-rendered, but it is
**not a separate indexable page**. Filtered and paginated views canonicalise to
`/products`. Do not generate a canonical per filter combination, and do not add filter
values to the sitemap.

## JSON-LD

Rendered as `<script type="application/ld+json">` with `JSON.stringify`, built by typed
helpers in `lib/seo.ts`. Never string-concatenate JSON, and never emit a field we can't
substantiate.

| Where | Types |
|---|---|
| Root layout | `Organization`, `WebSite` |
| `/products/[slug]` | `Product` + `Offer` + `BreadcrumbList` |

```ts
buildProductJsonLd(product, variant) → {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name, description, image: [...],          // absolute URLs
  sku: variant.sku,
  brand: { '@type': 'Brand', name: 'Boogie Ice Creams' },
  offers: {
    '@type': 'Offer',
    price: (variant.price / 100).toFixed(2),  // schema.org wants a decimal string —
    priceCurrency: 'INR',                     // this is the ONLY place a price divides
    availability: variant.inStock
      ? 'https://schema.org/InStock'
      : 'https://schema.org/OutOfStock',
    url: canonical,
  },
}
```

**No `aggregateRating` and no `review` in v1.** Reviews are a v1 non-goal; emitting
rating markup without reviews is a manual-action risk. No fabricated `award` property
either — same rule as `boogie-brand-voice`.

Validate three sample products in the Rich Results Test before calling M5 done.

## Open Graph images

- Site-wide default: `app/opengraph-image.tsx`, 1200×630, `--paper` ground, wordmark,
  gold hairline.
- Per-product: `app/products/[slug]/opengraph-image.tsx` using `ImageResponse` — product
  render on the paper background, name in Fraunces, strapline in Hanken. Fonts are
  fetched from `public/fonts/` at edge runtime, not from Google.
- `alt`, `size` and `contentType` exported alongside.

## Sitemap and robots

`app/sitemap.ts` returns `/`, `/products`, and one entry per product from
`getAllProducts()`. `lastModified` comes from the product record, not `new Date()` — a
sitemap that claims everything changed today is noise.

`app/robots.ts` allows everything except `/api/`, and points at the sitemap. On preview
deployments (`VERCEL_ENV !== 'production'`) it returns `disallow: '/'` so staging never
gets indexed.

## Headings and links

- Exactly one `<h1>` per route. On the PDP that is the product name; on `/products` the
  page title; on Home the hero headline.
- Heading levels descend without skipping — `boogie-accessibility` enforces the same rule.
- Internal links use `<Link>` with real href text. No "click here", no `href="#"` on
  buttons.
- `next/image` everywhere with meaningful `alt` — described in `boogie-brand-voice`.

## Checklist per route

- [ ] Unique title and description
- [ ] Absolute canonical
- [ ] OG image resolves and renders at 1200×630
- [ ] Correct JSON-LD present and valid
- [ ] One `h1`, no skipped levels
- [ ] Appears in `sitemap.xml` if it should be indexed, absent if not
