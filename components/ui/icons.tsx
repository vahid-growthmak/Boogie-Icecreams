/**
 * Inline SVG. There is no icon library — a dependency for eight glyphs is not
 * how a 130KB budget is spent. All decorative, all named by their parent.
 */

type IconProps = { className?: string };

const common = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
};

export const CartIcon = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M6 7h12l-1.2 11.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8Z" />
    <path d="M9 7a3 3 0 0 1 6 0" />
  </svg>
);

export const ArrowLeft = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

export const ArrowRight = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export const Close = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Menu = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Plus = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Minus = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M5 12h14" />
  </svg>
);

export const Info = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 8h.01" />
  </svg>
);

export const Chevron = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);
