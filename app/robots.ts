import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  // Preview and staging deployments must never be indexed. VERCEL_ENV is unset
  // locally, where indexing is not a concern either way.
  const isPreview = process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== 'production';

  if (isPreview) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
