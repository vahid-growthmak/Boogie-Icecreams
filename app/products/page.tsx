import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { FilterBar } from '@/components/product/FilterBar';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ViewItemList } from '@/components/product/ViewItemList';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { GoldPetal } from '@/components/ui/GoldPetal';
import { getFeatured, getProducts } from '@/lib/catalog';
import { parseCatalogQuery, CATEGORY_LABELS } from '@/lib/schema';
import { absoluteUrl } from '@/lib/seo';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Our products',
  description:
    'Twelve flavours of small-batch ice cream, sorbet and dairy-free, churned in rotation and sold by the tub. Filter by category and order online.',
  // Filtered and paginated views are shareable but not separately indexable.
  alternates: { canonical: absoluteUrl('/products') },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  // A hand-edited ?category=llama renders the empty state — not a 500, and not
  // a silent full listing that pretends the filter was applied.
  const { query, unknownCategory } = parseCatalogQuery(raw);
  const result = getProducts(query);
  const { items, total, hasMore } = unknownCategory
    ? { items: [], total: 0, hasMore: false }
    : result;
  const featured = getFeatured();

  const heading = query.category ? CATEGORY_LABELS[query.category] : 'Our products';

  return (
    <>
      <section className="pt-10 pb-16 lg:pt-14 lg:pb-20">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow text-cocoa-60">Our products</p>
              <h1 className="mt-4 text-display-l">{heading}</h1>
              <p className="mt-6 max-w-lg text-body-lead text-mulberry">
                Twelve flavours in rotation. What is here today is what came off the churn this
                week.
              </p>
            </div>

            {featured && featured.images[0] && (
              <div className="lg:col-span-5">
                {/* Petal use 2 of 3, behind the featured flavour. */}
                <div className="relative isolate mx-auto flex aspect-square max-w-sm items-center justify-center">
                  <GoldPetal className="top-1/2 left-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2" />
                  <Image
                    src={featured.images[0].src}
                    alt={featured.images[0].alt}
                    width={featured.images[0].width}
                    height={featured.images[0].height}
                    priority
                    sizes="(min-width:1024px) 34vw, 70vw"
                    className="relative w-[64%] -rotate-6 object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      <FilterBar activeCategory={query.category} activeSort={query.sort} total={total} />

      <section className="section-y-sm">
        <Container>
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-h3 text-mulberry">No flavours match that combination yet.</p>
              <ButtonLink href="/products" variant="ghost" className="mt-8">
                Clear filters
              </ButtonLink>
            </div>
          ) : (
            <>
              <ProductGrid products={items} />

              {hasMore && (
                <div className="mt-20 flex justify-center">
                  {/* A link, not a button: pagination is URL state and must survive
                      a refresh and a share. No infinite scroll — it breaks the footer. */}
                  <Link
                    href={{
                      pathname: '/products',
                      query: {
                        ...(query.category ? { category: query.category } : {}),
                        sort: query.sort,
                        page: query.page + 1,
                      },
                    }}
                    scroll={false}
                    className="eyebrow border border-cocoa/25 px-8 py-4 text-cocoa hover:border-mulberry hover:text-mulberry"
                  >
                    Load more
                  </Link>
                </div>
              )}

              <p className="mt-10 text-center text-caption text-cocoa-60">
                Showing {items.length} of {total}
              </p>
            </>
          )}
        </Container>
      </section>

      <ViewItemList
        listName={query.category ? CATEGORY_LABELS[query.category] : 'All products'}
        items={items.map((p) => ({ id: p.slug, name: p.name, category: p.category }))}
      />
    </>
  );
}
