import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

/**
 * From Novella: full-bleed ink-plum, copy left, a 2×2 cluster of gold seals right.
 *
 * The seals carry real line-art, not empty rings — an outlined circle with
 * nothing in it reads as an asset that never arrived. Each mark is drawn from
 * the claim beside it, and deliberately stays a plain outline: the moment one
 * looks like an official certification stamp it becomes a claim we cannot back.
 */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const SEALS = [
  {
    label: 'No preservatives',
    icon: (
      <>
        <path d="M20 12h8l-1 5a6 6 0 0 1 3 5v13a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V22a6 6 0 0 1 3-5Z" {...stroke} />
        <path d="M13 37 35 11" {...stroke} />
      </>
    ),
  },
  {
    label: 'Real fruit',
    icon: (
      <>
        <path d="M24 17c6-4 13-1 13 6 0 8-7 15-13 15S11 31 11 23c0-7 7-10 13-6Z" {...stroke} />
        <path d="M24 17c-1-5 1-8 5-9 0 4-1 7-5 9Z" {...stroke} />
        <path d="M19 26h.01M28 25h.01M23 32h.01M27 31h.01M20 21h.01" {...stroke} strokeWidth={2.5} />
      </>
    ),
  },
  {
    label: 'Fresh cow milk',
    icon: (
      <>
        <path d="M19 10h10v5l4 7v16a2 2 0 0 1-2 2H17a2 2 0 0 1-2-2V22l4-7Z" {...stroke} />
        <path d="M15 24h18" {...stroke} />
      </>
    ),
  },
  {
    label: 'Small batches',
    icon: (
      <>
        <circle cx="24" cy="24" r="11" {...stroke} />
        <path d="M24 13v22M13.5 18.5l21 11M13.5 29.5l21-11" {...stroke} />
      </>
    ),
  },
];

export function TrustBand() {
  return (
    <section className="bg-ink-plum text-paper">
      <Container className="py-20 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
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

          <ul className="grid list-none grid-cols-2 gap-x-6 gap-y-10 lg:col-span-7 lg:grid-cols-4 lg:gap-x-4">
            {SEALS.map((seal, i) => (
              <Reveal as="li" key={seal.label} delayIndex={i}>
                <div className="flex flex-col items-center gap-4 text-center">
                  <span className="flex size-24 items-center justify-center rounded-full border border-gold/70 text-gold">
                    <svg viewBox="0 0 48 48" className="size-11" aria-hidden="true" focusable="false">
                      {seal.icon}
                    </svg>
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
