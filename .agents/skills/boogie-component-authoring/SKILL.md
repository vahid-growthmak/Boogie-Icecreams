---
name: boogie-component-authoring
description: Conventions for writing or refactoring any React component in the Boogie Ice Creams codebase — where the file goes, how it is named, whether it may be a client component, how props are designed, and what "done" means. Use before creating a new component, when splitting or moving one, when reaching for 'use client', or when deciding what a component should accept as props. Triggers on "create a component", "new component", "refactor this component", "use client", "where should this file go", "props", "extract a component", "is this a server component".
---

# Component authoring

## Where files go

```
components/
├── layout/    Header, Footer, MobileNav
├── home/      Hero, BestSellers, StorySplit, PassionCollage, TrustBand,
│              CategoryTiles, Testimonial, TradeForm
├── product/   ProductCard, ProductGrid, FilterBar, Gallery, BuyPanel,
│              SizeSelector, NutritionTable, RelatedProducts
├── cart/      CartDrawer, CartLine, CartSummary
└── ui/        Button, IconButton, Accordion, Reveal, GoldPetal, Container
```

- `ui/` is generic and knows nothing about ice cream. If a component mentions a
  flavour, a price or a SKU, it does not belong in `ui/`.
- `home/` components are section-shaped: one export per blueprint section, named for
  the section, taking data as props rather than fetching.
- One component per file. `PascalCase.tsx`, named export matching the filename, plus a
  `default` export only for `app/` route files.
- Co-locate nothing else. Types live next to the component; shared types live in
  `lib/schema.ts`.

## The server / client boundary

**Server components by default.** `'use client'` is an exception you justify in a
one-line comment above the directive.

These, and only these, are client components in v1:

```
CartDrawer · CartLine · SizeSelector · QuantityStepper · Gallery
FilterBar · BestSellersCarousel · Reveal · MobileNav · TradeForm
```

Rules that keep the boundary honest:

1. **Push the boundary down, not up.** A section that is 90% static markup with one
   interactive control is a server component that renders a small client child. Never
   mark a whole section `'use client'` to get one `onClick`.
2. **Never import the catalog into a client component.** Pass the fields you need as
   plain serialisable props. `lib/catalog.ts` is server-only.
3. **Never pass a whole `Product` into a client component** when it needs a name and a
   price. Big props are how 130KB budgets die.
4. Client components receive **primitives and plain objects** — no class instances, no
   functions except server actions, no Zod schemas.

## Prop design

- Props describe *what*, not *how*. `variant="primary"` not `className="bg-black"`.
- Accept `className` on `ui/` primitives only, merged last through `cn()`. Section
  components do not take `className` — their spacing belongs to the blueprint.
- No boolean soup. Three or more mutually exclusive booleans become one `variant` union.
- Required props have no defaults. Optional props default in the signature, not in the body.
- Every image prop carries its own `alt` from the data, never a hard-coded string —
  see `boogie-brand-voice` for what alt text must say.

```tsx
type ButtonProps = {
  variant?: 'primary' | 'ghost' | 'link';
  size?: 'md' | 'lg';
  className?: string;
} & React.ComponentPropsWithoutRef<'button'>;
```

## Composition patterns already in the codebase — reuse, don't rebuild

| Need | Use |
|---|---|
| Page width and gutters | `<Container>` |
| Solid black rectangular CTA | `<Button variant="primary">` |
| Underlined text CTA (`OUR PRODUCTS →`) | `<Button variant="link">` |
| Circular carousel / cart / close button | `<IconButton>` |
| Scroll-in reveal | `<Reveal>` — see `boogie-motion` |
| Gold blob behind a product shot | `<GoldPetal>` — max 3 site-wide |
| Disclosure / accordion | `<Accordion>` on Radix — see `boogie-accessibility` |

If a new `ui/` primitive seems necessary, check Radix first (Dialog, Accordion, Select,
Toggle Group are already dependencies). We use Radix unstyled and own the visuals.

## Styling

All styling goes through `boogie-design-system`. In a component that means: token
classes only, no hex, no arbitrary brackets, `rounded-none` on rectangles.

## Definition of done for a component

- [ ] Server component unless it is on the client list above, with the reason written down
- [ ] No literal design values; all classes resolve to tokens
- [ ] Keyboard reachable, visible focus, correct semantics — built in, not audited in
- [ ] Every interactive element has an accessible name
- [ ] Images use `next/image` with explicit `width`/`height` or `fill` + a ratio box
- [ ] No `any`, no non-null `!` on data that came from the catalog
- [ ] Renders correctly at 360 / 768 / 1024 / 1440
- [ ] Reduced-motion path verified if it animates
