import { cn } from '@/lib/cn';

/**
 * The scalloped "drip" edge the reference uses between every band.
 *
 * Sits at the bottom of a section and is filled with the NEXT section's colour,
 * so the following band appears to melt up into this one. `currentColor` does
 * the work — set the colour with a text utility at the call site and the two
 * sections cannot drift apart.
 *
 * The path is generated rather than hand-written so the scallops stay even and
 * the count can change without redrawing anything. preserveAspectRatio="none"
 * lets it stretch to any viewport width without distorting the section.
 */
const WIDTH = 1440;
const HEIGHT = 56;

function scallops(count: number): string {
  const step = WIDTH / count;
  let d = 'M0,0';
  for (let i = 0; i < count; i += 1) {
    // Each arc bulges downward by the full height, so the fill below the line
    // reads as rounded drips rather than as a sine wave.
    d += ` Q${i * step + step / 2},${HEIGHT} ${(i + 1) * step},0`;
  }
  return `${d} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z`;
}

export function DripEdge({
  className,
  count = 12,
}: {
  /** Colour utility for the fill — use the NEXT section's background. */
  className?: string;
  count?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 w-full lg:h-9',
        className,
      )}
    >
      <path fill="currentColor" d={scallops(count)} />
    </svg>
  );
}
