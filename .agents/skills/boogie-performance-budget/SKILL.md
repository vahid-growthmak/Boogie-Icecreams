---
name: boogie-performance-budget
description: Core Web Vitals and bundle budgets for Boogie Ice Creams, plus the image pipeline, font loading and measurement procedure that keep them met. Use before adding any dependency, when a page feels slow, when First Load JS grows, when adding or exporting images, and as the gate on the performance milestone. Triggers on "add a package", "install a dependency", "bundle size", "First Load JS", "performance", "Lighthouse", "LCP", "INP", "CLS", "image size", "optimize images", "slow", "analyze bundle", "page weight".
---

# Performance budget

Targets are from PRD §7, measured on mobile against a Moto G Power profile.

| Metric | Budget |
|---|---|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.02 |
| First Load JS — Home | ≤ 130KB gzipped |
| First Load JS — PDP | ≤ 150KB gzipped |
| Largest single image | ≤ 200KB |
| Total page weight — Home | ≤ 1.2MB |
| Lighthouse Performance, mobile Home | ≥ 90 |

Run `bash scripts/check-budget.sh` (in this skill) after `pnpm build`. It parses the
build output and exits non-zero over budget. It is a CI gate, not advice.

## Before adding any dependency

Answer these in the PR description. Three noes means don't.

1. Does Radix already do this? (Dialog, Accordion, Select, Toggle Group are installed.)
2. Can it run **server-side only**, never entering a client bundle?
3. What does it cost gzipped, per [bundlephobia], and against which budget line?
4. What are we deleting to pay for it?

Already-decided answers: `motion` for reveals and the drawer, `zustand` for the cart,
`zod` for validation, `radix-ui` for primitives. **No** icon library — the handful of
icons are inline SVG. **No** carousel library — the best-sellers strip is CSS scroll-snap.
**No** date library. **No** `lodash`. **No** CSS-in-JS runtime.

## Keeping First Load JS down

The budget is met by the server/client boundary, not by minification.

- Server components by default; only the ten components listed in
  `boogie-component-authoring` are `'use client'`.
- **The catalog never reaches the client.** `lib/catalog.ts` is `server-only`. A client
  component that imports it drags every product file into the bundle — this is the single
  fastest way to blow the budget.
- Pass primitives across the boundary, not whole `Product` objects. Serialised props are
  bytes in the HTML too.
- `next/dynamic` the cart drawer's contents (not its trigger) — it is never needed at
  first paint.
- Analytics loads `afterInteractive`. GA4 never blocks.

## Images

The whole design is cut-out product renders, so images are the page weight.

- `next/image` everywhere. Raw `<img>` is a defect.
- `formats: ['image/avif', 'image/webp']` in `next.config.ts`.
- **`priority` on exactly one image per route** — the hero tub on `/`, the primary
  gallery image on the PDP. It is the LCP element and must be ≤ 180KB.
- Everything else is lazy by default. Never `priority` a below-fold image.
- Correct `sizes` per breakpoint, or the browser downloads the desktop asset on a phone:
  `sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"`
- Every image sits in a **fixed aspect-ratio box** — `fill` plus a ratio container, or
  explicit `width`/`height`. This is what holds CLS at 0.02.
- Source renders are exported at 2× the largest rendered size and no larger. A 4000px
  master for a 600px slot is 200KB wasted.

## Fonts

Two families, loaded through `next/font/google`, `display: 'swap'`, subset `latin`,
exposed as CSS variables. Fraunces is variable — one file, not five weights. No
`@import`, no `<link>` to fonts.googleapis.com, no third family. Preload is handled by
`next/font`; don't add manual preload tags.

## CSS

Tailwind v4 with tokens in `@theme`. No component CSS files, no runtime CSS-in-JS. The
whole stylesheet should stay under 15KB gzipped; if it isn't, something is generating
arbitrary utilities — see `boogie-design-system`.

## Measurement procedure

1. `pnpm build` — read the First Load JS column per route. This is the number that counts.
2. `bash scripts/check-budget.sh` — pass/fail against the table above.
3. `pnpm analyze` when a route is over: find the largest client chunk and the import that
   pulled it in.
4. Lighthouse mobile on `/` and one PDP, three runs, take the median. Throttled, incognito.
5. Check field CLS by scrolling the whole route with the Layout Shift Regions overlay on.

Never report a lab number as a field number, and never quote a desktop Lighthouse score.

## Common regressions, in the order they happen

| Symptom | Cause |
|---|---|
| First Load JS jumps 40KB+ | A client component imported `lib/catalog.ts` or a `content/` file |
| LCP over 3s | No `priority` on the hero image, or the hero is inside `<Reveal>` |
| CLS over 0.02 | An image without a ratio box, or a font swapping into a different metric |
| INP over 200ms | Filtering a full product array in the browser instead of on the server |
| Page weight over 1.2MB | Source renders exported at 4000px, or PNG where AVIF was intended |
