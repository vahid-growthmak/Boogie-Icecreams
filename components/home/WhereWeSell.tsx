import Link from 'next/link';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Pin } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { FOOTPRINT } from '@/lib/site';

/**
 * Sitemap §1.7 — "Where Boogies already sells".
 *
 * "Doubles as consumer discovery and as sell-through evidence — outlet presence
 * by town is the proof that the product moves without advertising."
 *
 * Note: "Renders live outlet counts from the CMS. Omits counts entirely if data
 * is incomplete." The strategy document establishes seventeen towns across two
 * states but does not name them — the current estate publishes them as
 * unstructured text with no addresses. So the town count renders, the town names
 * and per-district counts do not, and the locator link carries the visitor to
 * the page that will hold them.
 */
export function WhereWeSell() {
  const { towns, states, districts } = FOOTPRINT;

  return (
    <section className="section-y">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-cocoa-60">Footprint</p>
            <h2 className="mt-4 text-h2">Where Boogies already sells</h2>
            <p className="mt-6 text-body-lead text-mulberry">
              {towns} towns across {states.join(' and ')}, supplied from one plant.
            </p>
            <p className="mt-5 text-body text-cocoa">
              For a shopper that is where to find a tub. For a distributor it is something harder to
              argue with: outlets that reorder in towns where nobody has ever seen an advertisement
              for this brand.
            </p>
            <ButtonLink href="/find-boogies" className="mt-10">
              Find a Tasty Point
            </ButtonLink>
          </Reveal>

          <Reveal className="lg:col-span-7" delayIndex={1}>
            {districts.length > 0 ? (
              <ul className="grid list-none grid-cols-2 gap-px bg-cocoa/10 sm:grid-cols-3">
                {districts.map((district) => (
                  <li key={district.slug} className="bg-paper">
                    <Link
                      href={`/find-boogies/${district.slug}`}
                      className="flex h-full flex-col gap-1 p-5 hover:bg-sand/50"
                    >
                      <span className="text-body text-cocoa">{district.name}</span>
                      {/* Count omitted entirely when the CMS has not supplied it. */}
                      {district.outlets !== null && (
                        <span className="text-caption text-cocoa-60">
                          {district.outlets} outlets
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex h-full min-h-64 flex-col items-center justify-center gap-4 border border-dashed border-cocoa/25 p-10 text-center">
                <Pin className="size-8 text-cocoa-60" />
                <p className="max-w-sm text-caption text-cocoa-60">
                  District pages and outlet counts render here once the locator data is in the CMS.
                  Counts are omitted rather than estimated.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
