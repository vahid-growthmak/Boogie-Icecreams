import { ProductCard } from '@/components/product/ProductCard';
import { Reveal } from '@/components/ui/Reveal';
import type { Product } from '@/lib/schema';

/** 4-up xl / 3-up lg / 2-up sm / 1-up mobile. PRD §5.2. */
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid list-none grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, i) => (
        <Reveal as="li" key={product.slug} delayIndex={i % 4}>
          <ProductCard product={product} priority={i < 4} />
        </Reveal>
      ))}
    </ul>
  );
}
