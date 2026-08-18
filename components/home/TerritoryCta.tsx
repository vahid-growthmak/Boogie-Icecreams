import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Sitemap §1.9 — Territory check CTA band.
 *
 * "The primary conversion, placed after belief has been built rather than before
 * it." Note: "Opens Step 1 of the progressive form."
 *
 * Decision 1 of the strategy document is the reason this is phrased as a
 * question Boogies answers: every mapped competitor asks the prospect to
 * disclose his investment capacity while disclosing no commercial terms of its
 * own. This reverses that — the district goes in, and Boogies answers first.
 */
export function TerritoryCta() {
  return (
    <section className="bg-gold/15">
      <Container className="py-20 lg:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-h2">Is your territory still open?</h2>
          <p className="mt-6 text-body-lead text-cocoa">
            Tell us the district you would cover. We will tell you whether it is taken, what is
            already moving there, and what the terms would be — before you send us anything else.
          </p>
          <ButtonLink href="/partners/distributor/territory" className="mt-10">
            Check if your territory is open
          </ButtonLink>
          <p className="mt-5 text-caption text-cocoa-60">
            One question to start. No investment figure asked for up front.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
