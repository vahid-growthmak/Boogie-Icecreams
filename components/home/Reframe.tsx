import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { DripEdge } from '@/components/ui/DripEdge';
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
    <section className="relative overflow-hidden bg-brand-brown text-paper">
      <Container className="section-y">
        <Reveal>
          <span className="chip bg-berry text-paper">The argument</span>
          <h2 className="mt-7 max-w-4xl font-round text-display-xl text-paper">
            Boogies has never advertised.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 lg:mt-16 lg:grid-cols-2">
          <Reveal className="rounded-card bg-paper/8 p-8 lg:p-10">
            <span className="chip bg-paper/10 text-paper/60">Read one way</span>
            <p className="mt-6 font-round text-h2 text-paper/55">A problem.</p>
            <p className="mt-4 max-w-md text-body text-paper/55">
              No consumer pull behind the product, and the distributor is the one being asked to
              underwrite that risk with his own capital.
            </p>
          </Reveal>

          <Reveal className="rounded-card bg-berry/15 p-8 lg:p-10" delayIndex={1}>
            <span className="chip bg-berry text-paper">Read the way the order book reads</span>
            <p className="mt-6 font-round text-h2 text-berry">The opposite.</p>
            <p className="mt-4 max-w-md text-body text-paper/90">
              Outlets across seventeen towns have reordered for years on nothing but the product
              moving off a shelf. That demand was built without spend — which is why the territory
              in front of you has not already been taken, and why what a distributor adds here
              compounds instead of merely maintaining.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14 flex flex-col gap-4 sm:flex-row">
          <ButtonLink href="/partners/distributor" variant="accent">
            Become a distributor
          </ButtonLink>
          <ButtonLink
            href="/partners/distributor/evidence"
            variant="link-dark"
          >
            See the evidence →
          </ButtonLink>
        </Reveal>
      </Container>
      <DripEdge className="text-berry" />
    </section>
  );
}
