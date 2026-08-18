import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BuyControls } from '@/components/product/BuyControls';
import { Gallery } from '@/components/product/Gallery';
import { NutritionTable } from '@/components/product/NutritionTable';
import { ProductCard } from '@/components/product/ProductCard';
import { ViewItem } from '@/components/product/ViewItem';
import { Accordion, AccordionItem } from '@/components/ui/Accordion';
import { Container } from '@/components/ui/Container';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { defaultVariant, getAllProducts, getProductBySlug, getRelated } from '@/lib/catalog';
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

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const primary = defaultVariant(product);
  const related = getRelated(product, 4);
  const storyImage = product.images[1] ?? product.images[0];

  // Allergens are open by default when the product declares any, so the block is
  // readable with JavaScript disabled. PRD §5.3 acceptance criteria.
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
                Our products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-cocoa">
              {product.name}
            </li>
          </ol>
        </nav>
      </Container>

      {/* Gallery 7 / buy panel 5 */}
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

              <BuyControls
                variants={product.variants}
                productName={product.name}
                category={product.category}
              />

              <p className="mt-5 text-caption text-cocoa-60">
                Tubs travel packed in insulated boxes with dry ice. Delivery days and cut-off times
                are confirmed at checkout.
              </p>

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
                        . Made in a kitchen that also handles milk, eggs, nuts and gluten.
                      </p>
                    ) : (
                      <p>
                        No declared allergens in the recipe. Made in a kitchen that also handles
                        milk, eggs, nuts and gluten.
                      </p>
                    )}
                  </AccordionItem>

                  <AccordionItem value="nutrition" title="Nutrition">
                    <NutritionTable nutrition={product.nutritionPer100g} />
                  </AccordionItem>

                  <AccordionItem value="storage" title="Storage">
                    <p>
                      Keep frozen at −18°C. Once opened, eat within a week. There are no
                      stabilisers in this, so let it stand ten minutes before scooping and do not
                      refreeze once it has softened through.
                    </p>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {product.story && storyImage && (
        <section className="section-y bg-sand/50">
          <Container>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-6">
                <h2 className="text-h2">The flavour</h2>
                <p className="mt-6 text-body-lead text-mulberry">{product.description}</p>
                <p className="mt-5 text-body text-cocoa">{product.story}</p>
                <p className="mt-8 text-caption text-cocoa-60">
                  {product.flavourNotes.join(' · ')}
                </p>
              </Reveal>
              <Reveal className="lg:col-span-6" delayIndex={1}>
                <div className="relative aspect-4/5">
                  <Image
                    src={storyImage.src}
                    alt={storyImage.alt}
                    fill
                    sizes="(min-width:1024px) 50vw, 92vw"
                    className="object-contain p-10"
                  />
                </div>
              </Reveal>
            </div>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section className="section-y">
          <Container>
            <h2 className="mb-14 text-center text-h2">You may also like</h2>
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
