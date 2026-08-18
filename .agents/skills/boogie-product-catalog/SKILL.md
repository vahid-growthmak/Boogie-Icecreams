---
name: boogie-product-catalog
description: The Zod product schema, the rules for adding or editing a flavour, and the catalog query API for Boogie Ice Creams. Use when adding a product, editing product data, touching content/products/*.ts or lib/catalog.ts, changing the product or variant shape, working with SKUs, prices, sizes, allergens or nutrition, or querying products for a page. Triggers on "add a flavour", "new product", "product data", "product schema", "variant", "SKU", "price", "allergens", "nutrition", "getProductBySlug", "filter products", "validate catalog", "seed products".
---

# Product catalog

Products are file-based for v1: one typed TS module per flavour in `content/products/`,
validated by Zod at build. A CMS is a Phase 2 swap behind the same `lib/catalog.ts`
interface — which is why **nothing outside `lib/catalog.ts` imports `content/`**.

## The schema — `lib/schema.ts`

```ts
export const VariantSchema = z.object({
  sku: z.string(),                       // BOOGIE-STRW-500
  size: z.enum(['100ml', '500ml', '2.4L', '5L']),
  volumeMl: z.number().int().positive(),
  price: z.number().int().positive(),    // minor units (paise)
  compareAtPrice: z.number().int().positive().optional(),
  inStock: z.boolean(),
  tradeOnly: z.boolean().default(false), // 2.4L and 5L hidden from the D2C grid
});

export const ProductSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  strapline: z.string().max(120),
  description: z.string(),
  story: z.string().optional(),
  category: z.enum(['ice-cream', 'sorbet', 'dairy-free', 'dessert']),
  flavourNotes: z.array(z.string()).min(1).max(4),
  badges: z.array(z.enum(['award-winner', 'new', 'seasonal', 'vegan'])).default([]),
  variants: z.array(VariantSchema).min(1),
  images: z.array(z.object({
    src: z.string(), alt: z.string(), width: z.number(), height: z.number(),
  })).min(1),
  ingredients: z.string(),
  allergens: z.array(z.string()),
  nutritionPer100g: z.object({
    energyKj: z.number(), energyKcal: z.number(), fat: z.number(),
    saturates: z.number(), carbohydrate: z.number(), sugars: z.number(),
    protein: z.number(), salt: z.number(),
  }),
  featured: z.boolean().default(false),
  bestSeller: z.boolean().default(false),
  order: z.number().int().default(999),
});
```

Extending the schema means updating `lib/schema.ts`, every existing product file, and
`pnpm validate:catalog` in the same change. A field added to one product only is a bug.

## Money

**Integers in minor units, always.** `price: 45000` is ₹450.00. No float touches a
price at any point — not in data, not in a total, not in an analytics payload.
Formatting happens exactly once, in `lib/format.ts`:

```ts
formatPrice(45000) // "₹450"
```

`compareAtPrice` is the struck-through original and must be strictly greater than
`price`, or omitted. Never set it equal to `price` to render a fake discount.

## Adding a flavour

1. Create `content/products/<slug>.ts`, exporting a `Product` — copy
   `examples/strawberry.ts` from this skill as the shape reference.
2. SKU format: `BOOGIE-<4-LETTER-FLAVOUR>-<SIZE>` — `BOOGIE-STRW-500`. Uppercase,
   unique across the whole catalog.
3. Variants in ascending volume. `500ml` is the D2C default and must exist and be in
   stock for anything shown in the grid. `2.4L` and `5L` are `tradeOnly: true`.
4. Images: cut-out product render on transparent background, exact aspect ratio as the
   rest of the catalog, ≤ 200KB, real `alt` describing the flavour — see
   `boogie-brand-voice`.
5. Register it in `content/products/index.ts`.
6. Run `pnpm validate:catalog` and `pnpm typecheck`.

## Copy, allergens and nutrition — the safety rule

**Never invent product data.** Not an award, not a certification, not an ingredient
origin, not a nutrition figure, not an allergen list. This is legal and safety exposure,
and it is the one rule in the project with no judgement call attached.

Missing data is marked so it fails review:

```ts
ingredients: 'TODO(copy): confirm with client',
allergens: [],                    // TODO(copy): NOT confirmed — do not ship
```

`TODO(copy):` in a shipped route is a merge blocker. No placeholder allergen data
reaches staging (PRD §10).

Allergens use the standard declared names — `Milk`, `Eggs`, `Soya`, `Nuts`, `Peanuts`,
`Gluten` — capitalised exactly, since the PDP renders them verbatim in bold.

## Catalog API — `lib/catalog.ts`

`import 'server-only'` at the top. This module is the only reader of `content/`.

```ts
getAllProducts(): Product[]                       // order asc, then name
getProductBySlug(slug: string): Product | undefined
getProducts(q: CatalogQuery): { items: Product[]; total: number }
getBestSellers(limit?: number): Product[]         // bestSeller, then featured
getFeatured(): Product | undefined                // the petal flavour on /products
getRelated(product: Product, limit = 4): Product[] // same category, falls back to best sellers
getVariantBySku(sku: string): { product: Product; variant: Variant } | undefined
defaultVariant(product: Product): Variant         // 500ml, else first in-stock
```

`CatalogQuery` is `{ category?, sort?, page? }`, parsed from `searchParams` with Zod.
`sort` is `'featured' | 'name-asc' | 'price-asc' | 'price-desc'`. Filtering happens
here, on the server — never in the browser over a full product list.

`getVariantBySku` is what the checkout route uses to re-read prices. It is the single
reason client-supplied prices can be ignored, so it must never be given a fallback that
invents a price for an unknown SKU — return `undefined` and let checkout 400.

## Validation

`pnpm validate:catalog` parses every product through `ProductSchema` and additionally
asserts: unique slugs, unique SKUs, every `images[].src` exists on disk, `500ml` present
for non-trade-only products, `compareAtPrice > price` where present, and no
`TODO(copy):` string in any product marked `featured` or `bestSeller`. It exits non-zero
on any failure and runs in CI.
