import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { DripEdge } from '@/components/ui/DripEdge';
import { Ticker } from '@/components/ui/Ticker';
import { FOOTPRINT, PLANT } from '@/lib/site';

/**
 * Sitemap §1.2 — Hero, dual audience. PROTOTYPE STYLE.
 *
 * Restyled against the Scoopa reference: centred playful headline with a drawn
 * marker behind the key phrase, sticker chips above it, pill buttons, big
 * rounded cards and a scalloped drip edge into the next band.
 *
 * The palette is pulled from the Boogies badge rather than from the reference —
 * the shield brown carries the type, and the accent is the magenta already in
 * the "Creamy… & Delicious…" tagline. Nothing here is borrowed from another
 * company's brand.
 *
 * What did NOT change is the argument. The sitemap still requires a trade entry
 * above the fold, so the copy stays addressed to someone deciding whether to
 * take a territory; only its register got warmer. No founding date appears —
 * the strategy document flags it as unreconciled.
 *
 * TODO(assets): §1.2 requires real product photography. Still the inherited
 * generated placeholder, and it still reads "boogie", not "Boogies".
 */

const CHIPS = [
  { label: 'Manufacturer since day one', tone: 'bg-tint-1 text-brand-brown' },
  { label: `${PLANT.place}`, tone: 'bg-tint-2 text-brand-brown' },
  { label: PLANT.hours, tone: 'bg-tint-4 text-brand-brown' },
];

const TICKER = [
  'Carry homes',
  'Paper packs',
  'Bulk & party packs',
  'Novelties',
  'Boogie Woogie',
  'Trade supply',
  'No preservatives',
  'Real fruit',
];

export function HeroDual() {
  return (
    <>
      <section className="relative overflow-hidden bg-cream pt-10 pb-20 lg:pt-16 lg:pb-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <ul className="flex list-none flex-wrap justify-center gap-2.5">
              {CHIPS.map((chip) => (
                <li key={chip.label} className={`chip ${chip.tone}`}>
                  {chip.label}
                </li>
              ))}
            </ul>

            <h1 className="mt-8 font-round text-display-xl text-brand-brown">
              Made in one plant.
              <br />
              Sold in <span className="marker text-cream">{FOOTPRINT.towns} towns.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-xl text-body-lead text-brand-brown-soft">
              Every format a freezer needs — carry homes, paper packs, bulk, novelties and the
              Boogie Woogie line — from one supplier across {FOOTPRINT.states.join(' and ')}.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/partners/distributor"
                className="chip bg-brand-brown px-7 py-4 text-paper transition-transform hover:-translate-y-0.5 hover:bg-berry"
              >
                Become a distributor
              </Link>
              <Link
                href="/find-boogies"
                className="chip border border-brand-brown/25 px-7 py-4 text-brand-brown transition-transform hover:-translate-y-0.5 hover:border-brand-brown"
              >
                Find Boogies near you
              </Link>
            </div>
          </div>

          {/* Two rounded cards with the pack overlapping the seam between them,
              which is the reference's device for stopping a hero reading as two
              tidy boxes side by side. */}
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative aspect-4/3 overflow-hidden rounded-card bg-tint-2">
                <Image
                  src="/images/stock/tier-carry-homes.webp"
                  alt="Ice cream in an open tub"
                  fill
                  priority
                  sizes="(min-width:640px) 45vw, 92vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-4/3 overflow-hidden rounded-card bg-tint-1">
                <Image
                  src="/images/stock/tier-bulk-party.webp"
                  alt="Trays of different flavours in an open display freezer"
                  fill
                  sizes="(min-width:640px) 45vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* The pack sits on the seam, breaking both cards. */}
            <div className="pointer-events-none absolute inset-0 hidden items-center justify-center sm:flex">
              <div className="relative size-44 lg:size-56">
                <Image
                  src="/images/products/tub-hero.webp"
                  alt=""
                  fill
                  sizes="224px"
                  className="-rotate-6 object-contain drop-shadow-[0_18px_28px_rgba(74,34,20,0.35)]"
                />
              </div>
            </div>
          </div>
        </Container>

        {/* Melts into the ticker band below. */}
        <DripEdge className="text-brand-brown" />
      </section>

      {/* Ticker. Carries the six formats, so it earns its place rather than
          scrolling decoration. */}
      <div className="bg-brand-brown py-4 text-paper">
        <Ticker items={TICKER} />
      </div>
    </>
  );
}
