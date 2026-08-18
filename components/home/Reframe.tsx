import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Sitemap §1.8 — "The reframe". Flagged in the CSV as "the single most important
 * argument on the site."
 *
 * "Turns the company's proudest fact — over a decade of growth with no
 * advertising — from a warning sign into the reason the territory is still
 * available."
 *
 * The note is a constraint on the copy: "Never states 'we never advertised'
 * without the reframe attached." Previously both halves sat in one centred
 * column of paragraphs, which buried the turn. Here the argument is built as the
 * turn it is — the claim at display scale, then the two readings set against
 * each other in opposing columns, the wrong one greyed back and the right one
 * carried in gold. The structure does the persuading, not an adverb.
 *
 * No number of years appears. The strategy document carries the founding-date
 * discrepancy as an explicit assumption — the site claims twelve years, the
 * Kerala entity's GST registration dates to 2017 — and it must be reconciled
 * before any "since" claim is published.
 */
export function Reframe() {
  return (
    <section className="bg-ink-plum text-paper">
      <Container className="section-y">
        <Reveal>
          <p className="index-num">The argument</p>
          <h2 className="mt-6 max-w-4xl text-display-xl text-paper">
            Boogies has never advertised.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-px bg-paper/15 lg:mt-20 lg:grid-cols-2">
          <Reveal className="bg-ink-plum lg:pr-12">
            <p className="eyebrow text-paper/45">Read one way</p>
            <p className="mt-5 text-h2 text-paper/45">A problem.</p>
            <p className="mt-5 max-w-md text-body text-paper/45">
              No consumer pull behind the product, and the distributor is the one being asked to
              underwrite that risk with his own capital.
            </p>
          </Reveal>

          <Reveal className="bg-ink-plum lg:pl-12" delayIndex={1}>
            <p className="eyebrow text-gold">Read the way the order book reads</p>
            <p className="mt-5 text-h2 text-gold">The opposite.</p>
            <p className="mt-5 max-w-md text-body text-paper/90">
              Outlets across seventeen towns have reordered for years on nothing but the product
              moving off a shelf. That demand was built without spend — which is why the territory
              in front of you has not already been taken, and why what a distributor adds here
              compounds instead of merely maintaining.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/partners/distributor" className="bg-gold text-ink-plum hover:bg-paper">
            Become a distributor
          </ButtonLink>
          <ButtonLink
            href="/partners/distributor/evidence"
            variant="link"
            className="border-gold/40 text-gold hover:border-gold"
          >
            See the evidence →
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
