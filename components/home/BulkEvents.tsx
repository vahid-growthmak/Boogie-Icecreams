import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Sitemap §1.11 — Bulk and events.
 *
 * "Captures a real demand stream the current site promises in copy but routes
 * nowhere." Note: "Homepage today claims doorstep delivery of large orders with
 * no capture route."
 *
 * The whole point of the section is that the promise finally has a destination,
 * so it is a route and not a paragraph.
 *
 * The photograph is interim stock — see public/images/stock/SOURCES.json. It
 * shows an event table rather than Boogies product, which is the only reason it
 * is acceptable here at all under the sitemap's no-stock rule.
 */
export function BulkEvents() {
  return (
    <section className="relative overflow-hidden bg-tint-1">
      <Container className="py-16 lg:py-20">
        <Reveal className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="relative aspect-3/2 overflow-hidden rounded-card">
              <Image
                src="/images/stock/bulk-events.webp"
                alt="A dessert spread laid out on a table at an outdoor gathering"
                fill
                sizes="(min-width:1024px) 40vw, 92vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="chip bg-cream text-brand-brown">Bulk &amp; events</span>
            <h2 className="mt-6 font-round text-h2">Ordering for a crowd?</h2>
            <p className="mt-5 text-body text-brand-brown-soft">
              Party packs and bulk tubs go out to weddings, canteens, functions and shops running an
              event. Tell us the date, the headcount and where it is going.
            </p>
            <ButtonLink href="/partners/bulk-events" className="mt-8">
              Enquire about bulk
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
