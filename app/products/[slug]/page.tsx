import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Gallery } from '@/components/product/Gallery';
import { NutritionTable } from '@/components/product/NutritionTable';
import { ProductCard } from '@/components/product/ProductCard';
import { ViewItem } from '@/components/product/ViewItem';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { defaultVariant, getAllProducts, getProductBySlug, getRelated } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import { CATEGORY_LABELS } from '@/lib/schema';
import { breadcrumbJsonLd, buildProductMetadata, productJsonLd } from '@/lib/seo';

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return buildProductMetadata(product, defaultVariant(product));
}

/**
 * Sitemap page 4 — SKU Detail.
 *
 *   4.2  Breadcrumb .............. BreadcrumbList schema
 *   4.3  Product hero ............ real packshot, correct spelling
 *   4.4  Specification table ..... "The reason this page exists"
 *   4.5  Band and margin context . where the line sits on the ladder
 *   4.6  Related lines ........... weighted by band before format
 *   4.7  Exclusivity flag ........ conditional on the CMS flag
 *
 * The buy panel is gone. The strategy document is unambiguous that the consumer
 * "cannot buy direct" and is a supporting audience — a cart on this page pointed
 * at a transaction the business does not do. The page now converts to a trade
 * conversation, which is the transaction it does do.
 *
 * §4.4 note: "Omit any field not verified rather than estimating." Case
 * configuration, shelf life and MOQ are not in the catalogue data, so they are
 * absent rather than guessed — which is also why the trade pack exists.
 */
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const primary = defaultVariant(product);
  const related = getRelated(product, 4);
  const openByDefault = ['ingredients', ...(product.allergens.length > 0 ? ['allergens'] : [])];

  return (
    <>
      <JsonLd data={productJsonLd(product, primary)} />
      <JsonLd data={breadcrumbJsonLd(product)} />
      <ViewItem
        item={{
          id: product.slug,
          name: product.name,
          category: product.category,
          price: primary.price,
        }}
      />

      {/* --- 4.2 Breadcrumb ------------------------------------------------- */}
      <Container className="pt-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex list-none flex-wrap items-center gap-2 text-caption text-cocoa-60">
            <li>
              <Link href="/" className="hover:text-mulberry">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/products" className="hover:text-mulberry">
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-cocoa">
              {product.name}
            </li>
          </ol>
        </nav>
      </Container>

      {/* --- 4.3 Product hero + 4.4 Specification --------------------------- */}
      <section className="pt-8 pb-20 lg:pt-12 lg:pb-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Gallery images={product.images} productName={product.name} />
            </div>

            <div className="lg:col-span-5">
              <p className="eyebrow text-cocoa-60">{CATEGORY_LABELS[product.category]}</p>
              <h1 className="mt-4 text-display-l">{product.name}</h1>
              <p className="mt-5 text-body-lead text-mulberry">{product.strapline}</p>

              {/* 4.7 Exclusivity flag — renders only when the CMS flag is set. */}
              {product.exclusive && (
                <p className="mt-6 border-l-2 border-gold bg-sand/60 px-5 py-4 text-body text-cocoa">
                  <strong className="font-semibold text-mulberry">Exclusive line.</strong> Not
                  available to general retail — stocked only through Boogies outlets and
                  franchises.
                </p>
              )}

              {/* 4.4 Specification table. Verified fields only. */}
              <div className="mt-10">
                <h2 className="eyebrow text-cocoa-60">Specification</h2>
                <dl className="mt-4 divide-y divide-cocoa/10 border-y border-cocoa/10">
                  {product.variants.map((variant) => (
                    <div key={variant.sku} className="flex items-baseline justify-between py-3">
                      <dt className="text-body text-cocoa">{variant.size}</dt>
                      <dd className="text-body text-cocoa">
                        {formatPrice(variant.price)}
                        <span className="ml-3 text-caption text-cocoa-60">{variant.sku}</span>
                      </dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between py-3">
                    <dt className="text-body text-cocoa">Storage</dt>
                    <dd className="text-body text-cocoa">−18°C</dd>
                  </div>
                </dl>
                <p className="mt-3 text-caption text-cocoa-60">
                  Case configuration, shelf life and minimum order are confirmed in the trade pack
                  rather than estimated here.
                </p>
              </div>

              {/* 4.5 Band and margin context. */}
              <div className="mt-10 bg-sand/50 p-6">
                <h2 className="text-h3">Where this sits on the ladder</h2>
                <p className="mt-3 text-body text-cocoa">
                  A line is worth carrying for what it returns per unit moved, not for what it
                  tastes like. The trade pack places this SKU against the rest of the band so the
                  comparison is in rupees rather than in adjectives.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/products">Request the trade pack</ButtonLink>
                  <ButtonLink href="/partners/distributor" variant="ghost">
                    Enquire about this line
                  </ButtonLink>
                </div>
              </div>

              <div className="mt-12">
                <Accordion defaultValue={openByDefault}>
                  <AccordionItem value="ingredients" title="Ingredients">
                    <p>{product.ingredients}</p>
                  </AccordionItem>

                  <AccordionItem value="allergens" title="Allergens" emphasis>
                    {product.allergens.length > 0 ? (
                      <p>
                        Contains{' '}
                        <strong className="font-semibold text-mulberry">
                          {product.allergens.join(', ').toLowerCase()}
                        </strong>
                        .
                      </p>
                    ) : (
                      <p>No declared allergens in the recipe.</p>
                    )}
                  </AccordionItem>

                  <AccordionItem value="nutrition" title="Nutrition">
                    <NutritionTable nutrition={product.nutritionPer100g} />
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- 4.6 Related lines ---------------------------------------------- */}
      {related.length > 0 && (
        <section className="section-y bg-sand/40">
          <Container>
            <h2 className="mb-14 text-h2">Other lines in the range</h2>
            <ul className="grid list-none grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
              {related.map((item, i) => (
                <Reveal as="li" key={item.slug} delayIndex={i}>
                  <ProductCard product={item} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
