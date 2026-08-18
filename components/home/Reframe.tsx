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
 * The note is a constraint on the copy itself: "Never states 'we never
 * advertised' without the reframe attached." The two halves are therefore in one
 * block and cannot be split by a later edit without the section reading as the
 * liability the strategy document warns about.
 *
 * Note the absence of a number of years. The strategy document carries the
 * founding-date discrepancy as an explicit assumption, not a fact — the site
 * claims twelve years, the Kerala entity's GST registration dates to 2017 — and
 * it must be reconciled before any "since" claim is published.
 */
export function Reframe() {
  return (
    <section className="bg-ink-plum text-paper">
      <Container className="section-y">
        <Reveal className="mx-auto max-w-4xl">
          <p className="eyebrow text-gold">The argument</p>
          <h2 className="mt-6 text-display-l text-paper">
            Boogies has never advertised.
          </h2>
          <p className="mt-8 text-body-lead text-paper/90">
            Read one way that is a problem — no consumer pull, and a distributor is the one asked to
            underwrite the risk.
          </p>
          <p className="mt-6 text-body-lead text-paper/90">
            Read the way the order book actually reads, it is the opposite. Outlets across
            seventeen towns have been reordering for years on the strength of the product moving off
            a shelf, with nothing pushing it. That demand was built without spend, which is why the
            territory in front of you has not already been taken — and why what a distributor adds
            here compounds instead of merely maintaining.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/partners/distributor/evidence" variant="ghost" className="border-gold/50 text-gold hover:border-gold hover:text-gold">
              See the evidence
            </ButtonLink>
            <ButtonLink href="/partners/distributor" className="bg-gold text-ink-plum hover:bg-paper">
              Become a distributor
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
