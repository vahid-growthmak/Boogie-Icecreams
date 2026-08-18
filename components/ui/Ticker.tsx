import { cn } from '@/lib/cn';

/**
 * The repeating marquee strip from the reference.
 *
 * CSS-only: the track holds two identical copies of the list and translates by
 * exactly -50%, so the loop is seamless without JavaScript measuring anything.
 * The duplicate is aria-hidden, so the strip is announced once rather than
 * twice.
 *
 * Honours prefers-reduced-motion — the global rule in globals.css collapses the
 * animation, and the strip then simply sits still with the first copy visible.
 * A permanently scrolling band is a vestibular problem, not a flourish.
 */
export function Ticker({
  items,
  className,
  durationSeconds = 38,
}: {
  items: string[];
  className?: string;
  durationSeconds?: number;
}) {
  const copy = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 list-none items-center gap-10 pr-10 lg:gap-14 lg:pr-14"
    >
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex shrink-0 items-center gap-10 lg:gap-14">
          <span className="font-round text-body whitespace-nowrap">{item}</span>
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current/40" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn('flex overflow-hidden', className)}>
      <div
        className="flex animate-[ticker_var(--ticker-duration)_linear_infinite] motion-reduce:animate-none"
        style={{ '--ticker-duration': `${durationSeconds}s` } as React.CSSProperties}
      >
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  );
}
