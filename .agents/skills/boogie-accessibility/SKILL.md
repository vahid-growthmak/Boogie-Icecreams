---
name: boogie-accessibility
description: WCAG 2.2 AA patterns and remediation for every interactive part of Boogie Ice Creams — cart drawer, carousel, filter chips, size selector, quantity stepper, accordion, forms, mobile nav. Use while writing any interactive component, not after, and when fixing a keyboard, focus, contrast, screen-reader or axe finding. Triggers on "accessibility", "a11y", "WCAG", "keyboard", "focus trap", "focus ring", "aria-label", "screen reader", "axe", "contrast", "tab order", "skip link", "semantic HTML", "role".
---

# Accessibility

WCAG 2.2 AA. **Built in, not audited in** — this skill is read while writing the
component, and `axe` reporting zero critical or serious findings is a merge gate.

## Non-negotiables

1. **Everything reachable by keyboard**, in DOM order, with no traps except the drawer's
   deliberate one.
2. **Visible focus everywhere**: `2px solid var(--color-gold)`, `2px` offset. Set once
   in `globals.css`. Never `outline: none` without an equal or better replacement —
   there is no reason to, gold on paper and gold on ink-plum both clear 3:1.
3. **Real semantics.** `<button>` for actions, `<a>`/`<Link>` for navigation, `<ul>` for
   lists of products, `<table>` for the nutrition table with `<th scope>`. A `<div>` with
   `onClick` is a defect.
4. **Every control has an accessible name.** Icon-only buttons carry `aria-label`;
   decorative SVG carries `aria-hidden="true"`.
5. **Heading order descends without skipping.** One `h1` per route.
6. **Colour is never the only signal** — the active filter chip has a filled background
   *and* `aria-pressed`, not just a colour shift.
7. `prefers-reduced-motion` honoured, with content visible — see `boogie-motion`.

Skip link to `#main` is the first focusable element on every page, visually hidden until
focused.

## Per-component patterns

**Cart drawer** — Radix `Dialog`. `aria-modal`, labelled "Your cart". Focus moves to the
drawer on open and **returns to the exact trigger** on close (header button, or the
quick-add on the card that was clicked). `Esc` closes. Background inert, body scroll
locked. Announce the item count change with a polite live region, not an alert.

**Best sellers carousel** — a scroll-snap list, not a widget. Arrow buttons are
`<button aria-label="Previous flavours">` / `"Next flavours"`. Cards are in tab order and
focusing one scrolls it into view. Left/right arrow keys move between cards when focus is
inside the list. Never `aria-hidden` an off-screen card that is still tabbable.

**Filter chips** — `<button aria-pressed="true|false">` inside a group with an
accessible name ("Filter by category"). Result count changes are announced through one
`aria-live="polite"` region: "12 flavours". Sort is a real `<select>` with a `<label>`,
or Radix Select with a label — not a styled div.

**Size selector** — Radix Toggle Group, `type="single"`, roving tabindex. Out-of-stock
sizes are `disabled` **with the reason exposed**, via `aria-describedby` pointing at
visible text ("Sold out in 500ml"). Never hide an out-of-stock size — hiding it makes it
unfindable and unexplainable.

**Quantity stepper** — two buttons plus a `<input type="number">` with a label
("Quantity"). Buttons are `aria-label="Increase quantity"` / `"Decrease quantity"`, and
the decrease button is `disabled` at 1. Value changes announce politely.

**Accordion (Ingredients / Allergens / Nutrition / Storage)** — Radix Accordion. Headers
are `<button>` inside the correct heading level. **Allergens are open by default when the
product contains a top allergen**, and the whole block is server-rendered, so it is
readable with JavaScript disabled (PRD §5.3 acceptance). Nutrition is a real table with
row headers and a caption.

**Forms (trade, contact)** — real `<label>` bound with `htmlFor`, never placeholder-as-
label. Errors are `aria-describedby` on the field, `aria-invalid="true"`, text that says
what to do, and focus moves to the first invalid field on submit. Success is announced
in a live region.

**Mobile nav** — a Dialog with the same trap-and-return rules as the cart. The toggle is
`aria-expanded` and `aria-controls`.

**Images** — alt describes the flavour, not the file. Petal and line-art decoration are
`alt=""` + `aria-hidden`. See `boogie-brand-voice`.

## Contrast — already-checked pairs

| Pair | Ratio | Verdict |
|---|---|---|
| cocoa on paper | 11.6:1 | ✅ |
| mulberry on paper | 8.9:1 | ✅ |
| paper on ink-plum | 13.4:1 | ✅ |
| white on black CTA | 18.9:1 | ✅ |
| cocoa-60 on paper | 5.8:1 | ✅ — **but only at 75% alpha** (see below) |
| **gold on paper** | **2.1:1** | ❌ never text. Focus ring, hairline, seal fill only |
| gold on ink-plum | 5.9:1 | ✅ large text and icons |

**`--cocoa-60` is a corrected value.** PRD §4.2 specifies `#332B2E99` — 60% alpha —
which measures **3.73:1** on paper and fails AA for the caption, attribution and meta
text it carries. axe caught it on all three routes. The token is defined at 75% alpha
(`#332B2EBF`) instead. Do not "restore" it to the PRD value: the PRD's own §7 AA
requirement is the stronger constraint, and a 60% tint of the body colour cannot
satisfy it on this background. Any new alpha-tinted token gets measured, not assumed.

## Verification loop

1. Tab through the whole route with the mouse untouched. Every stop must be visible and
   its purpose obvious.
2. `Esc` from every overlay; confirm where focus lands.
3. Run axe (Playwright `@axe-core/playwright`) on `/`, `/products`, one PDP, and with the
   drawer open. Zero critical, zero serious.
4. Toggle reduced motion; reload; confirm all content is present.
5. Zoom to 200% and to 400% at 1280px — no content lost, no horizontal scroll.
6. Read one PDP with VoiceOver rotor: headings make sense alone, allergens are findable.

## Merge blockers

`outline: none` without replacement · a `div` with `onClick` · an icon button with no
name · a hidden out-of-stock size · a focus trap without a return path · placeholder used
as label · skipped heading level · gold text on paper · any critical or serious axe finding.
