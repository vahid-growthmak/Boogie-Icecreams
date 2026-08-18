import { Suspense } from 'react';

import { BestSellers } from '@/components/home/BestSellers';
import { CategoryTiles } from '@/components/home/CategoryTiles';
import { CheckoutNotice } from '@/components/home/CheckoutNotice';
import { Hero } from '@/components/home/Hero';
import { PassionCollage } from '@/components/home/PassionCollage';
import { StorySplit } from '@/components/home/StorySplit';
import { Testimonial } from '@/components/home/Testimonial';
import { TradeForm } from '@/components/home/TradeForm';
import { TrustBand } from '@/components/home/TrustBand';
import { getAllProducts, getBestSellers, getFeatured } from '@/lib/catalog';

/** Static with ISR. Content changes rarely and the page must be instant. */
export const revalidate = 3600;

export default function HomePage() {
  const heroProduct = getFeatured() ?? getAllProducts()[0];
  const bestSellers = getBestSellers(8);

  if (!heroProduct) return null;

  return (
    <>
      {/* Reads ?checkout= on the client so this page stays static. */}
      <Suspense fallback={null}>
        <CheckoutNotice />
      </Suspense>

      {/* Section order is the Berry's blueprint. Do not reorder without a written reason. */}
      <Hero product={heroProduct} />
      <BestSellers products={bestSellers} />
      <StorySplit />
      <PassionCollage />
      <TrustBand />
      <CategoryTiles />
      <Testimonial />
      <TradeForm />
    </>
  );
}
