import { cn } from '@/lib/cn';

/**
 * Illustration for the plant section (sitemap §1.6) while no filmed tour exists.
 *
 * Deliberately drawn rather than photographed. §1.6 requires "real footage of
 * the actual facility and staff" and §1.2 forbids stock — and this is the one
 * section a visitor can personally falsify, since its whole argument is "come
 * and look at it". A stock or generated photograph of somebody else's factory
 * presented here would be a fabricated record of a real place.
 *
 * An illustration makes no such claim: nobody reads a flat vector churn as a
 * photograph of Kannamangalam. It fills the frame, matches the rounded house
 * style, and costs nothing to delete the day the real footage arrives.
 *
 * Everything sits on one baseline — churn legs, belt supports and tub bases —
 * so the line reads as a working sequence rather than as floating clip-art.
 * Palette comes from the tokens, so it follows any future change to the brand.
 */

const FLOOR = 372;
const BELT_TOP = 330;
const TUB_H = 104;
const TUBS = [412, 530, 648];

export function PlantIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 450"
      role="img"
      aria-label="Illustration of an ice cream production line: a churn feeding tubs along a conveyor"
      className={cn('h-full w-full', className)}
    >
      <rect x="0" y="0" width="800" height="450" fill="var(--color-tint-1)" />

      {/* ---- soft ground furniture --------------------------------------- */}
      <circle cx="120" cy="88" r="36" fill="var(--color-tint-2)" opacity="0.85" />
      <circle cx="690" cy="120" r="58" fill="var(--color-tint-4)" opacity="0.85" />
      <g fill="var(--color-tint-5)">
        <circle cx="606" cy="96" r="20" />
        <circle cx="642" cy="72" r="12" />
        <circle cx="576" cy="128" r="11" />
      </g>

      {/* ---- the churn ---------------------------------------------------- */}
      <g>
        <rect x="96" y="176" width="164" height="176" rx="26" fill="var(--color-brand-brown)" />
        <rect x="96" y="258" width="164" height="26" fill="var(--color-berry)" />
        <ellipse cx="178" cy="176" rx="82" ry="24" fill="var(--color-brand-brown-soft)" />
        <ellipse cx="178" cy="174" rx="58" ry="15" fill="var(--color-cream)" opacity="0.92" />
        <rect x="170" y="104" width="16" height="72" rx="8" fill="var(--color-brand-brown-soft)" />
        <circle cx="178" cy="100" r="18" fill="var(--color-gold)" />
        <rect x="116" y="352" width="18" height={FLOOR - 352} fill="var(--color-brand-brown-soft)" />
        <rect x="222" y="352" width="18" height={FLOOR - 352} fill="var(--color-brand-brown-soft)" />
      </g>

      {/* ---- feed pipe, ending over the first tub ------------------------- */}
      <path
        d={`M260 220 C322 220 340 172 ${TUBS[0]} 172`}
        stroke="var(--color-brand-brown-soft)"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={TUBS[0]} cy="196" r="7" fill="var(--color-cream)" />

      {/* ---- conveyor ------------------------------------------------------ */}
      <rect x="330" y={BELT_TOP} width="430" height="32" rx="16" fill="var(--color-brand-brown)" />
      {[366, 438, 510, 582, 654, 726].map((cx) => (
        <circle key={cx} cx={cx} cy={BELT_TOP + 16} r="6" fill="var(--color-cream)" opacity="0.3" />
      ))}
      <rect x="352" y={BELT_TOP + 32} width="16" height={FLOOR - BELT_TOP - 32} fill="var(--color-brand-brown-soft)" />
      <rect x="722" y={BELT_TOP + 32} width="16" height={FLOOR - BELT_TOP - 32} fill="var(--color-brand-brown-soft)" />

      {/* ---- tubs, all one height, all on the belt ------------------------ */}
      {TUBS.map((x) => (
        <g key={x}>
          <rect x={x - 38} y={BELT_TOP - TUB_H} width="76" height={TUB_H} rx="12" fill="var(--color-cream)" />
          <rect x={x - 38} y={BELT_TOP - TUB_H + 38} width="76" height="26" fill="var(--color-berry)" />
          <ellipse cx={x} cy={BELT_TOP - TUB_H} rx="42" ry="12" fill="var(--color-gold)" />
        </g>
      ))}

      {/* ---- floor -------------------------------------------------------- */}
      <path
        d={`M64 ${FLOOR} H760`}
        stroke="var(--color-brand-brown)"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
