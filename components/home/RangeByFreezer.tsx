import Link from 'next/link';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { TIERS } from '@/lib/site';

/**
 * Sitemap §1.5 — "The range, by what it does for a freezer".
 *
 * "Reframes catalogue breadth as a logistics and margin argument rather than a
 * flavour list — one relationship covering value, premium, novelty and impulse."
 *
 * The note governs every line of copy here: "Translate every product fact into a
 * shelf or margin consequence." So each tier states what it does to a cabinet,
 * not what it tastes like. This replaces the old best-sellers carousel, which
 * sold flavours to a consumer who, per the strategy document, cannot buy direct.
 */
export function RangeByFreezer() {
  return (
    <section className="section-y">
      <Container>
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-cocoa-60">The range</p>
          <h2 className="mt-4 text-h2">Six formats, one delivery</h2>
          <p className="mt-6 text-body-lead text-mulberry">
            A cabinet does not need twelve suppliers. It needs an entry line that turns over, a
            premium line that carries margin, and something at the counter for the walk-in.
          </p>
        </Reveal>

        <ul className="mt-14 grid list-none grid-cols-1 gap-px bg-cocoa/10 sm:grid-cols-2 lg:grid-cols-3">
          {TIERS.map((tier, i) => (
            <Reveal as="li" key={tier.href} delayIndex={i % 3} className="bg-paper">
              <Link href={tier.href} className="group flex h-full flex-col p-8 hover:bg-sand/50">
                <h3 className="text-h3 group-hover:text-ink-plum">{tier.label}</h3>
                <p className="mt-3 flex-1 text-body text-cocoa">{tier.role}</p>
                <span className="eyebrow mt-6 text-mulberry">View tier →</span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-14 flex justify-center">
          <ButtonLink href="/products">See the full catalogue</ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
