# Image & video generation prompts — Boogie Ice Creams

Generation prompts for every asset the site references, organised by the section it appears in.

**Mockup stage: 10 images — DONE.** Generated and live as of 18 Aug 2026. 3 shared product
shots + 7 editorial blocks, one neutral tub reused across all twelve flavours.

Shipped as **WebP, not PNG**: the products need alpha, and PNG-with-alpha at 1200 × 1500 lands
at 1–2 MB against a 200 KB budget. WebP keeps the alpha and comes in at 114–177 KB. `next/image`
serves AVIF/WebP either way, so nothing downstream changed. Generate as PNG if your tool prefers
it, then convert on the way in.

**Production: 36 more images.** The per-flavour set (12 × 3) is in §8, ready for when the
mockup is signed off. It is the single biggest visual upgrade left — see §4.4 on why twelve
identical cards undersell the `/products` grid.

**No video is required.** The build has no video element and the PRD does not call for one.
Optional prompts are in §7 with the trade-offs stated.

---

## 0. How to use this file

1. Find your section in the map (§2). It names the asset, the size, and which prompt to run.
2. Run the prompt in any generator (Midjourney, Flux, Nano Banana, Seedream, Firefly — the style block is model-agnostic).
3. Export at the stated pixel size. Product shots **must** be PNG with a real alpha channel.
4. Keep each file ≤ 200 KB, and the hero shot ≤ 180 KB (PRD §7). `next/image` handles AVIF/WebP conversion; keep the source PNG lean.
5. Drop into `public/images/products/` or `public/images/editorial/` with the **exact filename** in the map.
6. Wire them up with the commands in §4.3 and §3.
7. Delete the SVG escape hatch from `next.config.ts` — the two lines marked `dangerouslyAllowSVG` and `contentSecurityPolicy`. They exist only for the generated placeholders.
8. `npm run validate:catalog && npm run test:e2e` — the catalog gate checks every image path resolves, and the visual QA gate re-captures all four breakpoints.

**Two rules that override any prompt below.** Do not generate an award medal, certification
mark, organic or vegan seal, "made in" badge, or star rating — the brand has been given none,
and inventing one in a picture is the same offence as inventing one in copy. And keep alt text
true: alt describes the image that actually exists, never the one you wish existed. §4.4 covers
this, and it is the one thing a shared product image genuinely breaks.

---

## 1. The global style block

Prepend to **every** prompt in this file. It is the whole visual thesis in one paragraph.

```
Editorial food photography for a premium small-batch ice cream brand. Enormous negative
space, calm and expensive, closer to fine jewellery advertising than to food packaging.
Single soft key light from upper left, large diffuser, gentle falloff, soft-edged natural
shadow. Warm neutral palette: bone-paper background #F5F1E8, deep plum #7C1F45, muted gold
#D2A65A, cocoa #332B2E. No hard specular hotspots, no glossy commercial sheen, no colour
gels. Matte finish, fine natural grain, restrained contrast. Shot on medium format, 100mm
macro equivalent, f/8, everything in sharp focus.
```

**Negative prompt for every generation:**

```
text, lettering, watermark, logo marks other than the specified label, award medal, ribbon,
certification badge, star rating, cartoon, 3D render look, plastic sheen, HDR, oversaturated,
neon, blue or teal tint, cold light, busy background, props clutter, hands unless specified,
faces, brand names, drop shadow box, vignette, border, rounded picture corners
```

---

## 2. Every section, and the asset it needs

Six of the eleven Home sections need no image at all — they are type, colour and space. That is
the reference site's whole trick, and it is worth not "fixing".

### Home — `/`

| # | Section | Asset | Size | Prompt |
|---|---|---|---|---|
| 1 | Header | none — wordmark is live type | — | §5.3 |
| 2 | **Hero** | `products/tub-hero.png` on the inline gold petal | 1200 × 1500 | §4.2 |
| 3 | **Best sellers** | the same product shots, 4-up carousel | 1200 × 1500 | §4.2 |
| 4 | **Natural & simple** | `editorial/story.png` | 1200 × 1400 | §3.1 |
| 5 | **Made with passion** | `editorial/passion.png` + gold line-art fruit | 1400 × 1000 | §3.2, §5.2 |
| 6 | **Ice cream heaven** | `editorial/heaven.png` | 1200 × 1000 | §3.3 |
| 7 | **Trust band** | 4 gold seal icons | 400 × 400 each | §5.1 |
| 8 | **Category tiles** | 3 tile images | 1000 × 1200 each | §3.5 |
| 9 | Testimonial | none — centred type on paper | — | — |
| 10 | **Trade** | `editorial/trade.png` | 1200 × 1000 | §3.4 |
| 11 | Footer | none | — | — |

### Products listing — `/products`

| # | Section | Asset | Size | Prompt |
|---|---|---|---|---|
| 1 | **Page hero** | featured product shot on the gold petal | 1200 × 1500 | §4.2 |
| 2 | Filter bar | none | — | — |
| 3 | **Grid** | one product shot per card | 1200 × 1500 | §4.2 |
| 4 | Load more / empty state | none | — | — |

### Product detail — `/products/[slug]`

| # | Section | Asset | Size | Prompt |
|---|---|---|---|---|
| 1 | **Gallery primary** | `-hero` shot on the gold petal | 1200 × 1500 | §4.2 |
| 2 | **Gallery thumbnails** | `-scoop` and `-open` shots | 1200 × 1500 | §4.2 |
| 3 | Buy panel, accordion | none | — | — |
| 4 | **Flavour story** | the `-scoop` shot | 1200 × 1500 | §4.2 |
| 5 | **You may also like** | product shots | 1200 × 1500 | §4.2 |

### Global

| Surface | Asset | Size | Prompt |
|---|---|---|---|
| Cart drawer line items | product shots, reused | 1200 × 1500 | §4.2 |
| 404 page | none — type only | — | §5.4 if you want one |
| Social share card | generated in code today | 1200 × 630 | §5.5 |
| Favicon | **missing** — see §5.3 | — | §5.3 |
| Gold petal | inline SVG, not an asset | — | — |

---

## 3. Editorial images — 7 images

`public/images/editorial/` · lifestyle photography, **opaque**, no transparency needed.
Ratios are load-bearing: the components set the box, so a wrong ratio crops badly.

Wire all seven up with:

```bash
sed -i "" "s#/images/editorial/\([a-z-]*\)\.svg#/images/editorial/\1.png#g" \
  components/home/StorySplit.tsx components/home/PassionCollage.tsx \
  components/home/CategoryTiles.tsx components/home/TradeForm.tsx
```

### 3.1 `story.png` — Home §4, "Natural & simple"

1200 × 1400 (6:7). Bleeds off the left edge on desktop, so keep the subject off-centre right.
Alt: *"A bowl of ice cream with fresh fruit alongside it on a linen cloth"*

```
{GLOBAL STYLE}
A shallow white ceramic bowl holding two scoops of pale ice cream, fresh raspberries and
blackberries beside it, on a crumpled oatmeal linen cloth. A few loose berries and a bare
fruiting branch resting in the negative space. Overhead three-quarter angle. Composition
weighted to the lower right so the upper left stays empty. Portrait orientation, 6:7.
{NEGATIVE PROMPT}
```

### 3.2 `passion.png` — Home §5, "Made with passion"

1400 × 1000 (7:5). Sits offset right, overlapping a sand panel, under a display-xl headline.
Alt: *"A scoop being pressed into a chilled glass beside a mixing bowl"*

```
{GLOBAL STYLE}
Close crop of a stainless ice cream scoop pressing a dense ball of pale ice cream into a
chilled clear glass, on a pale stone worktop. A stoneware mixing bowl and a marble pestle sit
softly out of focus behind. One pair of hands may be present, cropped at the wrist, no face
and no jewellery. Landscape orientation, 7:5.
{NEGATIVE PROMPT}
```

### 3.3 `heaven.png` — Home §6, "Ice cream heaven"

1200 × 1000 (6:5). Offset lower-left, overlapping the same sand panel.
Alt: *"Three scoops in a glass bowl with strawberries scattered around it"*

```
{GLOBAL STYLE}
Three scoops of pale pink ice cream in a clear glass bowl, seen from a high angle, with fresh
strawberries and a few strawberry leaves scattered on a pale pink striped cotton cloth around
it. A single spoon resting to the side. Landscape orientation, 6:5.
{NEGATIVE PROMPT}
```

### 3.4 `trade.png` — Home §10, trade section

1200 × 1000 (6:5). Sits beside the enquiry form. This one sells credibility to a buyer, not
appetite to a shopper — keep it cool and operational.
Alt: *"Catering tubs stacked in a cold store ready for delivery"*

```
{GLOBAL STYLE}
Large plain catering-size ice cream tubs stacked two high on a brushed stainless steel counter
in a clean production kitchen, shallow depth of field, cold-store shelving softly out of focus
behind. Unbranded matte white tubs with plain gold rim bands. Calm, industrial, credible.
No people. Landscape orientation, 6:5.
{NEGATIVE PROMPT}
```

### 3.5 Category tiles — Home §8, three images

1000 × 1200 (5:6) each. They carry white text over a plum scrim, so the composition must keep
the **bottom-left third quiet and mid-to-dark in value** or the label loses contrast. Say so in
the prompt.

```
{GLOBAL STYLE}
{TILE SUBJECT}
Portrait orientation, 5:6. The lower-left third of the frame is deliberately quiet, softly
shadowed and free of detail, to carry overlaid white text. Mid-to-dark overall value.
{NEGATIVE PROMPT}
```

| File | `{TILE SUBJECT}` |
|---|---|
| `tile-take-home.png` | Two closed ice cream tubs on a home kitchen counter beside two spoons and a folded linen napkin, warm evening light, lived-in and domestic. |
| `tile-parties.png` | Eight small single-serve ice cream pots laid out in a loose grid on a long table with spoons beside them, set for a gathering, no people. |
| `tile-trade.png` | One large catering tub open on a stainless steel counter with a professional scoop resting across it, clean commercial kitchen, no people. |

---

## 4. Product shots — 3 images, shared across all twelve flavours

`public/images/products/` · **1200 × 1500 px (4:5)** · **PNG, transparent background**

Transparency is not optional. Every product sits on `--paper` or on the gold petal, and a
baked-in white box shows as a visible rectangle on both.

**Why three and not one.** The schema accepts a single image, but the PDP gallery only renders
its thumbnail strip when a product has more than one. Three shots keep the gallery, the
thumbnail swap and its arrow-key navigation real in the mockup. Drop to one file if you only
need the grid — see §4.3, option A.

**Colour is deliberately neutral.** A warm ivory tub reads as unbranded-by-flavour and does not
fight a name like "Blood Orange Sorbet" the way a pink tub would.

### 4.1 The tub — describe it identically in all three shots

```
A cylindrical pint-style ice cream tub, slightly tapered towards the base, matte uncoated
card, warm ivory cream body. A muted gold #D2A65A band wraps the lid rim. A deep plum #3F1330
label band wraps the middle third of the body, carrying the lowercase italic serif wordmark
"boogie" in bone-paper white, and beneath it "SMALL BATCH" in small wide-letterspaced gold
capitals. Thin gold hairline rules above and below the label band. No other graphics anywhere
on the tub.
```

### 4.2 The three prompts

**`tub-hero.png`** — the product card, the Home hero, the PDP gallery primary. This one carries
the site; it is the LCP element, so keep it ≤ 180 KB.

```
{GLOBAL STYLE}
{TUB}
Single closed tub, floating, tilted about 12 degrees to the left, seen slightly from above so
the lid is visible as a shallow ellipse. Centred with generous empty margin on all sides.
Cut out completely on a transparent background, soft contact shadow retained beneath.
{NEGATIVE PROMPT}
```

**`tub-scoop.png`** — gallery thumbnail 2, and the PDP flavour-story image.

```
{GLOBAL STYLE}
A single dense scoop of pale cream ice cream, resting alone, no bowl and no cone. Dense
low-air texture with visible churn ridges, slightly softened at the edge as if ten minutes out
of the freezer. No inclusions, no sauce, no fruit. Centred, generous empty margin. Cut out on
a transparent background with a soft contact shadow.
{NEGATIVE PROMPT}
```

**`tub-open.png`** — gallery thumbnail 3.

```
{GLOBAL STYLE}
{TUB}
The same tub with its lid off, shot from directly overhead at a slight angle so both the label
band and the surface of the ice cream are visible. The surface is smooth, pale cream and even.
Lid resting just out of frame. Cut out on a transparent background.
{NEGATIVE PROMPT}
```

### 4.3 Wiring the shared shots in

**Option A — one image per product**, simplest. The PDP gallery drops its thumbnail strip
automatically, which is correct behaviour rather than a bug.

```bash
node -e '
const fs=require("fs"),g=require("path");
for(const f of fs.readdirSync("content/products").filter(n=>n.endsWith(".ts")&&n!=="index.ts")){
  const p=g.join("content/products",f);
  let s=fs.readFileSync(p,"utf8");
  s=s.replace(/images: \[[\s\S]*?\n  \],/,
    `images: [\n    { src: "/images/products/tub-hero.png", alt: "A Boogie tub, tilted, gold band across a warm ivory body", width: 1200, height: 1500 },\n  ],`);
  fs.writeFileSync(p,s);
}
console.log("pointed every product at the shared hero shot");
'
```

**Option B — all three shots, gallery intact.** Recommended for a design review.

```bash
# swap the paths
sed -i "" -E "s#/images/products/[a-z0-9-]+-(hero|scoop|open)\.svg#/images/products/tub-\1.png#g" content/products/*.ts

# make the alt text true again — see §4.4
sed -i "" \
  -e "s#alt: 'A tub of [^']*'#alt: 'A Boogie tub, tilted, gold band across a warm ivory body'#" \
  -e "s#alt: 'A single-serve pot[^']*'#alt: 'A Boogie tub, tilted, gold band across a warm ivory body'#" \
  -e "s#alt: 'A scoop[^']*'#alt: 'A single dense scoop of pale cream ice cream'#" \
  -e "s#alt: 'A pale gold scoop[^']*'#alt: 'A single dense scoop of pale cream ice cream'#" \
  -e "s#alt: 'A [a-z ]*scoop[^']*'#alt: 'A single dense scoop of pale cream ice cream'#" \
  -e "s#alt: 'A spoonful[^']*'#alt: 'A single dense scoop of pale cream ice cream'#" \
  -e "s#alt: 'The open tub[^']*'#alt: 'An open Boogie tub from above, smooth pale cream surface'#" \
  -e "s#alt: 'The open pot[^']*'#alt: 'An open Boogie tub from above, smooth pale cream surface'#" \
  content/products/*.ts

npm run validate:catalog
```

### 4.4 The catch worth knowing about

Every product currently carries alt text describing **its own** flavour — "whole pieces of
strawberry through pale pink cream", "a muted green scoop with visible ground pistachio". The
moment twelve products share one ivory tub, those descriptions are false, and a screen-reader
user is told about strawberries that are not in the picture. That is not a cosmetic issue; it
is the same rule as not inventing an award.

The `sed` block in option B genericises all 36 alt strings. Run it, or write your own — but do
not skip it. `npm run validate:catalog` will not catch this, because the alt strings are still
well-formed; only a human notices they are lying.

The trade-off in the other direction: twelve identical cards make the `/products` grid look
like one product listed twelve times, and flavour differentiation is most of what that page
sells. The generated placeholder SVGs currently in the repo give each flavour its own colour,
so for the grid specifically they are the stronger mockup. Shared photography is the better
mockup for the PDP and the hero. Consider running §7 for the four best sellers only, and
sharing the neutral tub across the rest.

---

## 5. Sections drawn in code today, and the two genuinely missing assets

### 5.1 Trust band seals — Home §7, four icons

400 × 400 PNG transparent, on the ink-plum band. Currently concentric gold rings in
`components/home/TrustBand.tsx`, which work; generate these only if you want art.

```
A single minimal line-art icon in muted gold #D2A65A on a transparent background, uniform
1.5px stroke weight, no fill, no text, no badge or medal framing, enclosed in a simple thin
circular outline. Subject: {SUBJECT}. Flat, geometric, editorial.
```

`{SUBJECT}` per seal, matching the four claims already on the page — a crossed-out preservative
bottle · a whole strawberry with two leaves · a milk churn · a small ice cream churn paddle.

Keep them plain outlines. The moment one looks like an official certification mark it becomes a
claim the brand cannot back.

### 5.2 Line-art fruit — Home §5 background

800 × 800 transparent PNG, sits at 8% opacity behind "Made with passion"
(`components/home/PassionCollage.tsx`). Currently inline SVG.

```
Minimal single-weight line drawing of a strawberry, a halved orange and two leaves, arranged
loosely, muted gold #D2A65A hairline stroke, no fill, no text, transparent background,
botanical illustration style, extremely sparse.
```

### 5.3 Wordmark and favicon — header, footer, browser tab

**The site currently has no favicon at all.** Browsers fall back to a blank page icon. That is
a real gap, not a placeholder decision, and it is the one item here worth fixing before any
client sees the mockup.

**Neither is a generation job.** PRD §11 decision 5 is still open on whether a wordmark asset
exists. The site sets "boogie" in italic Fraunces (`components/ui/Wordmark.tsx`), a deliberate
placeholder that reads correctly. A real wordmark needs a designer and an outline file —
image models produce logos that cannot be reproduced at 16px, recoloured, or trademarked.

Interim favicon, no generator required: set the wordmark's "b" in Fraunces, mulberry on paper,
and export at 512 × 512. Drop it at `app/icon.png` and Next.js wires it up with no code change.

### 5.4 404 page — optional

The 404 is type on paper and needs nothing. If you want an image, keep it quiet — a mistake
page is not a place to sell.

```
{GLOBAL STYLE}
A single empty ice cream tub lying on its side on a bone-paper surface, lid off and resting
beside it, nothing inside. Lots of empty space. Cut out on a transparent background.
{NEGATIVE PROMPT}
```

### 5.5 Social share card — every route

1200 × 630. Generated in code today by `app/opengraph-image.tsx` and
`app/products/[slug]/opengraph-image.tsx`, which compose the wordmark and product name over
paper with a gold rule — per-product, always current, zero maintenance.

**Replacing that with a static image is usually a downgrade**, because one flat card cannot
name the flavour being shared. Only do it if you want a designed brand card for the home route,
and keep the generated per-product ones.

```
{GLOBAL STYLE}
Wide landscape composition, 1200 x 630. Three closed ice cream tubs grouped slightly
overlapping on a bone-paper background, one tilted, generous empty space in the left third for
overlaid text. A single muted gold organic blob shape sits behind the tubs as a stage.
No text in the image itself.
{NEGATIVE PROMPT}
```

---

## 6. Post-generation checklist

**Mockup stage**

- [ ] 3 product PNGs at 1200 × 1500 with a genuine alpha channel — check one against a checkerboard, not just the thumbnail
- [ ] 7 editorial PNGs at exactly the ratios in §3
- [ ] Alt text genericised across all products (§4.4) — no product claims a flavour its picture does not show
- [ ] No award, certification, seal or rating anywhere
- [ ] `tub-hero.png` ≤ 180 KB; everything else ≤ 200 KB
- [ ] Paths swapped from `.svg` to `.png`; `dangerouslyAllowSVG` removed from `next.config.ts`
- [ ] `npm run validate:catalog` · `npm run check:budget` · `npm run test:e2e` all pass

**Before production**

- [ ] §8 run for all twelve flavours, packaging identical across every shot
- [ ] Per-flavour alt text restored to describe each real image
- [ ] Client sign-off on product records (`content/products/signoff.json`, `npm run validate:catalog -- --strict`)

---

## 7. Video — optional, and not currently wired

The site has no video and needs none. Two places could take one, and both cost something
against PRD §7, so treat this as a decision rather than a to-do.

**Hero ambient loop** — would replace the hero still. **Not recommended:** the hero still is the
LCP element with a ≤ 2.5s budget and a ≤ 180 KB allowance; video there trades the project's
most-watched metric for atmosphere. If you do it, keep the still as the poster frame so LCP is
unchanged, autoplay muted inline, ≤ 3 MB, and skip the video entirely under
`prefers-reduced-motion`.

```
Six-second seamless loop, locked-off camera, no cuts. A single closed ice cream tub on a
bone-paper surface, a slow drift of cold vapour passing across the base. Editorial food
photography, soft single key light from upper left, warm neutral palette of bone paper, deep
plum and muted gold, matte finish, fine grain. Almost nothing moves. No text, no people, no
camera movement, no zoom, no music cues.
```

**Process film for the story section** — a better fit, below the fold, loads on demand.

```
Twelve-second sequence of three slow shots, no cuts within each: fresh strawberries being
crushed by hand in a stoneware bowl; a stainless churn paddle turning through thick pale ice
cream; a scoop pressed into a chilled glass. Documentary kitchen film, handheld but steady,
soft daylight from a window on the left, warm neutral grade, matte, fine grain. Hands cropped
at the wrist, no faces. No text, no logos, no music.
```

If either ships: `<video muted playsInline preload="none" poster="…">`, MP4 (H.264) plus WebM,
captions not required with no speech, and add the file size to the §7 page-weight budget of the PRD before
merging — `npm run check:budget` will not catch a video, because the site has never had one.

---

## 8. Production: the full per-flavour set — 36 images

Run this when the mockup is approved. Same size, ratio and transparency rules as §4.

Filenames are `{slug}-hero.png`, `{slug}-scoop.png`, `{slug}-open.png` for each of the twelve
slugs in the table below, matching the paths already in `content/products/*.ts`.

### 8.1 The tub — byte-identical every time

Use the §4.1 paragraph, replacing "warm ivory cream body" with the `{BODY COLOUR}` from the
table. Keep every other word the same across all 36 generations. Packaging that drifts between
flavours is the fastest way to make a twelve-product grid look like twelve different brands.

### 8.2 The three shots

Identical to §4.2, with these substitutions:

- **hero** — `{TUB}` with `{BODY COLOUR}`
- **scoop** — replace "pale cream ice cream … No inclusions, no sauce, no fruit" with `{FLAVOUR}` and `{INCLUSIONS}`
- **open** — replace "smooth, pale cream and even" with `{SURFACE}`

### 8.3 Per-flavour substitutions

| Filename stem | `{BODY COLOUR}` | `{FLAVOUR}` / `{INCLUSIONS}` | `{SURFACE}` |
|---|---|---|---|
| `strawberries-and-cream` | pale dusty pink | pale pink strawberry cream ice cream · whole and halved macerated strawberry pieces suspended through it | swirled with crushed strawberry, whole fruit pieces breaking the surface |
| `madagascan-vanilla` | warm ivory cream | pale gold vanilla custard ice cream · dense fine black vanilla seed flecks throughout | smooth and even, densely speckled with vanilla seed |
| `salted-caramel` | deep warm amber | amber caramel ice cream · a darker burnt-caramel ribbon folded through, a few coarse salt flakes on top | caramel sauce swirled across in a loose spiral |
| `honeycomb` | soft honey gold | pale gold honeycomb ice cream · irregular hand-broken golden honeycomb shards, crisp and porous | honeycomb shards breaking the surface at angles |
| `dark-chocolate-orange` | very dark chocolate brown | dark chocolate ice cream, nearly black-brown · fine bright orange zest flecks | dark and matte, scattered orange zest |
| `pistachio-and-rose` | muted sage green | dull natural sage-green pistachio ice cream, never bright green · coarsely chopped pistachio pieces | pale green, chopped pistachio scattered over it |
| `alphonso-mango-sorbet` | deep saturated mango yellow | deep golden-orange mango sorbet, dense and glossy, no dairy paleness · no inclusions, perfectly clean | flat, dense, deeply saturated mango orange |
| `blood-orange-sorbet` | deep coral red-orange | deep red-orange blood orange sorbet, dense and glossy · faint darker streaks of pigment | dense red-orange with subtle darker marbling |
| `raspberry-sorbet` | vivid deep pink | dense deep pink raspberry sorbet, completely seedless and smooth · no inclusions | flat, smooth, deep pink, no seeds visible |
| `coconut-and-lime` | soft off-white with a green band | bright white coconut ice cream · shredded coconut and fine green lime zest | white with green lime zest scattered across it |
| `dark-chocolate-oat` | very dark near-black brown | the darkest matte chocolate ice cream, oat-based, low sheen · no inclusions | flat, matte, very dark chocolate |
| `sticky-toffee-pot` | warm tan | pale toffee ice cream over dark date sponge · a spoonful lifted showing dark sponge beneath pale ice cream | toffee sauce pooled on the surface, dark sponge visible at the edge |

**One exception:** `sticky-toffee-pot` is a single-serve 100ml pot, not a pint tub. Replace
"cylindrical pint-style ice cream tub, slightly tapered" with "small single-serve 100ml pot,
squat and straight-sided" and scale the label band proportionally.

### 8.4 Restore the honest alt text

Production shots make the per-flavour alt strings true again. They are in git history — the
originals were written to match these exact prompts, so `git show` the pre-mockup version of
`content/products/` rather than rewriting them by hand.
