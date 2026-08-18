import Link from 'next/link';

import { cn } from '@/lib/cn';

/**
 * Three variants, and there is not a fourth.
 *  primary — solid black rectangle (VIEW COLLECTION, ADD TO CART, CHECKOUT)
 *  ghost   — outlined rectangle (Continue shopping, Clear filters)
 *  link    — underlined uppercase text link (OUR PRODUCTS →)
 * Radius is 0 on all of them. PRD §4.4.
 */

type Variant = 'primary' | 'ghost' | 'link';

const base =
  'inline-flex items-center justify-center gap-2 rounded-none font-sans transition-colors ' +
  'disabled:cursor-not-allowed disabled:opacity-45';

const variants: Record<Variant, string> = {
  primary:
    'eyebrow bg-black px-8 py-4 text-white hover:bg-ink-plum',
  ghost:
    'eyebrow border border-cocoa/25 px-8 py-4 text-cocoa hover:border-mulberry hover:text-mulberry',
  link:
    'eyebrow border-b border-cocoa/40 pb-1 text-cocoa hover:border-mulberry hover:text-mulberry',
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
