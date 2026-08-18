---
name: nextjs-app-router-conventions
description: Routing, rendering strategy, data fetching, searchParams, metadata, caching, route handlers and error boundaries for the Boogie Ice Creams Next.js 15 App Router project. Use for any file under app/ — pages, layouts, route handlers, sitemap, robots, not-found, error — and whenever choosing between static, ISR and dynamic rendering, or wiring URL state. Triggers on "add a route", "app router", "searchParams", "generateStaticParams", "generateMetadata", "revalidate", "route handler", "server action", "notFound", "error boundary", "loading state", "caching".
---

# Next.js App Router conventions

Next.js 15, App Router, React 19, TypeScript `strict` with `noUncheckedIndexedAccess`.

## Route map

```
app/
├── layout.tsx                 fonts, providers, Header, Footer, CartDrawer
├── page.tsx                   Home
├── products/
│   ├── page.tsx               listing, searchParams-driven
│   └── [slug]/page.tsx        detail
├── api/
│   ├── checkout/route.ts      → hosted checkout session
│   └── trade-enquiry/route.ts → Resend / CRM
├── sitemap.ts  robots.ts  opengraph-image.tsx
├── not-found.tsx  error.tsx  globals.css
```

Nothing else becomes a page. `?checkout=success|cancel` returns to `/` and renders a
confirmation panel — it is a searchParam on Home, not a route.

## Rendering strategy — decided, not per-case

| Route | Strategy | Why |
|---|---|---|
| `/` | Static, `revalidate = 3600` | Changes rarely, must be instant |
| `/products` | Static shell + `searchParams` server filtering | Shareable filtered URLs, no client flash |
| `/products/[slug]` | `generateStaticParams` + `revalidate = 3600` | Every flavour pre-rendered |
| `/api/*` | Dynamic, `runtime = 'nodejs'` | Payment SDK needs Node |

Never add `export const dynamic = 'force-dynamic'` to a page to make something work.
That is always a symptom — find the accidental dynamic API (`headers()`, `cookies()`,
`Math.random()` at module scope) and remove it.

## searchParams and URL state

In Next.js 15 `params` and `searchParams` are **Promises**. Await them.

```tsx
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const filters = FilterSchema.safeParse(sp);       // Zod, lib/schema.ts
  const query = filters.success ? filters.data : DEFAULT_FILTERS;
  const { items, total } = getProducts(query);      // server-only catalog read
  ...
}
```

- **Filter and sort state lives in the URL**, never in client state. `FilterBar` is a
  client component that calls `router.replace()` with new params; the server re-renders
  the grid. There is no client-side filtering of a full product list.
- Invalid params must **fall through to the empty state**, never throw. `?category=llama`
  renders "No flavours match that combination yet." with a clear-filters button.
- Pagination is `?page=` with 12 per page. No infinite scroll.

## Data fetching

- `lib/catalog.ts` is the only module that reads `content/products/*.ts`. Add
  `import 'server-only'` at its top.
- Page components read data directly — no `fetch` to our own API routes from a page.
- Route handlers are for things the browser calls: checkout session creation, webhooks,
  trade enquiry. Not for feeding our own pages.

## Metadata

Every route exports `metadata` or `generateMetadata`. Detail pages build theirs from
the product record via `lib/seo.ts`. See `boogie-seo-schema` for the required fields,
JSON-LD and OG images.

```tsx
export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return buildProductMetadata(product);   // lib/seo.ts
}
```

## Errors and missing data

- Unknown slug → `notFound()`. It renders `app/not-found.tsx`, which is styled with
  brand tokens and links back to `/products`. Never let an undefined product reach JSX.
- `app/error.tsx` is a client component with a `reset()` button and brand styling. It
  never prints a stack trace to the user.
- Add `loading.tsx` only where a route is genuinely async at request time. On
  statically rendered routes it is noise.

## Route handlers

```ts
export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = CheckoutInputSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: 'Invalid request' }, { status: 400 });
  // prices are re-read from the catalog by SKU — never trusted from the client
}
```

- Validate every body with the shared Zod schema. Return typed JSON, never `throw`.
- Webhooks verify their signature before doing anything else, and read the raw body.
- Secrets are read from `process.env` inside the handler. No secret is ever referenced
  in a file that a client component imports, and no secret name starts with
  `NEXT_PUBLIC_`.

## Server actions

Used for the trade form only in v1. Same Zod schema client and server, `revalidatePath`
if anything cached changed, and a typed `{ ok, fieldErrors }` return that the form
renders — no thrown errors as control flow.
