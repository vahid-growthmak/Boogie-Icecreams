import Link from 'next/link';

import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { CONTACT, ENTITIES, FOOTER_COLUMNS } from '@/lib/site';

const LEGAL = [
  { href: '/privacy', label: 'Privacy policy' },
  { href: '/terms', label: 'Terms' },
];

/**
 * Sitemap §1.13 — locked template. Four columns:
 * Explore | Products | Partner With Us | Contact & Legal.
 *
 * The partner email is visible in column four by design: it is one of nine
 * sitewide surfaces carrying it, "because the relationship-driven distributor
 * archetype bypasses forms and looks for a person."
 *
 * Both registered entities are shown. The strategy document treats entity
 * transparency as a gatekeeper requirement — a family member or business partner
 * checking legitimacy before capital moves.
 */
export function Footer() {
  return (
    <footer className="bg-brand-brown text-paper">
      <Container className="py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-5 lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" aria-label="Boogies Ice Cream, home">
              {/* Full lockup — the footer is the one place with room for the
                  tagline. The mark keeps its own colour on ink-plum: its white
                  keyline carries it, and an alpha-derived reverse of a filled
                  badge collapses to a featureless blob. */}
              <Logo lockup="full" height={96} className="h-20 lg:h-24" />
            </Link>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="font-round text-caption text-berry">{column.heading}</h2>
              <ul className="mt-5 flex list-none flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-caption text-paper/75 transition-colors hover:text-berry">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-round text-caption text-berry">Contact &amp; Legal</h2>
            <ul className="mt-5 flex list-none flex-col gap-3">
              <li>
                <Link href="/contact" className="text-caption text-paper/75 transition-colors hover:text-berry">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.partnerEmail}`}
                  className="text-caption text-paper/75 transition-colors hover:text-berry"
                >
                  {CONTACT.partnerEmail}
                </a>
              </li>
              {/* One number sitewide. Rendered only once a confirmed number
                  exists — the current estate publishes two different ones. */}
              {CONTACT.phone && (
                <li>
                  <a
                    href={`tel:${CONTACT.phone.replace(/\s/g, '')}`}
                    className="text-caption text-paper/75 transition-colors hover:text-berry"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
              )}
              {LEGAL.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-caption text-paper/75 transition-colors hover:text-berry">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-paper/15 pt-8 text-caption text-paper/55 lg:flex-row lg:items-center lg:justify-between">
          <ul className="flex list-none flex-col gap-1 sm:flex-row sm:gap-6">
            {ENTITIES.map((entity) => (
              <li key={entity.name}>
                {entity.name} · {entity.state}
              </li>
            ))}
          </ul>
          <p>© {new Date().getFullYear()} Boogies Ice Cream</p>
        </div>
      </Container>
    </footer>
  );
}
