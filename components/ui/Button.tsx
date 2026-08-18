import Link from 'next/link';

import { cn } from '@/lib/cn';

/**
 * Three variants, and there is not a fourth.
 *  primary — solid brown pill
 *  ghost   — outlined pill
 *  link    — underlined text link
 *
 * Radius moved from 0 to a full pill with the playful restyle. The PRD's flat
 * rectangle belonged to the Berry's blueprint; the Boogies badge is all soft
 * curves, and a square button beside a rounded logo reads as two brands.
 * Changing it here rather than per-call-site keeps every button on every page
 * consistent, including the pages not individually restyled.
 *
 * The three dark-ground variants exist because cn() is a plain joiner by
 * design — see lib/cn.ts, "conflicting classes are a component bug, not
 * something to merge away". Passing `bg-berry` over the primary variant's
 * `bg-brand-brown` left BOTH in the DOM and let CSS source order decide, which
 * is exactly how the territory CTA ended up cream-on-cream and unreadable. A
 * colour a call site needs is a variant, never an override.
 */

type Variant = 'primary' | 'ghost' | 'link' | 'accent' | 'contrast' | 'link-dark';

const base =
  'inline-flex items-center justify-center gap-2 rounded-chip font-round text-caption leading-none ' +
  'transition-[color,background-color,border-color,transform] hover:-translate-y-0.5 ' +
  'disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-brown px-7 py-4 text-paper hover:bg-berry',
  ghost:
    'border border-brand-brown/25 px-7 py-4 text-brand-brown hover:border-brand-brown',
  link:
    'rounded-none border-b border-brand-brown/35 px-0 pb-1 text-brand-brown hover:border-brand-brown hover:translate-y-0',
  /* On a brown ground. */
  accent: 'bg-berry px-7 py-4 text-paper hover:bg-cream hover:text-brand-brown',
  /* On a berry or brown ground — inverts to the cream pill. */
  contrast: 'bg-cream px-7 py-4 text-brand-brown hover:bg-brand-brown hover:text-paper',
  'link-dark':
    'rounded-none border-b border-berry/50 px-0 pb-1 text-berry hover:border-berry hover:translate-y-0',
};

type ButtonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<typeof Link>, 'href' | 'className'>;

export function ButtonLink({
  href,
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}
