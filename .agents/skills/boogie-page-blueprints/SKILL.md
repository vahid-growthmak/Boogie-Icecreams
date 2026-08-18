---
name: boogie-page-blueprints
description: Section-by-section layout recipes for the three Boogie Ice Creams page templates — Home, Products listing, Product detail — plus the cart drawer. Use when building, composing, reordering or removing a page section, when asking what goes on a page or in what order, or when a section's grid split, background or content is in question. Triggers on "build the home page", "what section comes next", "hero layout", "best sellers", "trust band", "category tiles", "add a section", "reorder", "product listing page", "PDP layout", "buy panel", "cart drawer".
---

# Boogie page blueprints

Three templates. Everything else is a drawer, a modal, or a non-indexed utility route.
Section order comes from the Berry's blueprint. **Do not reorder without writing down
the reason** — the order is the argument the page makes.

```
/                     Home            template 1
/products             Shop all        template 2
/products/[slug]      Product detail  template 3
CartDrawer            global slide-over, any route
```

## Home (`/`)

| # | Section | Component | Layout | Content |
|---|---|---|---|---|
| 1 | Header | `layout/Header` | Sticky. Transparent → `--paper` with a `--gold` hairline after 80px scroll. Centred wordmark, 2 links each side, cart button right. | `OUR STORY  OUR PRODUCTS · boogie · TRADE  CONTACT  [cart ●3]` |
| 2 | Hero | `home/Hero` | **5/7 split.** Left: display-l headline over 3 lines, 2 body paragraphs, underlined text-link CTA. Right: petal + tilted tub render + splash. | "Small batch. Big boogie." + provenance + `OUR PRODUCTS →` |
| 3 | Best Sellers | `home/BestSellers` | Centred h2, 2 circular carousel arrows top-right. 4-up → 2-up `md` → 1.4-up scroll-snap mobile. Black rectangular `VIEW COLLECTION` below. | 4–8 featured products, each with `ⓘ NUTRITIONAL INFORMATION` disclosure |
| 4 | Natural & Simple `#story` | `home/StorySplit` | 6/6, image left with a left bleed. | h2 mulberry, body-lead, body, `OUR STORY →` |
| 5 | Made With Passion | `home/PassionCollage` | display-xl headline overlapping a `--sand` panel; body column left, image right, offset. Gold line-art fruit at 8% opacity behind. | Craft / process story |
| 6 | Ice Cream Heaven | `home/PassionCollage` (variant) | Second offset image lower-left overlapping the sand panel; text right. | Sizes 100ml / 500ml / 2.4L / 5L, trade note |
| 7 | Trust band | `home/TrustBand` | Full-bleed `--ink-plum`. 4 gold circular seals + short copy. *(from Novella)* | No preservatives · Real fruit · Fresh cow milk · Small batches |
| 8 | Buy Boogie | `home/CategoryTiles` | 3 equal image tiles, white overlaid label. *(from Sandra)* | `TAKE HOME` · `PARTIES` · `TRADE` → `#trade` |
| 9 | Testimonial | `home/Testimonial` | Centred, wide margins, Fraunces 400 @ 1.5rem / 1.6. Attribution in caption. | One quote, static in v1 |
| 10 | Trade `#trade` | `home/TradeForm` | 6/6, form right. | Name, business, email, phone, message → `/api/trade-enquiry` |
| 11 | Footer | `layout/Footer` | `--ink-plum`. Row 1: wordmark left, nav centre, social right. Row 2 above a hairline: legal, copyright, credit. | — |

`OUR STORY` and `TRADE` are anchor scrolls to `#story` and `#trade`. `CONTACT` opens a
drawer. This is how the site keeps three templates without hiding content.

**Acceptance**
- [ ] Hero LCP element is the product image, `priority`, AVIF/WebP, ≤ 180KB
- [ ] Best Sellers carousel is keyboard-operable and swipeable, with visible focus
- [ ] Every section reveals once on scroll; CLS < 0.02
- [ ] Trade form validates client and server with the same Zod schema
- [ ] Correct at 360, 768, 1024, 1440, 1920

## Products (`/products`)

| # | Section | Detail |
|---|---|---|
| 1 | Page hero | Compact band. Eyebrow `OUR PRODUCTS`, display-l title, one-line description. Gold petal behind the featured flavour, right. |
| 2 | Filter row | Sticky under the header. Chips `ALL · ICE CREAM · SORBET · DAIRY FREE · DESSERTS`. Sort select Featured / A–Z / Price. **Filters are URL state** (`?category=sorbet&sort=price-asc`) — shareable and server-rendered. |
| 3 | Grid | 4-up `xl` / 3-up `lg` / 2-up `sm` / 1-up mobile. Card: image on white, serif name, flavour-note caption, price, quick-add that appears on hover and is always visible on touch. |
| 4 | Load more | `searchParams` pagination, 12 per page. **No infinite scroll** — it breaks the footer. |
| 5 | Empty state | "No flavours match that combination yet." + a button that clears filters. |

**Acceptance**
- [ ] Filtering is server-rendered; no flash of unfiltered content
- [ ] Quick-add opens the drawer with the 500ml default variant
- [ ] Fixed aspect-ratio image boxes; nothing shifts while loading
- [ ] Unknown `?category=` renders the empty state, never a 500

## Product detail (`/products/[slug]`)

Above the fold, two columns: **gallery left (7), buy panel right (5)**.

**Gallery** — primary image on the gold petal, 3 thumbnails below, click swaps,
arrow-key navigable.

**Buy panel**, in this order:
1. Eyebrow: category
2. `h1` product name — display-l, mulberry
3. Strapline — body-lead
4. Price, reactive to selected size
5. Size selector — segmented control, 100ml / 500ml / 2.4L. Out-of-stock sizes are
   **disabled with a visible reason, not hidden**
6. Quantity stepper
7. `ADD TO CART` — full-width black rectangle, optimistic, opens the drawer
8. Delivery / insulated-packaging note in caption style
9. Accordion: **Ingredients** · **Allergens** · **Nutrition** (per 100g table) · **Storage**.
   Allergens are never collapsed by default for items containing top allergens.

**Below the fold** — flavour story 6/6 text + image; `YOU MAY ALSO LIKE` with 4
products from the same category, falling back to best-sellers.

**Acceptance**
- [ ] `generateStaticParams` pre-renders every product; ISR 3600
- [ ] `generateMetadata` returns unique title, description and OG image
- [ ] `Product` + `Offer` JSON-LD valid in Rich Results Test
- [ ] Allergen block reachable without JavaScript
- [ ] Unknown slug → `notFound()` → styled 404

## Cart drawer (global)

Right slide-over, 420px desktop / full-width mobile. Focus-trapped, `Esc` closes,
focus returns to the trigger. Line items with thumbnail, name, size, stepper, remove.
Subtotal, delivery-threshold nudge ("₹300 more for free delivery"), `CHECKOUT` primary
and `Continue shopping` ghost. Empty state links to `/products`. Persists to
`localStorage` and rehydrates without a flash of empty cart.

## Adding a section that isn't here

Don't, silently. Say which blueprint section it extends or replaces, why the page needs
it, and where it sits in the order. A new section that duplicates an existing one's job
is scope creep — the PRD's non-goals for v1 are accounts, subscriptions, reviews/UGC,
multi-currency, blog, wholesale portal, live inventory and loyalty.
