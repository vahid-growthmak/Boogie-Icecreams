import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { Wordmark } from '@/components/ui/Wordmark';

const NAV = [
  { href: '/#story', label: 'Our story' },
  { href: '/products', label: 'Our products' },
  { href: '/#trade', label: 'Trade' },
  { href: '/#contact', label: 'Contact' },
];

const LEGAL = [
  { href: '/#contact', label: 'Terms & conditions' },
  { href: '/#contact', label: 'Privacy policy' },
  { href: '/#contact', label: 'Delivery' },
];

const SOCIAL = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://facebook.com', label: 'Facebook' },
];

/** Row 1: wordmark left, nav centre, social right. Row 2 above a hairline. */
export function Footer() {
  return (
    <footer className="bg-ink-plum text-paper">
      <Container className="py-16 lg:py-20">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" aria-label="Boogie Ice Creams, home">
            <Wordmark tone="paper" className="text-3xl" />
          </Link>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="eyebrow text-paper/80 hover:text-gold">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex items-center gap-6">
            {SOCIAL.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="eyebrow text-paper/80 hover:text-gold"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-paper/20 pt-8 text-caption text-paper/60 lg:flex-row lg:justify-between">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {LEGAL.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p>© {new Date().getFullYear()} Boogie Ice Creams</p>
        </div>
      </Container>
    </footer>
  );
}
