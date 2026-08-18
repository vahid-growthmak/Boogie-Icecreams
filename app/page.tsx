import { Suspense } from 'react';

import { BoogieWoogieStrip } from '@/components/home/BoogieWoogieStrip';
import { BulkEvents } from '@/components/home/BulkEvents';
import { CheckoutNotice } from '@/components/home/CheckoutNotice';
import { HeroDual } from '@/components/home/HeroDual';
import { PlantInMotion } from '@/components/home/PlantInMotion';
import { ProofBar } from '@/components/home/ProofBar';
import { RangeByFreezer } from '@/components/home/RangeByFreezer';
import { Reframe } from '@/components/home/Reframe';
import { TerritoryCta } from '@/components/home/TerritoryCta';
import { TradeEntryStrip } from '@/components/home/TradeEntryStrip';
import { WhereWeSell } from '@/components/home/WhereWeSell';

/** Static with ISR. Content changes rarely and the page must be instant. */
export const revalidate = 3600;

/**
 * Section order is Sitemap page 1, rows 1.2 → 1.11, and it is not arbitrary — it
 * is the belief chain from strategy §1.3, which states that a prospect who does
 * not believe the product sells never reaches the margin question.
 *
 *   1.1  Sticky header ............ components/layout/Header.tsx
 *   1.2  Hero, dual audience
 *   1.3  Trade entry strip ........ self-sort before scrolling
 *   1.4  Proof bar ................ third-party evidence BEFORE any brand claim
 *   1.5  The range ................ breadth as a margin argument
 *   1.6  The plant, in motion ..... claim → checkable invitation
 *   1.7  Where Boogies sells ...... sell-through evidence
 *   1.8  The reframe .............. the single most important argument
 *   1.9  Territory CTA ............ conversion, after belief is built
 *   1.10 Boogie Woogie strip
 *   1.11 Bulk and events
 *   1.12 Pinned WhatsApp + call ... app/layout.tsx (sitewide)
 *   1.13 Footer ................... components/layout/Footer.tsx
 *
 * Moving 1.4 or 1.9 earlier breaks the chain deliberately built here. Do not
 * reorder without reading strategy §1.3.
 */
export default function HomePage() {
  return (
    <>
      {/* Reads ?checkout= on the client so this page stays static. */}
      <Suspense fallback={null}>
        <CheckoutNotice />
      </Suspense>

      <HeroDual />
      <TradeEntryStrip />
      <ProofBar />
      <RangeByFreezer />
      <PlantInMotion />
      <WhereWeSell />
      <Reframe />
      <TerritoryCta />
      <BoogieWoogieStrip />
      <BulkEvents />
    </>
  );
}
