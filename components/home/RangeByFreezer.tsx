import Image from 'next/image';
import Link from 'next/link';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { TIERS } from '@/lib/site';

/**
 * Sitemap §1.5 — "The range, by what it does for a freezer".
 *
 * "Reframes catalogue breadth as a logistics and margin argument rather than a
 * flavour list." Note: "Translate every product fact into a shelf or margin
 * consequence."
 *
 * Deliberately not six identical cards. A uniform 3×2 grid says every tier
 * matters equally, which is false — the first two are where a cabinet is won and
 * where the price ladder lives — and it is the single most template-looking
 * shape on a page. So the first two run large and the remaining four run tight
 * beneath them, each numbered. The asymmetry is the hierarchy.
 */
export function RangeByFreezer() {
  const [lead, second, ...rest] = TIERS;

  return (
    <section className="section-y">
      <Container>
        <Reveal className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p className="eyebrow text-cocoa-60">The range</p>
            <h2 className="mt-5 text-h2">Six formats, one delivery</h2>
          </div>
          <p className="max-w-lg text-body text-cocoa lg:col-span-5">
            A cabinet does not need twelve suppliers. It needs an entry line that turns over, a
            premium line that carries margin, and something at the counter for the walk-in.
          </p>
        </Reveal>

        {/* The two that carry the argument. */}
        <div className="mt-14 grid grid-cols-1 gap-px bg-cocoa/10 md:grid-cols-2">
          {[lead, second].map((tier, i) => (
            <Reveal key={tier.href} delayIndex={i} className="bg-paper">
              <Link href={tier.href} className="group flex h-full flex-col">
                <div className="relative aspect-3/2 overflow-hidden">
                  <Image
                    src={tier.image}
                    alt={tier.imageAlt}
                    fill
                    sizes="(min-width:768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 items-start gap-5 p-8">
                  <span className="index-num pt-2">0{i + 1}</span>
                  <div>
                    <h3 className="text-h2 group-hover:text-ink-plum">{tier.label}</h3>
                    <p className="mt-3 max-w-sm text-body text-cocoa">{tier.role}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* The remaining four, tight. Image is a thumbnail, not a hero. */}
        <div className="mt-px grid grid-cols-1 gap-px bg-cocoa/10 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((tier, i) => (
            <Reveal key={tier.href} delayIndex={i} className="bg-paper">
              <Link href={tier.href} className="group flex h-full flex-col p-6">
                <div className="flex items-center gap-4">
                  <div className="relative size-16 shrink-0 overflow-hidden">
                    <Image
                      src={tier.image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <span className="index-num">0{i + 3}</span>
                </div>
                <h3 className="mt-5 text-h3 group-hover:text-ink-plum">{tier.label}</h3>
                <p className="mt-2 flex-1 text-caption text-cocoa-60">{tier.role}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-start">
          <ButtonLink href="/products" variant="ghost">
            See the full catalogue
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
