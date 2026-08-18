import Image from 'next/image';
import Link from 'next/link';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { DripEdge } from '@/components/ui/DripEdge';
import { Pin } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { FOOTPRINT, PLANT } from '@/lib/site';

/**
 * Sitemap §1.7 — "Where Boogies already sells".
 *
 * "Doubles as consumer discovery and as sell-through evidence — outlet presence
 * by town is the proof that the product moves without advertising."
 *
 * Note: "Renders live outlet counts from the CMS. Omits counts entirely if data
 * is incomplete." The strategy document establishes seventeen towns across two
 * states but does not name them, so the counts render and the place names do
 * not — and no town is invented to fill the gap.
 *
 * Redesigned because the previous version had two faults. The text column ran
 * out halfway down and left a dead half-section beside a very tall photograph;
 * and the photo used the old editorial full-bleed, which sliced the right-hand
 * corners off a rounded card once the playful restyle landed. The figures the
 * pack DOES supply are now the content that fills that column — three stat
 * cards rather than one numeral wedged against a wrapping label.
 */

export function WhereWeSell() {
  const { towns, states, districts } = FOOTPRINT;

  const stats = [
    { figure: towns, label: 'Towns supplied', note: 'Reordering without any advertising behind it' },
    { figure: states.length, label: 'States', note: states.join(' and ') },
    { figure: 1, label: 'Plant', note: `${PLANT.place} · ${PLANT.hours.toLowerCase()}` },
  ];

  return (
    <section className="relative overflow-hidden bg-tint-5 section-y">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <span className="chip bg-cream text-brand-brown">Footprint</span>
            <h2 className="mt-6 font-round text-h2">Where Boogies already sells</h2>
            <p className="mt-6 text-body-lead text-brand-brown-soft">
              For a shopper that is where to find a tub. For a distributor it is the harder thing to
              argue with: outlets that reorder in towns where nobody has ever seen an advertisement
              for this brand.
            </p>

            <ul className="mt-10 flex list-none flex-col gap-3">
              {stats.map((stat) => (
                <li
                  key={stat.label}
                  className="flex items-center gap-4 rounded-card bg-cream px-5 py-5 xs:gap-5 xs:px-6"
                >
                  <span className="shrink-0 font-round text-numeral leading-none text-berry tabular-nums">
                    {stat.figure}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-round text-h3 text-brand-brown">{stat.label}</span>
                    <span className="mt-0.5 block text-caption text-brand-brown-soft">
                      {stat.note}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <ButtonLink href="/find-boogies" className="mt-10">
              Find a Tasty Point
            </ButtonLink>
          </Reveal>

          <Reveal className="lg:col-span-7" delayIndex={1}>
            {/* Inside the container, so the rounded corners survive. A street
                rather than a shopfront: a photograph of an identifiable business
                under this heading would imply that business stocks Boogies. */}
            <div className="relative aspect-4/3 overflow-hidden rounded-card lg:aspect-square">
              <Image
                src="/images/stock/where-we-sell.webp"
                alt="A street of small shops in Kochi, Kerala"
                fill
                sizes="(min-width:1024px) 58vw, 92vw"
                className="object-cover"
              />
            </div>

            {districts.length > 0 ? (
              <ul className="mt-4 grid list-none grid-cols-2 gap-3 sm:grid-cols-3">
                {districts.map((district) => (
                  <li key={district.slug}>
                    <Link
                      href={`/find-boogies/${district.slug}`}
                      className="flex h-full flex-col gap-0.5 rounded-[1.25rem] bg-cream px-5 py-4 transition-transform hover:-translate-y-0.5"
                    >
                      <span className="font-round text-body text-brand-brown">{district.name}</span>
                      {/* Count omitted entirely when the CMS has not supplied it. */}
                      {district.outlets !== null && (
                        <span className="text-caption text-brand-brown-soft">
                          {district.outlets} outlets
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 flex items-start gap-2.5 rounded-[1.25rem] bg-cream px-5 py-4 text-caption text-brand-brown-soft">
                <Pin className="mt-0.5 size-4 shrink-0" />
                <span>
                  District pages and outlet counts appear here once the locator data is in the CMS.
                  Counts are omitted rather than estimated.
                </span>
              </p>
            )}
          </Reveal>
        </div>
      </Container>
      <DripEdge className="text-brand-brown" />
    </section>
  );
}
