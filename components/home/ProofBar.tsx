import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { DripEdge } from '@/components/ui/DripEdge';
import { Star } from '@/components/ui/icons';
import { Reveal } from '@/components/ui/Reveal';
import { PROOF } from '@/lib/site';

/**
 * Sitemap §1.4 — Proof bar.
 *
 * "Third-party verification placed before any brand claim, because the strongest
 * asset Boogies owns is evidence it did not author."
 *
 * If it is the strongest asset it cannot be a thin strip of 13px text, which is
 * what it was. The rating is set at display scale and the band is given real
 * height, because this is the one number on the page a sceptical distributor can
 * go and check for himself.
 *
 * The omission rule is enforced in code, not left to a reviewer: with
 * PROOF.rating null this component renders nothing rather than a stale figure.
 */
export function ProofBar() {
  const { rating, reviews, verifiedOn, profileUrl } = PROOF;
  if (rating === null || reviews === null) return null;

  const verified = new Date(verifiedOn).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="relative overflow-hidden bg-brand-brown text-paper">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <span className="chip bg-berry text-paper">Verified</span>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-round text-numeral text-berry">{rating}</span>
              <span className="text-body text-paper/60">out of 5</span>
            </div>
            <span aria-hidden="true" className="mt-4 flex gap-1.5 text-berry">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className="size-5" />
              ))}
            </span>
            <p className="mt-4 text-caption text-paper/70">
              {reviews} Google reviews · checked {verified}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-8 lg:border-l lg:border-paper/15 lg:pl-12" delayIndex={1}>
            <p className="font-round text-h2 text-paper">
              The highest-rated manufacturer listing in the category, on the joint-highest review
              volume.
            </p>
            <p className="mt-6 max-w-2xl text-body text-paper/75">
              Boogies did not write any of it. Several of those reviews were left by people who had
              just been walked round the plant — which is an invitation this site repeats rather
              than a claim it makes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link href="/plant" className="chip bg-cream text-brand-brown transition-transform hover:-translate-y-0.5">
                See the plant →
              </Link>
              {/* Linked only when a real profile URL exists. An unlinked verified
                  figure is honest; a wrong link is not. */}
              {profileUrl && (
                <a
                  href={profileUrl}
                  rel="noreferrer noopener"
                  target="_blank"
                  className="chip border border-paper/30 text-paper/85 transition-transform hover:-translate-y-0.5"
                >
                  Read them on Google →
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </Container>
      <DripEdge className="text-cream" />
    </section>
  );
}
