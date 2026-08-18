import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { FOOTPRINT } from '@/lib/site';

/**
 * Sitemap §1.9 — Territory check CTA band.
 *
 * "The primary conversion, placed after belief has been built rather than before
 * it." Note: "Opens Step 1 of the progressive form."
 *
 * Decision 1 of the strategy document is why this is phrased as a question
 * Boogies answers: every competitor mapped asks the prospect to disclose his
 * investment capacity while disclosing no commercial terms of its own. This
 * reverses it — the district goes in, and Boogies answers first.
 *
 * Set as a gold band with the question at display scale rather than centred body
 * copy on a tint. It is the primary conversion on the page; it should not be the
 * quietest thing on it. The three-step strip states what happens next, because
 * the objection at this exact point is "what are you going to do with my
 * details" — and answering it costs nothing.
 */

const STEPS = [
  { n: '01', text: 'You name the district or town you would cover.' },
  { n: '02', text: 'We tell you whether it is taken, and what is already moving there.' },
  { n: '03', text: 'If it is open, you get the terms before we ask you for anything else.' },
];

export function TerritoryCta() {
  return (
    <section className="bg-gold text-ink-plum">
      <Container className="py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-ink-plum/60">Territory check</p>
            <h2 className="mt-6 text-display-l text-ink-plum">Is your territory still open?</h2>
            <p className="mt-8 max-w-md text-body-lead text-ink-plum/80">
              Boogies already supplies {FOOTPRINT.towns} towns across{' '}
              {FOOTPRINT.states.join(' and ')}. Whether yours is one of them is a question we
              answer, not one you have to guess at.
            </p>
            <ButtonLink
              href="/partners/distributor/territory"
              className="mt-10 bg-ink-plum text-paper hover:bg-mulberry"
            >
              Check if your territory is open
            </ButtonLink>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:pt-4" delayIndex={1}>
            <ol className="list-none divide-y divide-ink-plum/20 border-y border-ink-plum/20">
              {STEPS.map((step) => (
                <li key={step.n} className="flex items-baseline gap-6 py-6">
                  <span className="font-sans text-caption font-semibold tracking-[0.14em] text-ink-plum/50 tabular-nums">
                    {step.n}
                  </span>
                  <span className="text-body text-ink-plum/90">{step.text}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-caption text-ink-plum/60">
              One question to start. No investment figure asked for up front.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
