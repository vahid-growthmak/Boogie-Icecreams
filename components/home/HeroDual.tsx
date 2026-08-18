import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { FOOTPRINT, PLANT } from '@/lib/site';

/**
 * Sitemap §1.2 — Hero, dual audience.
 *
 * "Resolves the site's central tension in one screen: a consumer-credible brand
 * statement with an explicit trade entry above the fold. The current site loses
 * the highest-value visitor in seconds because it reads as a retail ice cream
 * brand."
 *
 * So: one headline that a consumer and a distributor both believe, and two
 * doors, the trade door first. No "since" claim appears anywhere here — the
 * strategy document flags the founding date as unreconciled (the site claims
 * twelve years, the Kerala entity's GST registration dates to 2017) and a
 * distributor doing due diligence will check it.
 *
 * TODO(assets): the sitemap requires "real photography of the plant and product
 * only — no stock, no AI-generated imagery." The image below is a generated
 * placeholder inherited from the previous build and does not satisfy that.
 */
export function HeroDual() {
  return (
    <section className="pt-10 pb-16 lg:pt-16 lg:pb-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="eyebrow text-cocoa-60">
              Manufacturer · {PLANT.place}, {PLANT.state}
            </p>

            <h1 className="mt-6 text-display-l">
              Made in one plant.
              <br />
              Sold in {FOOTPRINT.towns} towns.
            </h1>

            <p className="mt-8 max-w-lg text-body-lead text-mulberry">
              Boogies manufactures carry homes, paper packs, bulk and party packs, novelties and the
              Boogie Woogie line from a single plant in {PLANT.place}, and supplies them across{' '}
              {FOOTPRINT.states.join(' and ')}.
            </p>

            <p className="mt-5 max-w-lg text-body text-cocoa">
              One relationship fills a cabinet from the entry price point to the top band. If you
              distribute frozen goods, the question worth asking first is whether your district is
              still open.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/partners/distributor">Become a distributor</ButtonLink>
              <ButtonLink href="/find-boogies" variant="ghost">
                Find Boogies near you
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 bg-sand/60">
              <Image
                src="/images/products/tub-hero.webp"
                alt="A Boogies carry home tub"
                fill
                priority
                fetchPriority="high"
                sizes="(min-width:1024px) 50vw, 92vw"
                className="object-contain p-10"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
