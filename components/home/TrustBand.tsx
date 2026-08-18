import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

/**
 * From Novella: full-bleed ink-plum, copy left, a 2×2 cluster of gold circular
 * seals right. Only claims that follow from how the product is made are here —
 * no certification, no award, nothing the client has not confirmed.
 */

const SEALS = [
  { label: 'No preservatives' },
  { label: 'Real fruit' },
  { label: 'Fresh cow milk' },
  { label: 'Small batches' },
];

export function TrustBand() {
  return (
    <section className="bg-ink-plum text-paper">
      <Container className="section-y">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <h2 className="text-h2 text-paper">Why Boogie</h2>
            <p className="mt-6 text-body-lead text-paper/90">
              A short ingredient list is not a marketing position. It is what happens when you make
              small amounts of something and sell it quickly.
            </p>
            <p className="mt-5 text-body text-paper/75">
              Because there are no preservatives in it, our ice cream has a shorter life than most
              and travels in insulated packaging. That is the trade we made, and we would make it
              again.
            </p>
          </Reveal>

          <ul className="grid list-none grid-cols-2 gap-8 lg:col-span-6 lg:gap-10">
            {SEALS.map((seal, i) => (
              <Reveal as="li" key={seal.label} delayIndex={i}>
                <div className="flex flex-col items-center gap-4 text-center">
                  <span
                    aria-hidden="true"
                    className="flex size-28 items-center justify-center rounded-full border-2 border-gold lg:size-32"
                  >
                    <span className="size-20 rounded-full border border-gold/45 lg:size-24" />
                  </span>
                  <span className="eyebrow text-gold">{seal.label}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
