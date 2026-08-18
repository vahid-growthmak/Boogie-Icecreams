import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { Star } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { PROOF } from '@/lib/site';

/**
 * Sitemap §1.4 — Proof bar.
 *
 * "Third-party verification placed before any brand claim, because the strongest
 * asset Boogies owns is evidence it did not author."
 *
 * The note is a hard rule: "Real verified figures only... If the figure is not
 * current at build, the block is OMITTED rather than estimated." That is
 * enforced here rather than left to a reviewer — with PROOF.rating null this
 * component renders nothing at all.
 */
export function ProofBar() {
  const { rating, reviews, verifiedOn, profileUrl } = PROOF;
  if (rating === null || reviews === null) return null;

  const verified = new Date(verifiedOn).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  const figure = (
    <span className="flex items-baseline gap-2">
      <span className="font-display text-display-l leading-none text-gold">{rating}</span>
      <span className="text-body text-paper/70">/ 5</span>
    </span>
  );

  return (
    <section className="bg-ink-plum text-paper">
      <Container className="py-14 lg:py-16">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            {profileUrl ? (
              <Link href={profileUrl} rel="noreferrer noopener" target="_blank">
                {figure}
              </Link>
            ) : (
              figure
            )}
            <div>
              <span aria-hidden="true" className="flex gap-1 text-gold">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4" />
                ))}
              </span>
              <p className="mt-2 text-caption text-paper/75">
                {reviews} Google reviews · verified {verified}
              </p>
            </div>
          </div>

          <p className="max-w-xl text-body-lead text-paper/90">
            The highest-rated manufacturer listing in the category, on the joint-highest review
            volume. Several of those reviews describe a tour of the plant.
          </p>

          <Link href="/plant" className="eyebrow shrink-0 border-b border-gold/50 pb-1 text-gold">
            See the plant →
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
