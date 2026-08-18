import Image from 'next/image';

import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Sitemap §1.10 — Boogie Woogie strip.
 *
 * "Introduces the exclusive line as a consumer range here and as margin
 * protection on partner surfaces — same asset, two framings." Note: "Exclusivity
 * flag: available only through Boogies outlets and franchises."
 *
 * Both framings appear because the homepage serves both audiences: the range for
 * the shopper, the exclusivity for the operator who cannot be undercut on it.
 *
 * TODO(assets): needs real Boogie Woogie packshots. The image below is the
 * generic tub placeholder.
 */
export function BoogieWoogieStrip() {
  return (
    <section className="section-y">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-4/3 bg-sand/60">
              <Image
                src="/images/products/tub-scoop.webp"
                alt="The Boogie Woogie natural pops and scoops line"
                fill
                sizes="(min-width:1024px) 50vw, 92vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" delayIndex={1}>
            <p className="eyebrow text-cocoa-60">Boogie Woogie</p>
            <h2 className="mt-4 text-h2">Natural pops &amp; scoops</h2>
            <p className="mt-6 text-body-lead text-mulberry">
              The natural line, sold only through Boogies outlets and franchises.
            </p>
            <p className="mt-5 text-body text-cocoa">
              For a shopper it is the range worth walking to a Tasty Point for. For an operator it is
              the part of the cabinet nobody down the road can put a price against, because nobody
              down the road is allowed to stock it.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/boogie-woogie" variant="ghost">
                See the range
              </ButtonLink>
              <ButtonLink href="/partners/franchise" variant="link">
                Open a franchise →
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
