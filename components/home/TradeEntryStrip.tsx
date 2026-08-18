import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { DripEdge } from '@/components/ui/DripEdge';
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
    <section className="relative overflow-hidden bg-tint-1">
      <Container className="py-16 lg:py-20">
        <Reveal className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-round text-h2">Which one are you?</h2>
          <span className="chip bg-cream text-brand-brown">Five ways in. Each route is short.</span>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <Link
              href={primary.href}
              className="group flex h-full flex-col justify-between rounded-card bg-brand-brown p-8 text-paper transition-transform hover:-translate-y-1 lg:p-10"
            >
              <div>
                <span className="chip bg-berry text-paper">Most partners start here</span>
                <h3 className="mt-6 font-round text-h2 text-paper">{primary.label}</h3>
                <p className="mt-4 max-w-sm text-body text-paper/80">{primary.blurb}</p>
              </div>
              <span className="mt-10 inline-flex min-h-12 items-center font-round text-body text-berry transition-transform group-hover:translate-x-1">
                Check your territory →
              </span>
            </Link>
          </Reveal>

          <ul className="flex list-none flex-col gap-3 lg:col-span-7">
            {others.map((journey, i) => (
              <Reveal as="li" key={journey.href} delayIndex={i}>
                <Link
                  href={journey.href}
                  className="group flex items-center gap-5 rounded-card bg-cream p-5 transition-transform hover:-translate-y-0.5 lg:gap-8 lg:p-6"
                >
                  <span className="shrink-0 font-round text-h2 leading-none text-brand-brown/25 tabular-nums">0{i + 2}</span>
                  <span className="flex-1">
                    <span className={cn('block font-round text-h3 text-brand-brown')}>
                      {journey.label}
                    </span>
                    <span className="mt-1 block text-body text-brand-brown-soft">{journey.blurb}</span>
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
        </div>
      </Container>
      <DripEdge className="text-brand-brown" />
    </section>
  );
}
