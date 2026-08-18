import type { Metadata } from 'next';

import { toDecimalString } from '@/lib/format';
import type { Product, Variant } from '@/lib/schema';

export const SITE_NAME = 'Boogie Ice Creams';
export const SITE_DESCRIPTION =
  'Small-batch ice cream, sorbet and frozen desserts, churned slow and sold by the tub. Delivered in insulated packaging across India.';

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
}

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl()).toString();
}

export function buildProductMetadata(product: Product, variant: Variant): Metadata {
  const url = absoluteUrl(`/products/${product.slug}`);
  const description = `${product.strapline} ${product.description}`.slice(0, 158);

  return {
    title: product.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title: `${product.name} · ${SITE_NAME}`,
      description,
      images: [
        {
          url: absoluteUrl(`/products/${product.slug}/opengraph-image`),
          width: 1200,
          height: 630,
          alt: `${product.name} — ${product.strapline}`,
        },
      ],
    },
    twitter: { card: 'summary_large_image' },
    other: { 'product:price:amount': toDecimalString(variant.price), 'product:price:currency': 'INR' },
  };
}

/* ---------------------------------------------------------------- JSON-LD -- */

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: siteUrl(),
    description: SITE_DESCRIPTION,
    // No award, certification or founding date is asserted here. Nothing goes in
    // this object that the client has not confirmed. PRD §10.
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: siteUrl(),
  };
}

export function productJsonLd(product: Product, variant: Variant) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: variant.sku,
    category: product.category,
    image: product.images.map((i) => absoluteUrl(i.src)),
    brand: { '@type': 'Brand', name: SITE_NAME },
    offers: {
      '@type': 'Offer',
      // The only place a price is divided. schema.org wants a decimal string.
      price: toDecimalString(variant.price),
      priceCurrency: 'INR',
      availability: variant.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: absoluteUrl(`/products/${product.slug}`),
    },
    // No aggregateRating and no review: reviews are a v1 non-goal (PRD §1.4), and
    // rating markup without reviews is a manual-action risk.
  };
}

export function breadcrumbJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl() },
      { '@type': 'ListItem', position: 2, name: 'Our products', item: absoluteUrl('/products') },
      { '@type': 'ListItem', position: 3, name: product.name, item: absoluteUrl(`/products/${product.slug}`) },
    ],
  };
}
