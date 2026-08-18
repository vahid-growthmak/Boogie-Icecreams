import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

/**
 * The blueprint's two overlapping collage sections, sections 5 and 6.
 *
 *  "Made With Passion" — display-xl headline overlapping a sand panel, body
 *  column left, image right and offset, faint gold line-art behind at 8%.
 *  "Ice Cream Heaven"  — second image lower-left overlapping the same panel,
 *  text right.
 *
 * Everything is clipped so the offsets can never create horizontal scroll.
 */
export function PassionCollage() {
  return (
    <section className="relative overflow-hidden pb-24 lg:pb-40">
      {/* Faint gold line-art fruit, decorative only. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-[8%] right-[4%] w-64 opacity-8 lg:w-96"
        viewBox="0 0 200 200"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="1.5"
      >
        <circle cx="100" cy="110" r="62" />
        <path d="M100 48c-14-16-6-34 8-40 4 16-2 30-8 40Z" />
        <path d="M64 92c14 22 58 22 72 0M70 130c18 16 42 16 60 0" />
      </svg>

      <Container>
        <Reveal>
          <h2 className="max-w-3xl text-display-xl">
            Made with
            <br />
            passion
          </h2>
        </Reveal>

        <div className="relative mt-10 grid grid-cols-1 gap-10 lg:mt-0 lg:grid-cols-12 lg:gap-8">
          {/* Sand panel the headline overlaps into. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-[-100vw] top-0 hidden h-[70%] bg-sand lg:block"
          />

          <Reveal className="relative lg:col-span-5 lg:pt-24">
            <p className="text-body text-cocoa">
              Every batch is made by the same three people, in the same kitchen, on a churn small
              enough that a bad batch is caught before it becomes a pallet. The base is cooked and
              rested overnight before it is churned, which is slower than it needs to be and is the
              reason the texture holds.
            </p>
            <p className="mt-5 text-body text-cocoa">
              Fruit is prepped the morning it goes in. Honeycomb is broken by hand. Nothing is
              bought in ready to fold.
            </p>
          </Reveal>

          <Reveal className="relative lg:col-span-7 lg:pt-12" delayIndex={1}>
            <div className="relative aspect-7/5 lg:translate-x-8">
              <Image
                src="/images/editorial/passion.webp"
                alt="A scoop being pressed into a chilled glass beside a mixing bowl"
                fill
                sizes="(min-width:1024px) 58vw, 92vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* --- Ice Cream Heaven ------------------------------------------- */}
        <div className="relative mt-24 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="relative lg:col-span-6 lg:-mt-16">
            <div className="relative aspect-6/5 lg:-translate-x-8">
              <Image
                src="/images/editorial/heaven.webp"
                alt="Three scoops in a glass bowl with strawberries scattered around it"
                fill
                sizes="(min-width:1024px) 50vw, 92vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="relative lg:col-span-6 lg:self-center lg:bg-sand lg:p-12" delayIndex={1}>
            <h2 className="text-h2">Ice cream heaven</h2>
            <p className="mt-6 text-body text-cocoa">
              Tubs come in 100ml for one person and 500ml for a table. If you are feeding more than
              that, 2.4L and 5L go out to delis, farm shops and restaurants through the trade line
              below.
            </p>
            <p className="mt-5 text-body text-cocoa">
              A 500ml tub holds about four scoops, which in this house has never once been four
              servings.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
