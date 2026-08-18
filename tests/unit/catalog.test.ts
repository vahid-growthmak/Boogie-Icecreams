import { describe, expect, it } from 'vitest';

import { products } from '@/content/products';
import { formatPrice, toDecimalString } from '@/lib/format';
import { CatalogQuerySchema, ProductSchema } from '@/lib/schema';

describe('money', () => {
  it('formats paise as whole rupees', () => {
    expect(formatPrice(45000)).toBe('₹450');
  });

  it('keeps paise when they are not whole rupees', () => {
    expect(formatPrice(45050)).toBe('₹450.50');
  });

  it('produces a decimal string for schema.org and payment SDKs', () => {
    expect(toDecimalString(45000)).toBe('450.00');
    expect(toDecimalString(14000)).toBe('140.00');
  });
});

describe('catalog query', () => {
  it('falls through to defaults for an unknown category', () => {
    // A hand-edited URL must render the empty state, never throw. PRD §5.2.
    const query = CatalogQuerySchema.parse({ category: 'llama', sort: 'chaos', page: 'x' });
    expect(query.category).toBeUndefined();
    expect(query.sort).toBe('featured');
    expect(query.page).toBe(1);
  });

  it('accepts a real filter', () => {
    const query = CatalogQuerySchema.parse({ category: 'sorbet', sort: 'price-asc', page: '2' });
    expect(query).toEqual({ category: 'sorbet', sort: 'price-asc', page: 2 });
  });
});

describe('seed catalog', () => {
  it('every product satisfies the schema', () => {
    for (const product of products) {
      expect(ProductSchema.safeParse(product).success, product.slug).toBe(true);
    }
  });

  it('prices are integers in minor units', () => {
    for (const product of products) {
      for (const variant of product.variants) {
        expect(Number.isInteger(variant.price), variant.sku).toBe(true);
      }
    }
  });

  it('SKUs are unique across the catalog', () => {
    const skus = products.flatMap((p) => p.variants.map((v) => v.sku));
    expect(new Set(skus).size).toBe(skus.length);
  });

  it('never advertises a discount that is not one', () => {
    for (const product of products) {
      for (const variant of product.variants) {
        if (variant.compareAtPrice !== undefined) {
          expect(variant.compareAtPrice, variant.sku).toBeGreaterThan(variant.price);
        }
      }
    }
  });
});
