---
name: boogie-design-system
description: The visual authority for Boogie Ice Creams. Use when picking a colour, a font size, a spacing value, a border radius or a shadow; when adding or editing anything in globals.css or the Tailwind @theme block; when a layout needs a container, grid split or section rhythm; or when placing the Gold Petal. Triggers on "what colour", "which font size", "add a token", "spacing", "padding between sections", "border radius", "the petal", "make this match the design", "why does this look off", "hex", "tailwind theme".
---

# Boogie design system

Berry's Luxury Ice Cream is the visual blueprint. It works because it treats a tub of
ice cream like jewellery: enormous negative space, one organic gold shape as a stage,
elegant serif at unusual sizes, photography allowed to breathe. Boogie inherits that
discipline and diverges on one axis only — plum instead of burgundy.

## Hard rules

1. **No literal design values in components.** No `#7C1F45`, no `p-[37px]`, no
   `text-[19px]`. Every value comes from a token. If a token is missing, add it to
   `app/globals.css` and say so — do not inline it.
2. **Border radius is `0`** on every panel, image, card and rectangular button. The
   only round things in the entire site are icon buttons and carousel dots
   (`rounded-full`). This is load-bearing; it is what makes the site read as editorial
   rather than SaaS.
3. **No shadows on panels or cards.** Depth comes from the `--sand` panel and offset
   collage overlap, not from elevation.
4. **Fraunces never below 24px.** Below that it is Hanken Grotesk, always.
5. **Section padding is a token**, never improvised. `py-24 lg:py-40` (96px → 160px).

## Colour tokens

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F5F1E8` | Page background. The default surface. |
| `--sand` | `#E9E2D3` | Secondary panel behind offset collage blocks |
| `--mulberry` | `#7C1F45` | **Primary brand.** Display headings, lead paragraphs, active dot |
| `--ink-plum` | `#3F1330` | Footer, trust band, hover state on primary, deepest contrast |
| `--gold` | `#D2A65A` | The petal, hairline rules, focus ring, badge seals |
| `--cocoa` | `#332B2E` | Body copy |
| `--cocoa-60` | `#332B2E99` | Captions, attributions, meta |
| `--white` | `#FFFFFF` | Product card surfaces, cart drawer |
| `--black` | `#111111` | Solid rectangular CTA (`VIEW COLLECTION`, `ADD TO CART`) |

Contrast floor: cocoa on paper 11.6:1, mulberry on paper 8.9:1. Both pass AA at 14px.
Gold is **decorative and focus-ring only** — it never carries text on paper (2.1:1).

Full token file: `resources/tokens.css`. Paste it into `app/globals.css` under
Tailwind v4's `@theme` block; it generates `bg-paper`, `text-mulberry`, `border-gold`
and the type-scale utilities automatically.

## Typography

| Role | Face | Setting |
|---|---|---|
| Display | Fraunces variable, `wght 300–500`, `SOFT 40`, `WONK 0`, `opsz` auto | Headlines only |
| Body / UI | Hanken Grotesk 400/500/600 | Everything else |
| Eyebrow | Hanken Grotesk 600 | uppercase, `0.14em` tracking, `0.75rem` |

Fraunces is deliberate, not decorative: its optical-size axis holds a
`clamp(3rem, 7vw, 5.75rem)` headline without the hairlines collapsing, and it stays
warm at 20px. Do not substitute Playfair or Cormorant.

```
display-xl   clamp(3rem, 7vw, 5.75rem)    / 0.95 / -0.02em   Fraunces 300
display-l    clamp(2.5rem, 5vw, 3.75rem)  / 1.05 / -0.01em   Fraunces 300
h2           clamp(1.75rem, 3vw, 2.25rem) / 1.15             Fraunces 400
h3           1.25rem                      / 1.3              Fraunces 400
body-lead    1rem                         / 1.65             Hanken 400, --mulberry
body         0.9375rem                    / 1.7              Hanken 400, --cocoa
caption      0.8125rem                    / 1.5              Hanken 400, --cocoa-60
eyebrow      0.75rem                      / 1.2 / 0.14em     Hanken 600 uppercase
```

Both faces load through `next/font/google` with `display: 'swap'`, subset `latin`,
exposed as CSS variables on `<html>`. No `@import`, no `<link>` to Google Fonts.

## Layout system

- Container `max-width: 1280px`, gutters `24px` → `48px` at `lg`. Always via `<Container>`.
- 12-column grid, 24px gutter. **Hero splits 5/7. Feature sections split 6/6** with a
  one-column bleed on the image side.
- Vertical rhythm: `96px` mobile → `160px` desktop between sections.
- Breakpoints: `sm 640 · md 768 · lg 1024 · xl 1280`. Design mobile-first.

## The Gold Petal

An asymmetric organic blob in `--gold`, inline SVG, **one path**, sitting behind a
product shot. It is the one memorable thing on the page, so it is used exactly three
times site-wide:

1. Hero stage on `/` — largest, ~60% of hero width
2. Behind the featured flavour on `/products`
3. Behind the primary image in the PDP gallery

It is `aria-hidden`, never animates on load, and parallaxes at `0.15` scroll rate on
desktop only — disabled under `prefers-reduced-motion`. A fourth petal anywhere is a
review blocker.

## Checklist before you call styling done

- [ ] Zero hex values and zero arbitrary Tailwind brackets in the component
- [ ] Every rectangular surface is `rounded-none`
- [ ] Headings use the display/h2/h3 steps, not ad-hoc sizes
- [ ] Section padding is `py-24 lg:py-40`
- [ ] Gold is used only for petal, hairlines, seals and focus rings
- [ ] Contrast checked against the floors above
