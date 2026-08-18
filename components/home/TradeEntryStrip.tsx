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
 * Five equal boxes made the distributor route — the one the whole architecture
 * exists for — look like one option of five. It is now given the full first
 * column at heading scale while the other four stack beside it as a numbered
 * list. Everyone still self-sorts; the weighting just tells the truth about
 * which journey the business wants.
 */
export function TradeEntryStrip() {
  const [primary, ...others] = PARTNER_JOURNEYS;

  return (
    <section className="bg-sand/50">
      <Container className="py-16 lg:py-20">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-h2">Which one are you?</h2>
          <p className="text-caption text-cocoa-60">Five ways in. Each route is short.</p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <Link
              href={primary.href}
              className="group flex h-full flex-col justify-between bg-mulberry p-8 text-paper transition-colors hover:bg-ink-plum lg:p-10"
            >
              <div>
                <p className="index-num">Most partners start here</p>
                <h3 className="mt-6 text-h2 text-paper">{primary.label}</h3>
                <p className="mt-4 max-w-sm text-body text-paper/80">{primary.blurb}</p>
              </div>
              <span className="eyebrow mt-10 inline-block text-gold transition-transform group-hover:translate-x-1">
                Check your territory →
              </span>
            </Link>
          </Reveal>

          <ul className="list-none divide-y divide-cocoa/15 border-t border-cocoa/15 lg:col-span-7">
            {others.map((journey, i) => (
              <Reveal as="li" key={journey.href} delayIndex={i}>
                <Link
                  href={journey.href}
                  className="group flex items-baseline gap-5 py-6 transition-colors hover:text-mulberry lg:gap-8"
                >
                  <span className="index-num shrink-0">0{i + 2}</span>
                  <span className="flex-1">
                    <span className={cn('block font-display text-h3 text-mulberry')}>
                      {journey.label}
                    </span>
                    <span className="mt-1 block text-caption text-cocoa-60">{journey.blurb}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="eyebrow shrink-0 text-cocoa-60 transition-transform group-hover:translate-x-1 group-hover:text-mulberry"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
