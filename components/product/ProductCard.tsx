import Image from 'next/image';
import Link from 'next/link';

import { AddToCartButton } from '@/components/product/AddToCartButton';
import { defaultVariant } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import type { Product } from '@/lib/schema';

/**
 * Server component. Only the quick-add is client code, and it receives four
 * primitives rather than the Product — the catalog never crosses the boundary.
 *
 * Hover scales the image 1.03 and moves nothing else. The button is always
 * visible on touch, where there is no hover to reveal it.
 */
export function ProductCard({
  product,
  priority = false,
  sizes = '(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 80vw',
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
}) {
  const variant = defaultVariant(product);
  const image = product.images[0];
  const soldOut = !variant.inStock;

  return (
    <article className="group flex h-full flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-4/5 overflow-hidden bg-white"
      >
        {image && (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-contain p-6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-103"
          />
        )}
        {product.badges.includes('new') && (
          <span className="eyebrow absolute top-4 left-4 bg-mulberry px-3 py-1.5 text-paper">
            New
          </span>
        )}
        {soldOut && (
          <span className="eyebrow absolute top-4 right-4 bg-cocoa px-3 py-1.5 text-paper">
            Sold out
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col items-center gap-1 pt-5 text-center">
        <h3 className="text-h3">
          <Link href={`/products/${product.slug}`} className="hover:text-ink-plum">
            {product.name}
          </Link>
        </h3>
        <p className="text-caption text-cocoa-60">{product.flavourNotes.join(' · ')}</p>

        <p className="mt-2 text-body text-cocoa">
          {variant.compareAtPrice && (
            <span className="mr-2 text-cocoa-60 line-through">
              {formatPrice(variant.compareAtPrice)}
            </span>
          )}
          {formatPrice(variant.price)}
          <span className="text-cocoa-60"> · {variant.size}</span>
        </p>

        <div className="mt-4 opacity-100 transition-opacity lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100">
          <AddToCartButton
            sku={variant.sku}
            variant="ghost"
            disabled={soldOut}
            label={soldOut ? 'Sold out' : 'Quick add'}
            accessibleName={
              soldOut
                ? `${product.name} is sold out in ${variant.size}`
                : `Add ${product.name}, ${variant.size}, to cart`
            }
            item={{
              name: product.name,
              size: variant.size,
              price: variant.price,
              category: product.category,
            }}
            className="px-6 py-3"
          />
        </div>
      </div>
    </article>
  );
}
