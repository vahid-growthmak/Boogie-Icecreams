import { z } from 'zod';

/** PRD §6.3. Prices are integers in minor units (paise). No float touches money. */

export const SIZES = ['100ml', '500ml', '2.4L', '5L'] as const;
export const CATEGORIES = ['ice-cream', 'sorbet', 'dairy-free', 'dessert'] as const;

export const VariantSchema = z.object({
  sku: z.string().regex(/^BOOGIE-[A-Z]{4}-\d+$/),
  size: z.enum(SIZES),
  volumeMl: z.number().int().positive(),
  price: z.number().int().positive(),
  compareAtPrice: z.number().int().positive().optional(),
  inStock: z.boolean(),
  tradeOnly: z.boolean().default(false),
});

export const ProductImageSchema = z.object({
  src: z.string(),
  alt: z.string().min(10),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

export const ProductSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  strapline: z.string().max(120),
  description: z.string(),
  story: z.string().optional(),
  category: z.enum(CATEGORIES),
  flavourNotes: z.array(z.string()).min(1).max(4),
  badges: z.array(z.enum(['award-winner', 'new', 'seasonal', 'vegan'])).default([]),
  variants: z.array(VariantSchema).min(1),
  images: z.array(ProductImageSchema).min(1),
  ingredients: z.string(),
  allergens: z.array(z.string()),
  nutritionPer100g: z.object({
    energyKj: z.number(),
    energyKcal: z.number(),
    fat: z.number(),
    saturates: z.number(),
    carbohydrate: z.number(),
    sugars: z.number(),
    protein: z.number(),
    salt: z.number(),
  }),
  featured: z.boolean().default(false),
  bestSeller: z.boolean().default(false),
  order: z.number().int().default(999),
});

export type Size = (typeof SIZES)[number];
export type Category = (typeof CATEGORIES)[number];
export type Variant = z.infer<typeof VariantSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ProductImage = z.infer<typeof ProductImageSchema>;

/** Category chips on /products, in display order. PRD §5.2. */
export const CATEGORY_LABELS: Record<Category, string> = {
  'ice-cream': 'Ice cream',
  sorbet: 'Sorbet',
  'dairy-free': 'Dairy free',
  dessert: 'Desserts',
};

export const SORTS = ['featured', 'name-asc', 'price-asc', 'price-desc'] as const;
export type Sort = (typeof SORTS)[number];

export const SORT_LABELS: Record<Sort, string> = {
  featured: 'Featured',
  'name-asc': 'A–Z',
  'price-asc': 'Price, low to high',
  'price-desc': 'Price, high to low',
};

/**
 * searchParams for /products. Unknown values fall through to the default so a
 * hand-edited URL renders the empty state, never a 500. PRD §5.2.
 */
export const CatalogQuerySchema = z.object({
  category: z.enum(CATEGORIES).optional().catch(undefined),
  sort: z.enum(SORTS).default('featured').catch('featured'),
  page: z.coerce.number().int().min(1).default(1).catch(1),
});

export type CatalogQuery = z.infer<typeof CatalogQuerySchema>;

/**
 * A `?category=` value that is not a real category must render the empty state,
 * not silently show everything and not throw. PRD §5.2 acceptance criteria.
 * The schema falls back so nothing crashes; this reports the fallback happened.
 */
export function parseCatalogQuery(raw: Record<string, string | string[] | undefined>): {
  query: CatalogQuery;
  unknownCategory: boolean;
} {
  const query = CatalogQuerySchema.parse(raw);
  const requested = raw.category;
  const unknownCategory =
    typeof requested === 'string' &&
    requested.length > 0 &&
    !CATEGORIES.includes(requested as Category);

  return { query, unknownCategory };
}

/** Shared client + server validation for the trade form. PRD §5.1 row 10. */
export const TradeEnquirySchema = z.object({
  name: z.string().min(2, 'Enter your name'),
  business: z.string().min(2, 'Enter your business name'),
  businessType: z.enum(['deli', 'farm-shop', 'restaurant', 'hotel', 'other']),
  email: z.string().email('That email address is missing something'),
  phone: z.string().min(6, 'Enter a phone number we can reach you on').optional().or(z.literal('')),
  message: z.string().min(10, 'Tell us a little more — 10 characters or so'),
});

export type TradeEnquiry = z.infer<typeof TradeEnquirySchema>;

/** Checkout accepts SKUs and quantities. Never a price. PRD §6.5. */
export const CheckoutInputSchema = z.object({
  lines: z
    .array(
      z.object({
        sku: z.string(),
        quantity: z.number().int().min(1).max(99),
      }),
    )
    .min(1),
});

export type CheckoutInput = z.infer<typeof CheckoutInputSchema>;
