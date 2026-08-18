---
name: boogie-visual-qa
description: Browser-driven screenshot verification of Boogie Ice Creams UI against the Berry's blueprint, at 360, 768, 1024 and 1440. Use at the end of any UI milestone, before saying a page or section is done, and when checking whether an implementation actually matches the design. Triggers on "is it done", "check the layout", "screenshot", "take screenshots", "visual QA", "does this match the design", "review the page", "responsive check", "breakpoints", "before merge".
---

# Visual QA

**Screenshots or it didn't happen.** No UI milestone is complete until this has run and
the artifact is attached. The agent drifts from the blueprint over long sessions; this
is the gate that catches it.

## Procedure

1. `pnpm dev`, open the route in the Browser tool.
2. Capture **full-page** screenshots at **360 · 768 · 1024 · 1440**. Home also gets 1920.
3. Capture the interaction states below for the route.
4. Score against the rubric. Any ❌ is fixed before the milestone closes.
5. Attach a Screenshots artifact with one caption per shot naming the rubric item it
   proves or fails.

## Interaction states to capture

| Route | Also capture |
|---|---|
| Any | Header scrolled past 80px — paper background + gold hairline present |
| Any | A visible focus ring, mid-tab |
| Home | Best sellers carousel scrolled one page; trade form with a validation error |
| `/products` | A filter applied via URL; the empty state at `?category=llama` |
| PDP | Size selector with an out-of-stock size; accordion open on Allergens |
| Global | Cart drawer open with 2 lines, and empty |

## Rubric

**Layout**
- [ ] Container is 1280px max, gutters 24px mobile / 48px ≥ lg
- [ ] Hero is a 5/7 split at `lg`; feature sections are 6/6 with a one-column image bleed
- [ ] Section rhythm reads 96px mobile / 160px desktop, consistently
- [ ] Grid counts correct: 4-up `xl`, 3-up `lg`, 2-up `sm`, 1-up mobile
- [ ] Best sellers is 1.4-up scroll-snap on mobile, not 1-up

**Identity**
- [ ] **Every rectangle has square corners.** One rounded card fails the whole pass
- [ ] No shadows on panels or cards
- [ ] Headings are Fraunces, body is Hanken, nothing serif below 24px
- [ ] Gold appears only as petal, hairline, seals and focus ring
- [ ] The petal appears **exactly three times site-wide** — hero, `/products` featured,
      PDP primary
- [ ] Negative space reads generous, closer to the reference than to a template

**Behaviour**
- [ ] Header transitions transparent → paper with hairline at 80px
- [ ] Card hover scales the image 1.03 and moves nothing else
- [ ] Sections reveal once; scrolling back does not re-animate
- [ ] Drawer slides from the right, traps focus, `Esc` closes

**Integrity**
- [ ] No horizontal scroll at any width — check 360 especially
- [ ] Nothing shifts while images load; ratio boxes reserved
- [ ] No text clipped, no orphaned single word in a headline at 768
- [ ] No `TODO(copy):` and no lorem visible anywhere on screen
- [ ] Every image is a real product render at the catalog aspect ratio

## Comparing to the blueprint

The Berry's reference screenshots are in the repo root. Compare **section order,
proportion and density** — not pixels. The question is "would these two sit on the same
shelf", not "are these identical". Where Boogie is meant to diverge, it is the palette
(plum, not burgundy) and nothing else.

## Reporting a failure

State the breakpoint, the rubric line, and what is on screen instead. Attach the
screenshot cropped to the failure.

> ❌ 768 · "Grid counts correct" — products grid renders 3-up at 768; blueprint calls
> for 2-up until `lg`. `ProductGrid` uses `md:grid-cols-3`, should be `lg:grid-cols-3`.

When the same failure appears twice across milestones, do not fix it in the component —
fix the SKILL.md that let it through, then re-run.
