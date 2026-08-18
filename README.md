# Boogie Ice Creams

Direct-to-consumer storefront for a small-batch ice cream, sorbet and frozen dessert maker.
Three page templates — Home, Products listing, Product detail — plus a global cart drawer
and hosted checkout.

Built to [`PRD-Boogie-Ice-Creams.md`](./PRD-Boogie-Ice-Creams.md) against the twelve skills in
[`.agents/skills/`](./.agents/skills/). Agent operating rules are in [`AGENTS.md`](./AGENTS.md).

Next.js 15 (App Router) · React 19 · TypeScript strict · Tailwind CSS v4 · Zustand · Zod · Radix.

## Getting started

```bash
npm install
npm run dev
```

`cp .env.example .env.local` for payments, email and analytics. Everything runs without
them: checkout returns a truthful "not switched on yet", trade enquiries log to the server,
and analytics no-ops.

## Commands

```bash
npm run dev                 # dev server
npm run build               # production build, prints First Load JS per route
npm run typecheck           # tsc --noEmit
npm run validate:catalog    # Zod validation + catalog invariants + sign-off status
npm run test                # Vitest unit tests
npm run test:e2e            # Playwright: axe gate + screenshots at 4 breakpoints
npm run check:budget        # performance budget gate
```

## Architecture, in one screen

- **Server components by default.** Ten components are `'use client'`, listed in
  `.agents/skills/boogie-component-authoring`. The cart drawer and the mobile nav panel are
  code-split and mount on first open, so neither their libraries nor Radix sit in first-load JS.
- **`lib/catalog.ts` is the only reader of `content/`.** It is `server-only`; a CMS in Phase 2
  is a one-file swap behind the same interface.
- **Money is integers in paise**, everywhere. `lib/format.ts` formats once; `lib/seo.ts` is the
  only other place a price is divided, for schema.org.
- **The cart stores SKUs and quantities and nothing else.** Display data comes from a
  server-built index; `/api/checkout` re-reads every price from the catalog by SKU, so a
  client-supplied price is never read and an unknown SKU is a 400.
- **Filters are URL state.** `/products?category=sorbet&sort=price-asc` is server-rendered and
  shareable; there is no client-side filtering and no flash of unfiltered content.
- **Payments sit behind `PaymentProvider`.** Stripe and Razorpay are one env var apart.

## Known state

Three things are deliberately unfinished, each tracked to an open PRD decision.

| What | Why | Where |
|---|---|---|
| Product data is placeholder | Ingredients, allergens and nutrition need client sign-off before staging (PRD §10) | `content/products/signoff.json`, `npm run validate:catalog -- --strict` |
| Product imagery is one shared tub | Generated mockup photography is in place (10 images, WebP with alpha). All twelve flavours share one neutral tub, so the `/products` grid does not yet differentiate them | `prompt.md` §8 has the per-flavour prompts; `scripts/generate-placeholder-images.ts` is now unused |
| Checkout is not switched on | Launch provider is undecided (PRD §11.1). The adapter, price re-read and error paths are built; the SDK call is one marked block | `lib/payments/stripe.ts` |

The free-delivery nudge does not render until delivery zones and the threshold are confirmed
(PRD §11.2) — `FREE_DELIVERY_THRESHOLD` in `lib/cart.ts` is `null` on purpose. An invented
delivery promise is a promise we might not keep.

## Performance

Home is **132 kB** First Load JS against the PRD's 130 kB budget. Next 15 + React 19 have a
~102 kB gzipped framework floor on this project, leaving ~28 kB for application code.
Two ways to close the gap, both trade-offs worth a decision rather than a quiet fix:

1. Drop Zod from the client (~14 kB) and validate the trade form on the server only. This
   contradicts the PRD §5.1 acceptance criterion that client and server share one schema.
2. Raise the Home budget to 135 kB and keep shared validation.

Everything else is inside budget: PDP 128 kB against 150 kB, every image 39–177 kB, 940 kB for the whole library.

`npm run check:budget` also fails on the one remaining `TODO(copy):`, in
`components/home/Testimonial.tsx`. That is the gate working: the testimonial is an
invented quote standing in for a real attributable one, and an invented testimonial is an
invented fact. It must be replaced or the section removed before launch.

## Verification

| Gate | Result |
|---|---|
| `npm run typecheck` | clean |
| `npm test` | 15 passed |
| `npm run validate:catalog` | valid; 12 records flagged as awaiting sign-off |
| `npm run build` | 34 pages, Home and PDP static with ISR 3600 |
| `npm run test:e2e` | 24 passed — axe zero critical/serious on Home, `/products`, PDP and with the drawer open |
| `npm run check:budget` | 2 failures, both listed above and both intentional |

Playwright drives the installed Google Chrome (`channel: 'chrome'` in
`playwright.config.ts`) because its bundled Chromium has no macOS 13 build. CI can drop
that line.
