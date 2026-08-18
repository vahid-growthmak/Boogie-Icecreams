# PRD — Boogie Ice Creams Ecommerce Website

**Version** 1.0 · **Date** 17 August 2026 · **Owner** _[you]_
**Build environment** Google Antigravity (Agent Manager + Editor + Browser)
**Stack** Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4

---

## 0. Read this first — assumptions I made

Three reference sites were supplied. They are stylistically incompatible with each other, so this PRD picks one as the **structural and visual blueprint** and demotes the other two to **element donors**. Change this in one line if I picked wrong.

| Reference | Role in this PRD | What we take |
|---|---|---|
| **Berry's Luxury Ice Cream** | **Primary blueprint** — layout, grid, section order, type hierarchy, colour architecture | Everything structural. This is the site we are rebuilding as Boogie. |
| **Novella** | Element donor | Trust-badge seal cluster, certification strip, "Why us" band |
| **Sandra** | Element donor | Category tiles (Impulse / Take Home / HoReCa), quality-icon row |

Other assumptions, all reversible:

1. **"Three main pages" means three page templates**, not three URLs. Home, Products (listing), Product Detail. The detail page is templated so 30 flavours = 30 URLs from one template.
2. **Cart is a slide-over drawer, not a page.** Checkout is a hosted redirect (Stripe/Razorpay). This is how the site stays a real store on three templates.
3. **Currency is INR** with a `PaymentProvider` interface so Stripe ⇄ Razorpay is a one-file swap.
4. **Products are file-based** (`content/products/*.ts`, validated by Zod) for v1. A CMS is a Phase 2 swap behind the same data layer.

---

## 1. Product summary

### 1.1 What we're building
A direct-to-consumer ecommerce site for **Boogie Ice Creams**, a premium small-batch ice cream, sorbet and frozen dessert maker. The site sells take-home tubs online and doubles as the trade shop-window for delis, farm shops and restaurants.

### 1.2 Why
Boogie currently has no owned sales channel. Every tub sold goes through a stockist, which means no margin, no customer data, and no control over how the brand is presented. The site fixes all three.

### 1.3 Success metrics

| Metric | Target at 90 days |
|---|---|
| Add-to-cart rate (sessions with ≥1 add) | ≥ 8% |
| Checkout completion (cart → paid) | ≥ 45% |
| Lighthouse Performance (mobile, Home) | ≥ 90 |
| LCP (mobile, p75, field) | ≤ 2.5s |
| Trade enquiries per month | ≥ 15 |
| Bounce rate on Home | ≤ 45% |

### 1.4 Non-goals for v1
Accounts and order history · Subscriptions · Reviews and UGC · Multi-currency · Blog/recipes · Wholesale portal with tiered pricing · Live inventory sync with a WMS · Loyalty points.

---

## 2. Audience and jobs

| Persona | Context | Job to be done | What they need on screen |
|---|---|---|---|
| **Gifting Gia**, 32 | Buying a tub set as a gift | "Make me look like I know good ice cream" | Beautiful flavour photography, gift-worthy packaging shots, clear delivery promise |
| **Weekend Ravi**, 41 | Treating the family on a Friday | "Get four tubs I know we'll all like" | Best-sellers, fast add-to-cart, size options, allergen clarity |
| **Allergy-aware Anu**, 28 | Dairy-free household | "Confirm this is actually safe" | Dairy-free filter, ingredients and allergens above the fold on PDP |
| **Trade buyer Thomas**, 50 | Deli owner sourcing stock | "Is this brand credible and can I get 5L tubs" | Provenance story, awards, certifications, direct contact route |

---

## 3. Information architecture

Three page templates. Everything else is a drawer, a modal, or a non-indexed utility route.

```
/                          Home                 (template 1)
/products                  Shop all             (template 2)
/products/[slug]           Product detail       (template 3)

— supporting, not "pages" —
CartDrawer                 global slide-over, any route
/api/checkout              route handler → hosted checkout session
/api/trade-enquiry         route handler → email/CRM
?checkout=success|cancel   returns to / with a confirmation panel
/sitemap.xml  /robots.txt  /opengraph-image      generated
not-found.tsx  error.tsx                          system routes
```

**Global navigation** (mirrors Berry's centred-logo bar):

```
OUR STORY   OUR PRODUCTS  ·  [ boogie ]  ·  TRADE   CONTACT        [cart ●3]
```

`OUR STORY` and `TRADE` scroll to anchored sections on Home (`/#story`, `/#trade`). `CONTACT` opens the contact drawer. This keeps the count at three templates without hiding content.

---

## 4. Design direction

### 4.1 The thesis
Berry's works because it treats an ice cream tub like a piece of jewellery: enormous negative space, a single organic gold shape as a stage, elegant serif at unusual sizes, and photography that is allowed to breathe. Boogie inherits that discipline. The one place Boogie diverges is the palette — plum instead of burgundy — so the site reads as a peer of the reference rather than a copy of it.

### 4.2 Colour tokens

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F5F1E8` | Page background. The default surface. |
| `--sand` | `#E9E2D3` | Secondary panel behind offset collage blocks |
| `--mulberry` | `#7C1F45` | **Primary brand.** Display headings, lead paragraphs, active carousel dot |
| `--ink-plum` | `#3F1330` | Footer, hover state on primary, deepest contrast |
| `--gold` | `#D2A65A` | The petal shape, hairline rules, focus ring, badge seals |
| `--cocoa` | `#332B2E` | Body copy |
| `--cocoa-60` | `#332B2E99` | Captions, attributions, meta |
| `--white` | `#FFFFFF` | Product card surfaces, drawer |
| `--black` | `#111111` | Solid rectangular CTA (`VIEW COLLECTION` pattern) |

Contrast floor: body on paper = 11.6:1, mulberry on paper = 8.9:1. All pass AA at 14px.

### 4.3 Typography

| Role | Face | Setting |
|---|---|---|
| Display | **Fraunces** (variable; `wght 300–500`, `SOFT 40`, `WONK 0`, `opsz` auto) | Headlines only. Never below 24px. |
| Body / UI | **Hanken Grotesk** (400/500/600) | Everything else |
| Eyebrow / label | Hanken Grotesk 600 | `text-transform: uppercase; letter-spacing: 0.14em; font-size: 0.75rem` |

Fraunces is chosen over the reflexive Playfair/Cormorant pairing: its optical-size axis holds the enormous "Made With Passion"-scale headline without the hairlines collapsing, and it stays warm at small sizes. Both faces load via `next/font/google` with `display: 'swap'` and are subset to `latin`.

**Type scale**

```
display-xl   clamp(3rem, 7vw, 5.75rem)   /  0.95  /  -0.02em   Fraunces 300
display-l    clamp(2.5rem, 5vw, 3.75rem) /  1.05  /  -0.01em   Fraunces 300
h2           clamp(1.75rem, 3vw, 2.25rem)/  1.15                Fraunces 400
h3           1.25rem                     /  1.3                 Fraunces 400
body-lead    1rem                        /  1.65                Hanken 400, --mulberry
body         0.9375rem                   /  1.7                 Hanken 400, --cocoa
caption      0.8125rem                   /  1.5                 Hanken 400, --cocoa-60
eyebrow      0.75rem                     /  1.2   /  0.14em     Hanken 600
```

### 4.4 Layout system
- Container `max-width: 1280px`; gutters `24px` mobile → `48px` ≥1024px.
- 12-column grid, 24px gutter. Hero splits **5 / 7**. Feature sections split **6 / 6** with a 1-column bleed on the image side.
- Vertical rhythm: sections are `96px` mobile → `160px` desktop. Never improvise a section padding; use the token.
- **Border radius is `0`** on every panel, image and rectangular button. The only round things are icon buttons and carousel dots (`9999px`). This is load-bearing — it is what makes the reference feel editorial rather than SaaS.
- Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280`.

### 4.5 Signature element — the Gold Petal
An asymmetric organic blob in `--gold`, rendered as an inline SVG with a single path, sitting behind the hero product shot. It is the one memorable thing on the page, so it earns repeat use — but only three times site-wide:
1. Hero stage (largest, ~60% of hero width)
2. Behind the featured flavour on `/products`
3. Behind the primary image on the PDP gallery

It never animates on load. It parallaxes at `0.15` scroll rate on desktop only, disabled under `prefers-reduced-motion`.

### 4.6 Motion rules
Scroll reveals only: `opacity 0→1`, `translateY 16px→0`, `420ms`, `cubic-bezier(0.22, 1, 0.36, 1)`, staggered `60ms` within a group, fired once at 20% viewport intersection. Hover on product cards: image scales `1.0→1.03` over `500ms`, nothing else moves. Every motion respects `prefers-reduced-motion: reduce` by collapsing to instant.

---

## 5. Page specifications

### 5.1 Home (`/`)

Section order is taken directly from the Berry's blueprint. Do not reorder without a reason written down.

| # | Section | Layout | Content |
|---|---|---|---|
| 1 | **Header** | Sticky, transparent → `--paper` with a `--gold` hairline after 80px scroll. Centred wordmark, 2 links each side, cart button right. | Nav as §3 |
| 2 | **Hero** | 5/7 split. Left: display-l headline (3 lines), 2 body paragraphs, underlined text-link CTA. Right: petal + tilted tub render + splash, `priority` image. | "Small batch. Big boogie." + 2 paragraphs of provenance + `OUR PRODUCTS →` |
| 3 | **Best Sellers** | Centred h2, carousel arrows top-right (2 circular buttons). 4-up grid → 2-up md → 1.4-up scroll-snap mobile. Below: black rectangular `VIEW COLLECTION`. | 4–8 featured products, each with image, serif name, `ⓘ NUTRITIONAL INFORMATION` disclosure |
| 4 | **Natural & Simple** (`#story`) | 6/6, image left with a left bleed. | h2 in mulberry, body-lead paragraph, body paragraph, `OUR STORY →` |
| 5 | **Made With Passion** | display-xl headline overlapping a `--sand` panel; body column left, image right, offset. Faint gold line-art fruit as background decoration at 8% opacity. | Craft/process story |
| 6 | **Ice Cream Heaven** | Second offset image lower-left overlapping the sand panel; text right. | Sizes: 100ml, 500ml, 2.4L, 5L; trade note |
| 7 | **Trust band** _(from Novella)_ | Full-bleed `--ink-plum`. 4 gold circular seals + short "Why Boogie" copy. | No preservatives · Real fruit · Fresh cow milk · Made in small batches |
| 8 | **Buy Boogie** _(from Sandra)_ | 3 equal image tiles with white overlaid label. | `TAKE HOME` · `PARTIES` · `TRADE` — the last links to `#trade` |
| 9 | **Testimonial** | Centred, wide margins, Fraunces 400 at 1.5rem, `1.6` leading. Attribution in caption style. | One rotating quote (static in v1) |
| 10 | **Trade** (`#trade`) | 6/6, form right. | Name, business, email, phone, message → `/api/trade-enquiry` |
| 11 | **Footer** | `--ink-plum`. Row 1: wordmark left, nav centre, social right. Row 2 (hairline above): legal links, copyright, credit. | — |

**Home acceptance criteria**
- [ ] Hero LCP element is the product image, `priority`, served as AVIF/WebP, ≤ 180KB
- [ ] Best Sellers carousel is keyboard-operable (arrow keys, visible focus) and swipeable on touch
- [ ] Every section reveals on scroll exactly once; no layout shift (CLS < 0.02)
- [ ] Trade form validates client + server with the same Zod schema
- [ ] Renders correctly at 360, 768, 1024, 1440, 1920

### 5.2 Products (`/products`)

| # | Section | Detail |
|---|---|---|
| 1 | Page hero | Compact band: eyebrow `OUR PRODUCTS`, display-l title, one-line description. Gold petal behind the featured flavour to the right. |
| 2 | Filter row | Sticky under header. Chips: `ALL · ICE CREAM · SORBET · DAIRY FREE · DESSERTS`. Sort select: Featured / A–Z / Price. Filters are **URL state** (`?category=sorbet&sort=price-asc`) so results are shareable and server-rendered. |
| 3 | Grid | 4-up xl / 3-up lg / 2-up sm / 1-up mobile. Card: product image on white, serif name, flavour note caption, price, quick-add button that appears on hover and is always visible on touch. |
| 4 | Load more | Server action / `searchParams` pagination, 12 per page. No infinite scroll — it breaks the footer. |
| 5 | Empty state | "No flavours match that combination yet." + a button that clears filters. |

**Acceptance criteria**
- [ ] Filtering is server-rendered; no client-side flash of unfiltered content
- [ ] Quick-add opens the cart drawer with the correct default variant (500ml)
- [ ] Grid images use fixed aspect ratio boxes so nothing shifts while loading
- [ ] `?category=` values that don't exist return the empty state, not a 500

### 5.3 Product detail (`/products/[slug]`)

Two-column above the fold: gallery left (7), buy panel right (5).

**Gallery** — primary image on the gold petal, 3 thumbnails below, click swaps, arrow-key navigable.

**Buy panel**
1. Eyebrow: category
2. `h1` product name (display-l, mulberry)
3. Strapline (body-lead)
4. Price, reactive to selected size
5. Size selector: segmented control, 100ml / 500ml / 2.4L. Out-of-stock sizes are disabled with a visible reason, not hidden.
6. Quantity stepper
7. `ADD TO CART` — full-width black rectangle. Optimistic UI, opens drawer.
8. Delivery/insulated-packaging note in caption style
9. Accordion: **Ingredients** · **Allergens** (bold, never collapsed by default for items containing top allergens) · **Nutrition** (per 100g table) · **Storage**

**Below the fold**
- Flavour story: 6/6 text + image
- `YOU MAY ALSO LIKE` — 4 products from the same category, falling back to best-sellers

**Acceptance criteria**
- [ ] `generateStaticParams` pre-renders every product at build; ISR revalidate 3600
- [ ] `generateMetadata` returns unique title, description, OG image per product
- [ ] `Product` + `Offer` JSON-LD present and valid in Rich Results Test
- [ ] Allergen block is reachable without JavaScript
- [ ] Unknown slug returns `notFound()` → styled 404, not a crash

### 5.4 Cart drawer (global)
Right slide-over, 420px / full-width mobile. Focus-trapped, `Esc` closes, returns focus to the trigger. Line items with thumbnail, name, size, stepper, remove. Subtotal, delivery-threshold nudge ("₹300 more for free delivery"), `CHECKOUT` primary and `Continue shopping` ghost. Empty state links to `/products`. Persists to `localStorage` and rehydrates without a flash of empty cart.

---

## 6. Technical specification

### 6.1 Stack

| Concern | Choice | Note |
|---|---|---|
| Framework | Next.js 15, App Router | RSC by default |
| Language | TypeScript, `strict: true` | `noUncheckedIndexedAccess` on |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) | Tokens from §4.2 as CSS custom properties |
| UI primitives | Radix UI (Dialog, Accordion, Select, Toggle Group) | Unstyled; we own the visuals |
| State | Zustand + `persist` | Cart only. Everything else is URL or server state. |
| Validation | Zod | Shared between client, server actions, and catalog build |
| Payments | Stripe Checkout (default) behind a `PaymentProvider` interface | Razorpay adapter for INR — see §6.5 |
| Content | Typed TS modules in `content/products/` | CMS-swappable behind `lib/catalog.ts` |
| Motion | `motion` (Framer Motion successor) | Scroll reveals + drawer only |
| Email | Resend | Trade enquiries + order confirmation |
| Analytics | Vercel Analytics + GA4 | Ecommerce events per §8 |
| Testing | Vitest (unit) + Playwright (e2e) | |
| Hosting | Vercel | |

### 6.2 Repository structure

```
boogie-ice-creams/
├── AGENTS.md                     # agent operating rules (see §9)
├── .agents/skills/               # 12 Antigravity skills (see §9)
├── app/
│   ├── layout.tsx                # fonts, providers, header, footer, cart drawer
│   ├── page.tsx                  # Home
│   ├── products/
│   │   ├── page.tsx              # listing (searchParams-driven)
│   │   └── [slug]/page.tsx       # detail
│   ├── api/
│   │   ├── checkout/route.ts
│   │   └── trade-enquiry/route.ts
│   ├── sitemap.ts  robots.ts  opengraph-image.tsx
│   ├── not-found.tsx  error.tsx  globals.css
├── components/
│   ├── layout/    Header, Footer, MobileNav
│   ├── home/      Hero, BestSellers, StorySplit, PassionCollage, TrustBand,
│   │              CategoryTiles, Testimonial, TradeForm
│   ├── product/   ProductCard, ProductGrid, FilterBar, Gallery, BuyPanel,
│   │              SizeSelector, NutritionTable, RelatedProducts
│   ├── cart/      CartDrawer, CartLine, CartSummary
│   └── ui/        Button, IconButton, Accordion, Reveal, GoldPetal, Container
├── content/products/*.ts         # one file per flavour
├── lib/           catalog.ts, cart.ts, payments/, schema.ts, seo.ts, format.ts
├── public/        images/products/, images/editorial/, fonts/
└── tests/         unit/, e2e/
```

### 6.3 Data model

```ts
// lib/schema.ts
export const VariantSchema = z.object({
  sku: z.string(),                       // BOOGIE-STRW-500
  size: z.enum(['100ml', '500ml', '2.4L', '5L']),
  volumeMl: z.number().int().positive(),
  price: z.number().int().positive(),    // minor units (paise)
  compareAtPrice: z.number().int().positive().optional(),
  inStock: z.boolean(),
  tradeOnly: z.boolean().default(false), // 2.4L and 5L hidden from D2C grid
});

export const ProductSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  strapline: z.string().max(120),
  description: z.string(),
  story: z.string().optional(),
  category: z.enum(['ice-cream', 'sorbet', 'dairy-free', 'dessert']),
  flavourNotes: z.array(z.string()).min(1).max(4),
  badges: z.array(z.enum(['award-winner', 'new', 'seasonal', 'vegan'])).default([]),
  variants: z.array(VariantSchema).min(1),
  images: z.array(z.object({
    src: z.string(), alt: z.string(), width: z.number(), height: z.number(),
  })).min(1),
  ingredients: z.string(),
  allergens: z.array(z.string()),
  nutritionPer100g: z.object({
    energyKj: z.number(), energyKcal: z.number(), fat: z.number(),
    saturates: z.number(), carbohydrate: z.number(), sugars: z.number(),
    protein: z.number(), salt: z.number(),
  }),
  featured: z.boolean().default(false),
  bestSeller: z.boolean().default(false),
  order: z.number().int().default(999),
});
```

Prices are **integers in minor units**, always. No floats touch money. Formatting happens once, in `lib/format.ts`.

### 6.4 Rendering strategy

| Route | Strategy | Why |
|---|---|---|
| `/` | Static, ISR 3600 | Content changes rarely; must be instant |
| `/products` | Static shell + `searchParams` server filtering | Shareable filtered URLs, no client flash |
| `/products/[slug]` | `generateStaticParams` + ISR 3600 | Every flavour pre-rendered |
| `/api/*` | Dynamic, `runtime: 'nodejs'` | Payment SDK needs Node |

Client components are the exception, not the rule. Only these are `'use client'`: `CartDrawer`, `CartLine`, `SizeSelector`, `QuantityStepper`, `Gallery`, `FilterBar`, `BestSellersCarousel`, `Reveal`, `MobileNav`, `TradeForm`.

### 6.5 Payments

```ts
// lib/payments/types.ts
export interface PaymentProvider {
  createCheckoutSession(input: {
    lines: { sku: string; quantity: number }[];
    successUrl: string;
    cancelUrl: string;
  }): Promise<{ url: string }>;
  verifyWebhook(req: Request): Promise<PaymentEvent>;
}
```

Ship `lib/payments/stripe.ts` first. `lib/payments/razorpay.ts` implements the same interface for INR. Selection via `PAYMENT_PROVIDER` env var. **Prices are never trusted from the client** — the checkout route re-reads them from the catalog by SKU.

### 6.6 Environment variables

```
NEXT_PUBLIC_SITE_URL
PAYMENT_PROVIDER=stripe|razorpay
STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET
RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET
RESEND_API_KEY
TRADE_ENQUIRY_TO
NEXT_PUBLIC_GA_ID
```

---

## 7. Non-functional requirements

**Performance budget** (mobile, Moto G Power profile)

| Metric | Budget |
|---|---|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.02 |
| First-load JS, Home | ≤ 130KB gzipped |
| First-load JS, PDP | ≤ 150KB gzipped |
| Largest single image | ≤ 200KB |
| Total page weight, Home | ≤ 1.2MB |

**Accessibility** — WCAG 2.2 AA. Keyboard reachable in full, visible `--gold` focus ring at 2px offset, correct heading order, alt text describing the flavour not the file, `prefers-reduced-motion` honoured, forms with real `<label>`s and `aria-describedby` errors, drawer focus-trapped and `aria-modal`.

**SEO** — unique title/description per route, canonical URLs, `Organization` + `WebSite` JSON-LD site-wide, `Product` + `Offer` + `BreadcrumbList` on PDP, generated sitemap and robots, per-product OG images.

**Browser support** — last 2 versions of Chrome, Safari, Edge, Firefox; iOS Safari 16+.

---

## 8. Analytics events

| Event | Fires when | Params |
|---|---|---|
| `view_item_list` | `/products` renders | `item_list_name`, `items[]` |
| `view_item` | PDP renders | `item_id`, `item_name`, `price` |
| `add_to_cart` | Add or quick-add | `item_id`, `size`, `quantity`, `value` |
| `remove_from_cart` | Line removed | `item_id`, `value` |
| `view_cart` | Drawer opens | `value`, `items[]` |
| `begin_checkout` | Checkout clicked | `value`, `items[]` |
| `purchase` | Success redirect | `transaction_id`, `value` |
| `trade_enquiry_submit` | Trade form success | `business_type` |

---

## 9. Antigravity setup

### 9.1 Skills (all 12 live in `.agents/skills/`)

| # | Skill | Owns |
|---|---|---|
| 1 | `boogie-design-system` | Tokens, type scale, spacing, radius, the visual authority |
| 2 | `boogie-page-blueprints` | Section-by-section layout recipes for all three templates |
| 3 | `boogie-component-authoring` | Component conventions, RSC boundaries, props, file placement |
| 4 | `nextjs-app-router-conventions` | Routing, data fetching, metadata, caching, server actions |
| 5 | `boogie-product-catalog` | Product schema, adding a flavour, catalog queries |
| 6 | `boogie-cart-and-checkout` | Cart store, drawer behaviour, provider-agnostic checkout |
| 7 | `boogie-brand-voice` | Copywriting rules and vocabulary for all on-site text |
| 8 | `boogie-motion` | Reveal timings, hover rules, reduced-motion compliance |
| 9 | `boogie-seo-schema` | Metadata, JSON-LD, sitemap, OG images |
| 10 | `boogie-accessibility` | WCAG 2.2 AA checklist and remediation patterns |
| 11 | `boogie-visual-qa` | Browser-driven screenshot verification against the blueprint |
| 12 | `boogie-performance-budget` | Bundle and Core Web Vitals gates |

### 9.2 Working method in Antigravity
1. Open the workspace, confirm skills are detected (Agent panel → Skills, or `/skills` in the CLI).
2. Work **one milestone per agent session** in Agent Manager. Long sessions drift.
3. Ask for an **Implementation Plan artifact** before code on every milestone, and read it. Cheapest place to catch a wrong turn.
4. Use the **Browser** tool after each UI milestone and demand a **Screenshots artifact** at 360 / 768 / 1440 before you accept the work.
5. When the agent gets something wrong twice, don't fix it by hand — fix the SKILL.md, then re-run.

### 9.3 Milestones

| M | Scope | Done when |
|---|---|---|
| **M0** | Repo, TS strict, Tailwind v4 theme from §4.2, fonts, `Container`/`Button`/`Reveal`/`GoldPetal` | Token page renders every colour and type step correctly |
| **M1** | Header, Footer, layout shell, mobile nav | Nav works at all breakpoints, focus visible, sticky behaviour correct |
| **M2** | Catalog: schema, 12 seed products, `lib/catalog.ts`, images | `pnpm validate:catalog` passes; every product has real copy and images |
| **M3** | Home sections 2–11 | Screenshots artifact matches blueprint at 3 breakpoints |
| **M4** | `/products` with URL-state filtering and sorting | Filtered URLs are shareable and server-rendered |
| **M5** | `/products/[slug]` + related products | Rich Results Test passes on 3 sample products |
| **M6** | Cart drawer + Zustand + persistence | Refresh keeps the cart; drawer is focus-trapped |
| **M7** | Checkout + webhook + confirmation | Test payment completes end to end; prices re-read server-side |
| **M8** | SEO, analytics, OG images, trade form | All §8 events fire with correct payloads |
| **M9** | A11y + performance pass | §7 budgets met; axe reports zero criticals |
| **M10** | Content load, staging review, launch | Client sign-off |

---

## 10. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Product photography isn't ready | Blocks M3–M5; the whole design depends on cut-out product renders on transparent backgrounds | Lock the shot list at M0. Placeholder renders must match final aspect ratios exactly. |
| Agent drifts from the blueprint over long sessions | Site slowly becomes generic | One milestone per session; `boogie-visual-qa` screenshots as the gate |
| Cold-chain delivery isn't solved operationally | Site can take orders it can't fulfil | Delivery zones and cut-off times must be confirmed before M7 |
| Payment provider decision flips late | Rework in checkout | `PaymentProvider` interface built at M7 regardless of choice |
| Nutrition and allergen data is wrong | Legal and safety exposure | Client sign-off on every product record before launch. No placeholder allergen data reaches staging. |

---

## 11. Open decisions

1. Stripe or Razorpay as launch provider?
2. Delivery zones, cut-off times, and free-delivery threshold?
3. Confirm the three reference sites' roles in §0 — especially that Berry's is the blueprint.
4. Do 2.4L / 5L sizes sell D2C, or are they trade-enquiry only?
5. Wordmark: existing asset, or does it need designing?
