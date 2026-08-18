'use client';

import Image from 'next/image';
import Link from 'next/link';

import { QuantityStepper } from '@/components/product/QuantityStepper';
import { track, toValue } from '@/lib/analytics';
import { useCart, type CartIndexEntry } from '@/lib/cart';
import { formatPrice } from '@/lib/format';

export function CartLine({ entry, quantity }: { entry: CartIndexEntry; quantity: number }) {
  const setQuantity = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.remove);
  const close = useCart((s) => s.close);

  const handleRemove = () => {
    track('remove_from_cart', {
      item_id: entry.sku,
      value: toValue(entry.price * quantity),
    });
    remove(entry.sku);
  };

  return (
    <li className="flex gap-4 border-b border-cocoa/12 py-6">
      <Link
        href={`/products/${entry.slug}`}
        onClick={close}
        className="relative block aspect-4/5 w-20 shrink-0 overflow-hidden bg-white"
      >
        <Image
          src={entry.image}
          alt={entry.imageAlt}
          fill
          sizes="80px"
          className="object-contain"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link href={`/products/${entry.slug}`} onClick={close} className="block">
              <h3 className="truncate text-h3 text-mulberry">{entry.name}</h3>
            </Link>
            <p className="text-caption text-cocoa-60">{entry.size}</p>
          </div>
          <p className="shrink-0 text-body font-medium text-cocoa">
            {formatPrice(entry.price * quantity)}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3">
          <QuantityStepper
            value={quantity}
            onChange={(next) => setQuantity(entry.sku, next)}
            label={`Quantity for ${entry.name}, ${entry.size}`}
            size="sm"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="text-caption text-cocoa-60 underline underline-offset-4 hover:text-mulberry"
          >
            Remove<span className="sr-only"> {entry.name}, {entry.size}</span>
          </button>
        </div>
      </div>
    </li>
  );
}
