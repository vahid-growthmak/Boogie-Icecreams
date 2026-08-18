import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

/** 6/6, image left with a left bleed. Anchor target for OUR STORY. */
export function StorySplit() {
  return (
    <section id="story" className="section-y scroll-mt-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            {/* Left bleed: the image runs past the container edge on desktop. */}
            <div className="relative aspect-6/7 lg:-ml-12 xl:-ml-24">
              <Image
                src="/images/editorial/story.webp"
                alt="A bowl of ice cream with fresh fruit alongside it on a linen cloth"
                fill
                sizes="(min-width:1024px) 50vw, 92vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" delayIndex={1}>
            <h2 className="text-h2">Natural &amp; simple</h2>
            <p className="mt-6 text-body-lead text-mulberry">
              Milk, cream, sugar, fruit, eggs. That is most of the list, most of the time.
            </p>
            <p className="mt-5 text-body text-cocoa">
              There are no emulsifiers and no stabilisers in what we make, which is why our tubs
              soften faster than the ones you are used to. Give a tub ten minutes out of the
              freezer and it will scoop the way it is meant to.
            </p>
            <p className="mt-5 text-body text-cocoa">
              Fruit goes in whole or crushed, never as a syrup, and we buy it in season. That is
              also why some flavours disappear for most of the year.
            </p>
            <ButtonLink href="/products" variant="link" className="mt-10">
              Our story →
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
