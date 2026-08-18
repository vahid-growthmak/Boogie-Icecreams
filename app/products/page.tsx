import type { Metadata } from 'next';
import Link from 'next/link';

import { ProductGrid } from '@/components/product/ProductGrid';
import { TradePackForm } from '@/components/product/TradePackForm';
import { ViewItemList } from '@/components/product/ViewItemList';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { getProducts } from '@/lib/catalog';
import { parseCatalogQuery } from '@/lib/schema';
import { absoluteUrl } from '@/lib/seo';
import { TIERS } from '@/lib/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Six format tiers — carry homes, paper packs, bulk and party packs, novelties, Boogie Woogie and trade supply. One supplier for the whole freezer.',
  alternates: { canonical: absoluteUrl('/products') },
};

/**
 * Sitemap page 2 — Products Index.
 *
 *   2.2  Tier navigation ..... catalogue by format tier, NOT a packshot gallery,
 *                              "because a trade buyer navigates by what fills a
 *                              cabinet, not by flavour."
 *   2.3  Breadth argument .... one supplier, fewer relationships.
 *   2.4  Price ladder ........ the tier structure carrying the margin argument.
 *   2.5  Trade pack .......... light gate: phone + WhatsApp + territory.
 *
 * 2.1 header, 2.6 pinned rail and 2.7 footer are sitewide.
 */
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const { query } = parseCatalogQuery(raw);
  const { items } = getProducts(query);

  return (
    <>
      {/* --- 2.2 Tier navigation ------------------------------------------- */}
      <section className="pt-10 pb-16 lg:pt-14 lg:pb-20">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow text-cocoa-60">Products</p>
            <h1 className="mt-4 text-display-l">Six formats, one freezer</h1>
            <p className="mt-6 text-body-lead text-mulberry">
              The catalogue is organised by what a format does to a cabinet, not by flavour. Pick
              the tier that matches the space you are filling.
            </p>
          </div>

          <ul className="mt-14 grid list-none grid-cols-1 gap-px bg-cocoa/10 sm:grid-cols-2 lg:grid-cols-3">
            {TIERS.map((tier, i) => (
              <Reveal as="li" key={tier.href} delayIndex={i % 3} className="bg-paper">
                <Link href={tier.href} className="group flex h-full flex-col p-8 hover:bg-sand/50">
                  <h2 className="text-h3 group-hover:text-ink-plum">{tier.label}</h2>
                  <p className="mt-3 flex-1 text-body text-cocoa">{tier.role}</p>
                  <span className="eyebrow mt-6 text-mulberry">View tier →</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* --- 2.3 The breadth argument --------------------------------------
          Note: "Product count stated only if the SKU list is verified.
          Otherwise omitted." The strategy document records the 152-product
          figure as CLAIMED, not verified, so no count appears here. */}
      <section className="border-y border-cocoa/10 bg-sand/40">
        <Container className="py-16 lg:py-20">
          <Reveal className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-h2">One supplier, not six</h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-body-lead text-mulberry">
                A freezer filled from one relationship is a freezer with one delivery, one invoice
                and one number to call when something goes wrong.
              </p>
              <p className="mt-5 text-body text-cocoa">
                Boogies covers the entry price point, the family purchase, the counter impulse, the
                bulk line and the exclusive range — plus the vans, cones and ghee that most
                manufacturers make you source elsewhere. Fewer relationships is not a slogan; it is
                fewer delivery windows to coordinate and less working capital tied up across
                suppliers.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* --- 2.4 Price ladder explainer -------------------------------------
          Note: "Published price list is a commercial decision — [CONFIRM]
          whether it stays public." So the SHAPE of the ladder is explained and
          no rupee figure is published. The 36-line / fifteen-in-the-upper-band
          split is from the strategy document's own price-ladder analysis. */}
      <section className="section-y">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow text-cocoa-60">The ladder</p>
            <h2 className="mt-4 text-h2">Where the margin actually sits</h2>
            <p className="mt-6 text-body-lead text-mulberry">
              A distributor does not calculate margin percentage. He calculates rupees per unit
              moved — and that number changes enormously across this catalogue.
            </p>
            <p className="mt-5 text-body text-cocoa">
              The bulk list runs thirty-six lines from the entry band to the top, and roughly
              forty-two per cent of them sit in the upper band. A route built only on the entry line
              turns over volume; a route that carries the upper band alongside it earns materially
              more on the same van, the same freezer and the same delivery.
            </p>
            <p className="mt-5 text-body text-cocoa">
              Per-line pricing is shared in the trade pack rather than published, so partners are
              not negotiating against a public list.
            </p>
            <ButtonLink href="/partners/distributor/economics" variant="link" className="mt-8">
              See the economics →
            </ButtonLink>
          </Reveal>
        </Container>
      </section>

      {/* --- 2.5 Trade pack download ---------------------------------------- */}
      <section className="bg-sand/50">
        <Container className="section-y">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow text-cocoa-60">Trade pack</p>
              <h2 className="mt-4 text-h2">Get the specifications</h2>
              <p className="mt-6 text-body-lead text-mulberry">
                Weights, case configurations, shelf life, storage temperature and the price ladder,
                in one document you can forward.
              </p>
              <p className="mt-5 text-body text-cocoa">
                Three questions, and the territory one is the one we answer for you.
              </p>
            </Reveal>
            <div className="lg:col-span-7">
              <TradePackForm />
            </div>
          </div>
        </Container>
      </section>

      {/* --- Interim -------------------------------------------------------
          The tier routes above are defined by the sitemap but not yet built,
          and these SKU pages already exist. Listing them keeps them reachable
          instead of orphaning twelve live pages behind unbuilt tiers. Remove
          this block once /products/[tier] absorbs them. */}
      {items.length > 0 && (
        <section className="section-y">
          <Container>
            <h2 className="text-h2">Lines currently published</h2>
            <p className="mt-4 max-w-2xl text-body text-cocoa">
              These pages predate the tier structure and are listed here until the tier templates
              take them over.
            </p>
            <div className="mt-12">
              <ProductGrid products={items} />
            </div>
          </Container>
        </section>
      )}

      <ViewItemList
        listName="Products index"
        items={items.map((p) => ({ id: p.slug, name: p.name, category: p.category }))}
      />
    </>
  );
}
