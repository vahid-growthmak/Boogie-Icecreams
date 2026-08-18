import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PetalParallax } from '@/components/ui/PetalParallax';
import type { Product } from '@/lib/schema';

/**
 * 5/7 split. Text left, petal + tilted tub right. Petal use 1 of 3.
 * Nothing above the fold animates — the hero image is the LCP element and a
 * fading LCP element is a slower LCP element.
 */
export function Hero({ product }: { product: Product }) {
  const image = product.images[0];

  return (
    <section className="pt-10 pb-16 lg:pt-14 lg:pb-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6 text-cocoa-60">Ice cream · Sorbet · Dairy free</p>
            <h1 className="text-display-l">
              Small batch.
              <br />
              Big boogie.
            </h1>

            <p className="mt-8 max-w-md text-body-lead text-mulberry">
              We churn in small batches because that is the only way to keep the fruit tasting
              like fruit. Twelve flavours, made in rotation, sold by the tub.
            </p>
            <p className="mt-5 max-w-md text-body text-cocoa">
              Everything is made to order and packed in insulated boxes, so what arrives is what
              left the churn. When a flavour is out of season, we stop making it rather than
              change what goes in.
            </p>

            <ButtonLink href="/products" variant="link" className="mt-10">
              Our products →
            </ButtonLink>
          </div>

          <div className="relative lg:col-span-7">
            <div className="relative isolate mx-auto flex aspect-square max-w-2xl items-center justify-center">
              <PetalParallax className="left-[10%] w-[82%]" />
              {image && (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  priority
                  fetchPriority="high"
                  sizes="(min-width:1024px) 56vw, 92vw"
                  className="relative w-[86%] -translate-y-4 -rotate-6 object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
