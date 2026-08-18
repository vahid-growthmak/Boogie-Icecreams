import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { DripEdge } from '@/components/ui/DripEdge';
import { Reveal } from '@/components/ui/Reveal';
import { TIERS } from '@/lib/site';

/**
 * Sitemap §1.5 — "The range, by what it does for a freezer". PROTOTYPE STYLE.
 *
 * Restyled as the reference's numbered flavour list: one row per tier, each on
 * its own pastel tint, a large index number, a round thumbnail, and the whole
 * row a rounded card. It maps onto the six format tiers exactly, which is why
 * this was the right section to prototype alongside the hero — the device and
 * the content already agreed.
 *
 * The sitemap's rule survives the restyle intact: "Translate every product fact
 * into a shelf or margin consequence." Each row still states what the format
 * does to a cabinet, not what it tastes like. That is the line between borrowing
 * a layout and borrowing a strategy.
 */

const TINTS = [
  'bg-tint-1',
  'bg-tint-2',
  'bg-tint-3',
  'bg-tint-4',
  'bg-tint-5',
  'bg-tint-6',
] as const;

export function RangeByFreezer() {
  return (
    <section className="relative overflow-hidden bg-cream pt-20 pb-24 lg:pt-24 lg:pb-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="chip bg-tint-2 text-brand-brown">The range</span>
          <h2 className="mt-6 font-round text-h2 text-brand-brown">
            Pick a format. The cabinet does the rest.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-body text-brand-brown-soft">
            A freezer does not need twelve suppliers. It needs an entry line that turns over, a
            premium line that carries margin, and something at the counter for the walk-in.
          </p>
        </Reveal>

        <ul className="mx-auto mt-14 flex max-w-4xl list-none flex-col gap-3">
          {TIERS.map((tier, i) => (
            <Reveal as="li" key={tier.href} delayIndex={i % 3}>
              <Link
                href={tier.href}
                className={`group flex items-center gap-5 rounded-card ${TINTS[i]} p-5 transition-transform hover:-translate-y-0.5 lg:gap-8 lg:p-6`}
              >
                <span className="font-round text-numeral leading-none text-brand-brown/25 tabular-nums">
                  0{i + 1}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-round text-h3 text-brand-brown">{tier.label}</span>
                  <span className="mt-1 block text-body text-brand-brown-soft">{tier.role}</span>
                </span>

                <span className="relative size-16 shrink-0 overflow-hidden rounded-full lg:size-20">
                  <Image
                    src={tier.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </span>

                <span
                  aria-hidden="true"
                  className="hidden size-10 shrink-0 items-center justify-center rounded-full bg-brand-brown text-paper transition-transform group-hover:translate-x-1 sm:flex"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex justify-center">
          <Link
            href="/products"
            className="chip border border-brand-brown/25 px-7 py-4 text-brand-brown transition-transform hover:-translate-y-0.5 hover:border-brand-brown"
          >
            See the full catalogue
          </Link>
        </Reveal>
      </Container>

      {/* Melts back into the sand band of the (unrestyled) plant section. */}
      <DripEdge className="text-sand/50" />
    </section>
  );
}
