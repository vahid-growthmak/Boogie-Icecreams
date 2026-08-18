---
name: boogie-brand-voice
description: Copywriting rules and vocabulary for every user-facing string on the Boogie Ice Creams site — headings, body copy, button labels, form labels, error and empty states, alt text, meta descriptions and email. Use whenever writing or editing text a customer will read, or when a string needs a label, a tone check, or filling in. Triggers on "write the copy", "what should this button say", "headline", "microcopy", "error message", "empty state", "alt text", "placeholder text", "tone", "meta description", "rename this label".
---

# Brand voice

Boogie is a small-batch maker that takes the product seriously and itself lightly.
The photography is doing the seduction. The words stay out of its way.

**Plain, warm, specific, short.** A sentence that could appear on any ice cream site is
a sentence that isn't finished.

## The five rules

1. **Specific beats superlative.** "Fruit picked in season, crushed the same day" beats
   "the finest ingredients". If you can't be specific, be shorter.
2. **Never invent a fact.** No award, certification, ingredient origin, farm name,
   founding year, nutrition figure or allergen we haven't been given. Mark the gap
   `TODO(copy):` so it fails review. This is a merge blocker, not a preference.
3. **Sentence case for prose, uppercase for labels.** Headlines and body are sentence
   case. Eyebrows, buttons and nav are uppercase, and that is done in CSS via the
   eyebrow token — write them in normal case in the source so screen readers say
   "Add to cart", not "A-D-D".
4. **Second person, present tense, active voice.** "Keep it frozen until you're ready."
   Not "It is recommended that the product be kept frozen."
5. **No exclamation marks.** One is permitted site-wide and it isn't yours.

## Banned vocabulary

> indulge · indulgence · decadent · sinful · guilt-free · treat yourself ·
> elevate · elevated · curated · artisanal · handcrafted with love · premium ·
> luxurious · unlock · discover the difference · a symphony of flavour ·
> our journey · we're passionate about · game-changing · irresistible ·
> heavenly · to die for · melt-in-your-mouth

"Small batch" is allowed because it is a production fact. "Passion" survives only in
the fixed section title **Made With Passion**, which comes from the blueprint.

Em dashes: at most one per paragraph. Rhetorical questions as headings: none.

## Fixed strings — use these exactly

| Where | String |
|---|---|
| Hero headline | Small batch. Big boogie. |
| Hero CTA | OUR PRODUCTS → |
| Best sellers CTA | VIEW COLLECTION |
| Story CTA | OUR STORY → |
| PDP primary | ADD TO CART |
| Grid quick-add accessible name | Add {name}, 500ml, to cart |
| Cart primary | CHECKOUT |
| Cart secondary | Continue shopping |
| Cart empty | Nothing in the cart yet. → Browse the flavours |
| Grid empty | No flavours match that combination yet. → Clear filters |
| Nutrition disclosure | ⓘ NUTRITIONAL INFORMATION |
| Delivery nudge | ₹{n} more for free delivery |
| 404 | That flavour isn't here. → See what is |

## Errors

Say what happened, then what to do. No apology, no blame, no error codes.

| Situation | Say |
|---|---|
| Field required | Enter your name |
| Bad email | That email address is missing something |
| Size out of stock | Sold out in 500ml. 100ml and 2.4L are available. |
| Checkout failed | Payment didn't go through. Nothing was charged — try again. |
| Trade form failed | That didn't send. Email us at {address} and we'll pick it up. |
| Route error | Something broke on our end. → Try again |

Never: "Oops!", "Something went wrong.", "Invalid input.", "Error 500".

## Alt text

Alt text describes **the flavour, not the file**, and never repeats the product name
that already sits next to it as a heading.

- Good: "A 500ml tub of Strawberries & Cream, tilted, with a scoop of pale pink ice
  cream above it"
- Good: "Close scoop showing whole pieces of fruit through the cream"
- Bad: "strawberries-and-cream-tub.png", "Product image", "Strawberries & Cream"

Decorative images — the gold petal, the line-art fruit — take `alt=""` and
`aria-hidden`, because they carry no information.

## Product copy shape

- **Strapline** ≤ 120 characters, one sentence, describes taste or making. It sits
  under the name in body-lead mulberry.
- **Description** two or three sentences. What it is, what's in it, why it tastes that way.
- **Story** optional, two or three sentences, first person plural, a real detail about
  how or when it's made.
- **Flavour notes** one to four noun phrases, capitalised: `Ripe strawberry`,
  `Fresh cream`, `Vanilla`.

## Trade copy

Trade buyers get the credibility register: sizes, lead times, contact route, provenance.
Same rules, less lyricism, no invented certification. The trade section answers "can I
get 5L tubs and are you real", nothing else.
