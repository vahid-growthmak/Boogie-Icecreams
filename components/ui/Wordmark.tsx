import { cn } from '@/lib/cn';

/**
 * Set in Fraunces rather than drawn.
 * TODO(brand): PRD §11 open decision 5 — whether a wordmark asset exists or
 * needs designing. Swapping this for an SVG is a one-component change.
 */
export function Wordmark({
  className,
  tone = 'mulberry',
}: {
  className?: string;
  tone?: 'mulberry' | 'paper';
}) {
  return (
    <span
      className={cn(
        'font-display text-2xl leading-none font-normal tracking-tight italic',
        tone === 'paper' ? 'text-paper' : 'text-mulberry',
        className,
      )}
    >
      boogie
    </span>
  );
}
