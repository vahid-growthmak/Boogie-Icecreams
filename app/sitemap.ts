import type { MetadataRoute } from 'next';

import { getAllProducts } from '@/lib/catalog';
import { absoluteUrl } from '@/lib/seo';

/**
 * Routes only. Filter combinations are shareable but canonicalise to /products,
 * so they do not belong here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts().map((product) => ({
    url: absoluteUrl(`/products/${product.slug}`),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    { url: absoluteUrl('/'), changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/products'), changeFrequency: 'weekly', priority: 0.9 },
    ...products,
  ];
}
