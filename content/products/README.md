# Product catalog — placeholder content

**Every record in this folder is placeholder content awaiting client sign-off.**

Ingredients, allergens and nutrition figures are illustrative. They are structurally
correct and schema-valid so the site can be built and reviewed, and they are **not
approved for staging or production**. PRD §10 lists wrong nutrition and allergen data as
legal and safety exposure, and requires client sign-off on every record before launch.

`content/products/signoff.json` tracks the state of each record. `npm run validate:catalog`
prints the outstanding list; `npm run validate:catalog -- --strict` exits non-zero while any
record is unsigned, which is what CI runs on the staging branch.

Product imagery is likewise placeholder — locally generated SVG renders at the final
aspect ratio (1200×1500), produced by `npm run gen:images`. Replace file-for-file with
real cut-out photography on transparent backgrounds, then delete `dangerouslyAllowSVG`
from `next.config.ts`.

## Adding a flavour

1. Create `<slug>.ts` exporting a `Product`.
2. SKU format `BOOGIE-<4 LETTERS>-<volume in ml>`, unique across the catalog.
3. Variants ascending by volume. `500ml` must exist and be in stock for anything shown
   in the D2C grid. `2.4L` and `5L` are `tradeOnly: true`.
4. Register it in `index.ts` and add it to `signoff.json`.
5. `npm run validate:catalog && npm run typecheck`.
