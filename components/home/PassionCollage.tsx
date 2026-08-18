import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

/**
 * The blueprint's two overlapping collage sections, 5 and 6.
 *
 *  "Made With Passion" — display-xl headline overlapping a sand panel, body
 *  column left, image right and offset, faint gold line-art behind.
 *  "Ice Cream Heaven"  — second image lower-left overlapping the panel, text right.
 *
 * The panel sits at -z-10 so the headline crosses it instead of being sliced by
 * it: the overlap is the whole point of the section, and a panel painted over a
 * descender just looks broken. Everything is clipped at the section so the
 * offsets can never create horizontal scroll.
 */
export function PassionCollage() {
  return (
    <section className="relative overflow-hidden pt-4 pb-20 lg:pb-32">
      {/* Faint gold line-art fruit, decorative only. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute top-[10%] right-[6%] -z-20 w-56 opacity-10 lg:w-80"
        viewBox="0 0 200 200"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="1.5"
      >
        <circle cx="100" cy="110" r="62" />
        <path d="M100 48c-14-16-6-34 8-40 4 16-2 30-8 40Z" />
        <path d="M64 92c14 22 58 22 72 0M70 130c18 16 42 16 60 0" />
      </svg>

      <div className="relative">
        {/* Sand panel. Starts under the first line of the headline so the second
            line crosses it, and runs behind the image block. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-[-100vw] top-[5.5rem] -z-10 hidden h-[calc(100%-9rem)] bg-sand lg:block"
        />

        <Container>
          <Reveal>
            <h2 className="max-w-3xl text-display-xl">
              Made with
              <br />
              passion
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-14 lg:grid-cols-12 lg:items-start lg:gap-12">
            <Reveal className="lg:col-span-4 lg:pt-6">
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

            <Reveal className="lg:col-span-8" delayIndex={1}>
              <div className="relative aspect-7/5 lg:translate-x-12">
                <Image
                  src="/images/editorial/passion.webp"
                  alt="A scoop being pressed into a chilled glass beside a mixing bowl"
                  fill
                  sizes="(min-width:1024px) 62vw, 92vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </div>

      {/* --- Ice Cream Heaven --------------------------------------------- */}
      <Container>
        <div className="mt-16 grid grid-cols-1 gap-10 lg:mt-24 lg:grid-cols-12 lg:items-center lg:gap-0">
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-6/5 lg:-translate-x-12">
              <Image
                src="/images/editorial/heaven.webp"
                alt="Three scoops in a glass bowl with strawberries scattered around it"
                fill
                sizes="(min-width:1024px) 58vw, 92vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal
            className="lg:col-span-5 lg:-ml-16 lg:self-center lg:bg-sand lg:px-12 lg:py-14"
            delayIndex={1}
          >
            <h3 className="text-h2">Ice cream heaven</h3>
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
