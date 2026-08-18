import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import { PARTNER_JOURNEYS } from '@/lib/site';

/**
 * Sitemap §1.3 — Trade entry strip.
 *
 * "Names the five partner journeys immediately so a distributor, retailer, van
 * operator, franchisee or bulk buyer self-sorts before scrolling."
 *
 * The five-way router mirrors the enquiry form's interest field, so a visitor
 * who sorts himself here arrives at the form already answering its first
 * question. Distributor is first and carries the visual weight.
 */
export function TradeEntryStrip() {
  return (
    <section className="border-y border-cocoa/10 bg-sand/40">
      <Container className="py-14 lg:py-16">
        <Reveal>
          <h2 className="text-h2">Which one are you?</h2>
          <p className="mt-4 max-w-2xl text-body text-cocoa">
            Five ways to work with Boogies. Pick the one that fits and the route is short.
          </p>
        </Reveal>

        <ul className="mt-10 grid list-none grid-cols-1 gap-px bg-cocoa/10 sm:grid-cols-2 lg:grid-cols-5">
          {PARTNER_JOURNEYS.map((journey, i) => (
            <Reveal as="li" key={journey.href} delayIndex={i} className="bg-paper">
              <Link
                href={journey.href}
                className={cn(
                  'group flex h-full flex-col p-6 transition-colors hover:bg-sand/60',
                  journey.weighted && 'bg-sand/50',
                )}
              >
                <span
                  className={cn(
                    'font-display',
                    journey.weighted ? 'text-h3 text-mulberry' : 'text-body text-cocoa',
                  )}
                >
                  {journey.label}
                </span>
                <span className="mt-2 flex-1 text-caption text-cocoa-60">{journey.blurb}</span>
                <span className="eyebrow mt-6 text-mulberry transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
