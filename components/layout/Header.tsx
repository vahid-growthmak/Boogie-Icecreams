import Link from 'next/link';

import { MobileNav } from '@/components/layout/MobileNav';
import { PartnerMenu } from '@/components/layout/PartnerMenu';
import { StickyHeaderShell } from '@/components/layout/StickyHeaderShell';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { NAV } from '@/lib/site';

/**
 * Sitemap §1.1 — six slots plus the five-way partner dropdown, "so the primary
 * commercial journey is visible at nav level on every page without consuming its
 * own slot."
 *
 * The centred-wordmark retail bar was removed with the cart: the strategy
 * document is explicit that the consumer "cannot buy direct" and is a supporting
 * audience, so a basket in the header pointed at a journey that does not exist.
 * Logo left, nav right, territory CTA at the end — the reading order a trade
 * visitor scans in.
 */
export function Header() {
  return (
    <StickyHeaderShell>
      <Container as="nav" className="flex items-center justify-between gap-6 py-4">
        <Link href="/" className="shrink-0" aria-label="Boogies Ice Cream, home">
          <Logo height={52} priority className="h-11 lg:h-13" />
        </Link>

        <ul className="hidden list-none items-center gap-7 xl:flex">
          {NAV.map((item) =>
            'menu' in item ? (
              <li key={item.href}>
                <PartnerMenu />
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-round text-body text-brand-brown/85 transition-colors hover:text-berry"
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          {/* Primary CTA A. The territory question is the one Boogies answers
              first — Decision 1, strategy §1.4. */}
          <ButtonLink
            href="/partners/distributor/territory"
            className="hidden lg:inline-flex"
          >
            Check your territory
          </ButtonLink>
          <div className="xl:hidden">
            <MobileNav />
          </div>
        </div>
      </Container>
    </StickyHeaderShell>
  );
}
