import Image from 'next/image';

import { cn } from '@/lib/cn';

/**
 * The brand mark. Resolves PRD §11 open decision 5 — the wordmark is a supplied
 * asset, not type set in Fraunces.
 *
 * Two lockups, and there is not a third:
 *   badge — the shield alone. Used anywhere under ~80px, because the
 *           "Creamy… & Delicious…" tagline renders under 8px at header scale and
 *           reads as smudge rather than words.
 *   full  — shield plus tagline, for the footer, where it has the room.
 *
 * The source is raster (a 1402×1122 PNG). Its white background was flood-filled
 * from the border only — a global white key would have deleted the white
 * lettering inside the shield, the cones and the ICE CREAM ribbon, which are
 * foreground. If brand ever supplies vector, this component is the only file
 * that changes.
 *
 * alt defaults to '' because every current call site sits inside a link that
 * already carries an accessible name. Labelling both would announce the brand
 * twice on every page.
 */

const LOCKUPS = {
  badge: { src: '/images/brand/boogies-badge.webp', width: 900, height: 630 },
  full: { src: '/images/brand/boogies.webp', width: 900, height: 736 },
} as const;

export function Logo({
  lockup = 'badge',
  height = 52,
  alt = '',
  priority = false,
  className,
}: {
  lockup?: keyof typeof LOCKUPS;
  /** Rendered height in px at the largest breakpoint. Drives the srcset only —
   *  the actual box comes from the height utility passed in className. */
  height?: number;
  alt?: string;
  priority?: boolean;
  className?: string;
}) {
  const source = LOCKUPS[lockup];
  const width = Math.round((source.width / source.height) * height);

  return (
    <Image
      src={source.src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      className={cn('w-auto', className)}
    />
  );
}
