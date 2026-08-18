import Image from 'next/image';
import Link from 'next/link';

import { ButtonLink } from '@/components/ui/Button';
import { DripEdge } from '@/components/ui/DripEdge';
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
    /* Not wrapped in Container: the photograph runs off the right edge of the
       viewport the way the Berry's editorial image bleeds off the left. The text
       column is width-matched to half the container and pushed right, so its
       left edge still lands on the site gutter. */
    <section className="relative overflow-hidden bg-tint-5 section-y">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="w-full px-6 lg:justify-self-end lg:max-w-[calc(var(--container-site)/2)] lg:px-0 lg:pl-12">
          <Reveal>
            <span className="chip bg-cream text-brand-brown">Footprint</span>
            <h2 className="mt-6 font-round text-h2">Where Boogies already sells</h2>
            <p className="mt-6 flex items-baseline gap-4">
              <span className="font-round text-numeral text-berry">{towns}</span>
              <span className="max-w-xs text-body text-brand-brown-soft">
                towns across {states.join(' and ')}, supplied from one plant
              </span>
            </p>
            <p className="mt-5 text-body text-brand-brown-soft">
              For a shopper that is where to find a tub. For a distributor it is something harder to
              argue with: outlets that reorder in towns where nobody has ever seen an advertisement
              for this brand.
            </p>
            <ButtonLink href="/find-boogies" className="mt-10">
              Find a Tasty Point
            </ButtonLink>
          </Reveal>
        </div>

        <div className="px-6 lg:px-0">
          <Reveal delayIndex={1}>
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
              /* Interim stock, and deliberately a street rather than a shopfront:
                 a photograph of an identifiable third-party shop under this
                 heading would imply that business stocks Boogies. */
              <div>
                <div className="relative aspect-4/3 overflow-hidden rounded-card">
                  <Image
                    src="/images/stock/where-we-sell.webp"
                    alt="A street of small shops in Kochi, Kerala"
                    fill
                    sizes="(min-width:1024px) 58vw, 92vw"
                    className="object-cover"
                  />
                </div>
                <p className="mt-4 flex items-start gap-2 rounded-[1.25rem] bg-cream px-4 py-3 text-caption text-brand-brown-soft">
                  <Pin className="mt-0.5 size-4 shrink-0" />
                  <span>
                    District pages and outlet counts appear here once the locator data is in the
                    CMS. Counts are omitted rather than estimated.
                  </span>
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </div>
      <DripEdge className="text-brand-brown" />
    </section>
  );
}
