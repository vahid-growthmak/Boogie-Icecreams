---
name: boogie-motion
description: The complete set of permitted animations for Boogie Ice Creams — scroll reveal, card hover, drawer slide, petal parallax — with exact timings, easing, stagger and reduced-motion behaviour. Use before adding any animation, transition, hover effect, carousel movement or parallax, and when a page feels janky or shifts while loading. Triggers on "animate", "animation", "transition", "hover effect", "scroll reveal", "fade in", "parallax", "stagger", "framer motion", "motion", "prefers-reduced-motion", "layout shift", "CLS".
---

# Motion

Motion on this site is almost absent, and that is the point. The reference reads as
editorial because things arrive quietly and then hold still. **Four motions exist.
There is no fifth.**

Library: `motion` (the Framer Motion successor), used for scroll reveals and the drawer
only. Hover and parallax are CSS.

## 1. Scroll reveal

```
opacity   0 → 1
translateY 16px → 0
duration  420ms
easing    cubic-bezier(0.22, 1, 0.36, 1)
stagger   60ms within a group
trigger   once, at 20% viewport intersection
```

Implemented once, in `components/ui/Reveal.tsx`. Every section wraps its content in it;
nobody writes a second reveal.

- **Fires once.** `viewport={{ once: true, amount: 0.2 }}`. Elements never re-animate on
  scroll back — that reads as a demo, not a shop.
- Stagger applies **within a group** (the four product cards, the four trust seals), not
  across the page. Section 7 does not wait for section 3.
- Above-the-fold content **does not reveal**. The hero is visible at first paint. A
  fading LCP element is a slower LCP element.

## 2. Product card hover

Image scales `1.0 → 1.03` over `500ms`. **Nothing else moves.** No lift, no shadow, no
border, no colour change on the name, no translate on the price.

The scale happens on the image inside an `overflow-hidden` fixed-ratio box, so the card
bounds never change and nothing reflows. Touch devices get no hover state at all — the
quick-add button is permanently visible there instead.

## 3. Cart drawer

Slides from the right, `320ms`, same easing. The overlay fades `0 → 0.4` over the same
duration. Exit is the same in reverse, and must complete before focus returns to the
trigger. Radix `Dialog` handles the focus and `Esc`; motion handles only the transform.

## 4. Gold petal parallax

Translates at `0.15` of scroll rate, **desktop only** (`lg` and up), and only in the
three permitted petal positions. It never animates on load. Implemented with a
transform on a `will-change: transform` element inside a clipped container, so it can
never widen the page or create horizontal scroll.

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) { /* in globals.css */ }
```

The global rule collapses durations to `0.01ms`. On top of that, every JS-driven motion
checks `useReducedMotion()` and:

- Reveal renders content **already visible** — never invisible-and-never-revealed. This
  is the failure mode that matters: a broken reveal under reduced motion means a blank
  page for the user who asked for less movement.
- Drawer opens instantly, still focus-trapped.
- Parallax is not mounted at all.

Verify by toggling reduced motion in the OS and reloading, not by reading the code.

## Never

- Animate `width`, `height`, `top`, `left`, or anything that isn't `transform`/`opacity`
- Animate on page load — no hero entrance, no logo draw, no counter count-up
- Parallax anything that is not the petal
- Add a page transition between routes
- Animate the petal's shape, or add a second easing curve to the codebase
- Reserve no space for a revealing element — every `Reveal` child occupies its final
  box from first paint, because CLS budget is `0.02`

## Checklist

- [ ] Uses `<Reveal>` rather than a bespoke animation
- [ ] `transform` and `opacity` only
- [ ] Fires once; no re-animation on scroll back
- [ ] Reduced-motion path shows the content, verified in the OS setting
- [ ] No layout shift — measure, don't assume
- [ ] Nothing above the fold animates
