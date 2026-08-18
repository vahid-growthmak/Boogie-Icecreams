import { BestSellersCarousel } from '@/components/home/BestSellersCarousel';
import { ProductCard } from '@/components/product/ProductCard';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Info } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { formatEnergy } from '@/lib/format';
import type { Product } from '@/lib/schema';

/**
 * Centred heading, arrows top-right, 4-up → 2-up md → 1.4-up scroll-snap mobile.
 * The scroll container is client code; the cards inside it are server-rendered.
 */
export function BestSellers({ products }: { products: Product[] }) {
  return (
    <section className="section-y bg-sand/50">
      <Container>
        <BestSellersCarousel heading="Best sellers">
          {products.map((product) => (
            <li
              key={product.slug}
              // 4-up on lg with the 1.5rem gaps accounted for; 1.4-up on mobile.
              className="w-[70vw] shrink-0 snap-start sm:w-[42vw] lg:w-[calc((100%-4.5rem)/4)]"
            >
              <ProductCard
                product={product}
                sizes="(min-width:1024px) 23vw, (min-width:640px) 42vw, 70vw"
              />
              <details className="mt-4 text-center">
                <summary className="eyebrow inline-flex cursor-pointer items-center gap-2 text-cocoa-60 hover:text-mulberry">
                  <Info className="size-4" />
                  Nutritional information
                </summary>
                <p className="mt-3 text-caption text-cocoa-60">
                  {formatEnergy(
                    product.nutritionPer100g.energyKj,
                    product.nutritionPer100g.energyKcal,
                  )}{' '}
                  per 100g. {product.allergens.length > 0
                    ? `Contains ${product.allergens.join(', ').toLowerCase()}.`
                    : 'No declared allergens.'}
                </p>
              </details>
            </li>
          ))}
        </BestSellersCarousel>

        <Reveal className="mt-16 flex justify-center">
          <ButtonLink href="/products">View collection</ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
