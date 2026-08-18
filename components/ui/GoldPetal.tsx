import { cn } from '@/lib/cn';

/**
 * The signature element. An asymmetric organic blob in gold, one path, sitting
 * behind a product shot as its stage.
 *
 * It appears exactly THREE times site-wide (PRD §4.5):
 *   1. hero stage on /
 *   2. behind the featured flavour on /products
 *   3. behind the primary image in the PDP gallery
 * A fourth is a review blocker. It never animates on load; the parallax lives in
 * PetalParallax, desktop only, and is disabled under reduced motion.
 */
export function GoldPetal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 620"
      className={cn('pointer-events-none absolute -z-10 h-auto w-full', className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="var(--color-gold)"
        d="M298 6c94-14 190 34 245 112 56 79 62 187 22 275-40 87-126 154-222 194-96 40-202 53-268 12C9 558-14 463 9 375 32 287 101 206 172 137 243 68 204 20 298 6Z"
      />
    </svg>
  );
}
