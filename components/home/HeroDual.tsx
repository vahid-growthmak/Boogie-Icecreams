import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { FOOTPRINT, PLANT, TIERS } from '@/lib/site';

/**
 * Sitemap §1.2 — Hero, dual audience.
 *
 * "Resolves the site's central tension in one screen: a consumer-credible brand
 * statement with an explicit trade entry above the fold."
 *
 * Built asymmetrically on purpose. The previous version was a 6/6 split with the
 * product centred in an empty beige box, which is the shape every generated
 * layout defaults to — two equal columns, nothing touching, no tension. Here the
 * type column is wider than the image column, the product breaks out of its
 * colour field instead of sitting inside it, and the fact row runs the full
 * width beneath both so the fold ends on evidence rather than on whitespace.
 *
 * The figures are the ones the pack actually supplies. No founding date appears:
 * the strategy document flags it as unreconciled.
 *
 * TODO(assets): sitemap §1.2 requires real product photography. This is the
 * inherited generated placeholder and still reads "boogie", not "Boogies".
 */

const FACTS = [
  { figure: String(FOOTPRINT.towns), label: 'Towns supplied' },
  { figure: String(FOOTPRINT.states.length), label: 'States' },
  { figure: String(TIERS.length), label: 'Format tiers' },
  { figure: '1', label: 'Plant, open 24 hours' },
];

export function HeroDual() {
  return (
    <section className="relative overflow-hidden pt-8 lg:pt-12">
      <Container>
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="eyebrow text-cocoa-60">
              Manufacturer · {PLANT.place}, {PLANT.state}
            </p>

            <h1 className="mt-7 text-display-xl">
              Made in one plant.
              <br />
              Sold in{' '}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">{FOOTPRINT.towns} towns.</span>
                {/* A drawn underline rather than text-decoration: it sits behind
                    the descenders instead of slicing through them. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[0.08em] -z-0 h-[0.14em] bg-gold"
                />
              </span>
            </h1>

            <p className="mt-9 max-w-xl text-body-lead text-cocoa">
              Carry homes, paper packs, bulk, novelties and the Boogie Woogie line — every format a
              freezer needs, from one supplier across {FOOTPRINT.states.join(' and ')}.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/partners/distributor">Become a distributor</ButtonLink>
              <ButtonLink href="/find-boogies" variant="link">
                Find Boogies near you →
              </ButtonLink>
            </div>
          </div>

          {/* The product breaks out of its field rather than sitting centred in
              a box: the field is anchored bottom-right and the tub overhangs it. */}
          <div className="relative lg:col-span-5">
            <div className="relative aspect-square lg:aspect-4/5">
              <div
                aria-hidden="true"
                className="absolute inset-x-8 bottom-0 top-[18%] bg-mulberry"
              />
              <Image
                src="/images/products/tub-hero.webp"
                alt="A Boogies carry home tub"
                fill
                priority
                fetchPriority="high"
                sizes="(min-width:1024px) 40vw, 80vw"
                className="relative -rotate-6 scale-95 object-contain"
              />
            </div>
          </div>
        </div>
      </Container>

      {/* Fact row. Full-bleed hairline top and bottom so the fold closes on a
          hard edge instead of trailing off into the next band of whitespace. */}
      <div className="mt-14 border-y border-cocoa/15 lg:mt-20">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {FACTS.map((fact, i) => (
              <div
                key={fact.label}
                className={[
                  'py-7 lg:py-9',
                  i % 2 === 1 ? 'border-l border-cocoa/15 pl-6' : 'lg:border-l lg:border-cocoa/15 lg:pl-6',
                  i < 2 ? 'border-b border-cocoa/15 lg:border-b-0' : '',
                  i === 0 ? 'lg:border-l-0 lg:pl-0' : '',
                ].join(' ')}
              >
                <dd className="font-display text-numeral text-mulberry">{fact.figure}</dd>
                <dt className="eyebrow mt-3 text-cocoa-60">{fact.label}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
