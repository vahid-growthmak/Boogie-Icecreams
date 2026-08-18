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
 */
export function BulkEvents() {
  return (
    <section className="border-y border-cocoa/10 bg-sand/40">
      <Container className="py-16 lg:py-20">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-cocoa-60">Bulk &amp; events</p>
            <h2 className="mt-4 text-h2">Ordering for a crowd?</h2>
            <p className="mt-5 text-body text-cocoa">
              Party packs and bulk tubs go out to weddings, canteens, functions and shops running an
              event. Tell us the date, the headcount and where it is going.
            </p>
          </div>
          <ButtonLink href="/partners/bulk-events" className="shrink-0">
            Enquire about bulk
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
