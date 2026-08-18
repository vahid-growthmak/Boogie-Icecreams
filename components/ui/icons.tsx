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

/* ---- Added for the sitemap homepage: proof, locator, plant and contact rail -- */

export const Star = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden focusable={false} className={className}>
    <path
      fill="currentColor"
      d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.6 9.4l6.5-.9Z"
    />
  </svg>
);

export const Pin = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Play = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M10 8.5v7l6-3.5Z" />
  </svg>
);

export const Phone = ({ className }: IconProps) => (
  <svg {...common} className={className}>
    <path d="M5 4h3.5l1.8 4.4-2.1 1.6a12 12 0 0 0 5.8 5.8l1.6-2.1L20 15.5V19a1 1 0 0 1-1.1 1A15.5 15.5 0 0 1 4 5.1 1 1 0 0 1 5 4Z" />
  </svg>
);

export const WhatsApp = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden focusable={false} className={className}>
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm5.6 14.1c-.2.7-1.3 1.3-1.9 1.3-.5 0-1.1.2-3.6-.8-3-1.3-5-4.4-5.1-4.6-.2-.2-1.3-1.7-1.3-3.3 0-1.6.8-2.3 1.1-2.7.3-.3.7-.4.9-.4h.6c.2 0 .5 0 .7.6l1 2.4c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.2-.3.4-.1.7.2.3.8 1.4 1.8 2.3 1.3 1.1 2.3 1.5 2.6 1.6.3.2.5.1.7-.1l.9-1c.2-.3.4-.2.7-.1l2.3 1.1c.3.2.5.2.6.4.1.1.1.6-.1 1.3Z"
    />
  </svg>
);
