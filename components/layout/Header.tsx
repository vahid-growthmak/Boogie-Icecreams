import Link from 'next/link';

import { CartButton } from '@/components/cart/CartButton';
import { MobileNav } from '@/components/layout/MobileNav';
import { StickyHeaderShell } from '@/components/layout/StickyHeaderShell';
import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/ui/Wordmark';

/**
 * Centred wordmark, two links each side, cart right — the Berry's bar.
 * OUR STORY and TRADE are anchor scrolls to Home; CONTACT opens the contact
 * drawer. This is how the site keeps three templates without hiding content.
 */

export const NAV_LEFT = [
  { href: '/#story', label: 'Our story' },
  { href: '/products', label: 'Our products' },
] as const;

export const NAV_RIGHT = [
  { href: '/#trade', label: 'Trade' },
  { href: '/#contact', label: 'Contact' },
] as const;

const linkClass =
  'eyebrow text-cocoa transition-colors hover:text-mulberry';

export function Header() {
  return (
    <StickyHeaderShell>
      <Container as="nav" className="flex items-center justify-between gap-6 py-5">
        {/* Left links — desktop only; mobile gets the drawer nav. */}
        <ul className="hidden flex-1 items-center gap-8 lg:flex">
          {NAV_LEFT.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 lg:hidden">
          <MobileNav />
        </div>

        <Link href="/" className="shrink-0" aria-label="Boogie Ice Creams, home">
          <Wordmark className="text-[1.75rem]" />
        </Link>

        <ul className="hidden flex-1 items-center justify-end gap-8 lg:flex">
          {NAV_RIGHT.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end lg:ml-6 lg:flex-none">
          <CartButton />
        </div>
      </Container>
    </StickyHeaderShell>
  );
}
