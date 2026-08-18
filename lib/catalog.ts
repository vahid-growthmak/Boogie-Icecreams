import 'server-only';

import { products } from '@/content/products';
import type { CartIndex } from '@/lib/cart';
import type { CatalogQuery, Product, Variant } from '@/lib/schema';

/**
 * The only module that reads content/. Everything else goes through this
 * interface, which is what makes the Phase 2 CMS swap a one-file change.
 * PRD §6.1 "CMS-swappable behind lib/catalog.ts".
 */

const PAGE_SIZE = 12;

const byOrderThenName = (a: Product, b: Product) =>
  a.order - b.order || a.name.localeCompare(b.name);

export function getAllProducts(): Product[] {
  return [...products].sort(byOrderThenName);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** 500ml is the D2C default; fall back to the first in-stock consumer variant. */
export function defaultVariant(product: Product): Variant {
  const consumer = product.variants.filter((v) => !v.tradeOnly);
  const preferred = consumer.find((v) => v.size === '500ml' && v.inStock);
  const fallback = consumer.find((v) => v.inStock) ?? consumer[0] ?? product.variants[0];
  // ProductSchema guarantees at least one variant, so fallback is defined.
  return preferred ?? (fallback as Variant);
}

/** Variants a D2C shopper may buy. 2.4L and 5L are trade-enquiry only. */
export function consumerVariants(product: Product): Variant[] {
  return product.variants.filter((v) => !v.tradeOnly);
}

export function getVariantBySku(
  sku: string,
): { product: Product; variant: Variant } | undefined {
  for (const product of products) {
    const variant = product.variants.find((v) => v.sku === sku);
    if (variant) return { product, variant };
  }
  // No fallback on purpose: an unknown SKU must 400 at checkout, never be priced.
  return undefined;
}

export function getBestSellers(limit = 8): Product[] {
  return getAllProducts()
    .filter((p) => p.bestSeller)
    .slice(0, limit);
}

/** The flavour that gets the gold petal on /products. */
export function getFeatured(): Product | undefined {
  return getAllProducts().find((p) => p.featured);
}

export function getRelated(product: Product, limit = 4): Product[] {
  const sameCategory = getAllProducts().filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  );
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const fillers = getBestSellers(limit + 4).filter(
    (p) => p.slug !== product.slug && !sameCategory.some((s) => s.slug === p.slug),
  );
  return [...sameCategory, ...fillers].slice(0, limit);
}

/**
 * Display-only SKU lookup handed to the cart drawer, which reads its lines from
 * localStorage and so cannot resolve them on the server. ~30 rows of name, size
 * and price — small enough to serialise, and it keeps `content/` out of the
 * client bundle entirely. Nothing here is trusted at checkout.
 */
export function buildCartIndex(): CartIndex {
  const index: CartIndex = {};
  for (const product of products) {
    const image = product.images[0];
    for (const variant of product.variants) {
      if (variant.tradeOnly) continue;
      index[variant.sku] = {
        sku: variant.sku,
        slug: product.slug,
        name: product.name,
        size: variant.size,
        price: variant.price,
        image: image?.src ?? '',
        imageAlt: image?.alt ?? product.name,
        category: product.category,
      };
    }
  }
  return index;
}

/** Server-side filter, sort and pagination. There is no client-side filtering. */
export function getProducts(query: CatalogQuery): {
  items: Product[];
  total: number;
  pageSize: number;
  hasMore: boolean;
} {
  const filtered = getAllProducts().filter(
    (p) => !query.category || p.category === query.category,
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (query.sort) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'price-asc':
        return defaultVariant(a).price - defaultVariant(b).price;
      case 'price-desc':
        return defaultVariant(b).price - defaultVariant(a).price;
      case 'featured':
      default:
        return Number(b.bestSeller) - Number(a.bestSeller) || byOrderThenName(a, b);
    }
  });

  // Pagination is cumulative: ?page=2 shows 24 items, so "Load more" appends
  // rather than replacing, and the URL stays shareable. PRD §5.2.
  const shown = query.page * PAGE_SIZE;

  return {
    items: sorted.slice(0, shown),
    total: sorted.length,
    pageSize: PAGE_SIZE,
    hasMore: sorted.length > shown,
  };
}
