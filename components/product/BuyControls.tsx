'use client';

import Link from 'next/link';
import { useState } from 'react';

import { AddToCartButton } from '@/components/product/AddToCartButton';
import { QuantityStepper } from '@/components/product/QuantityStepper';
import { SizeSelector } from '@/components/product/SizeSelector';
import { formatPrice } from '@/lib/format';
import type { Variant } from '@/lib/schema';

/**
 * The interactive half of the buy panel: price, size, quantity, add.
 * Everything static on the PDP — name, strapline, allergens, nutrition —
 * stays server-rendered around this.
 *
 * Every size the product is made in is shown, including the trade-only ones.
 * PRD §5.3 lists 2.4L in the selector while §11 decision 4 is still open on
 * whether it sells D2C; showing it disabled with the reason satisfies both and
 * keeps the "never hide a size" rule intact.
 */
export function BuyControls({
  variants,
  productName,
  category,
}: {
  variants: Variant[];
  productName: string;
  category: string;
}) {
  const buyable = variants.filter((v) => v.inStock && !v.tradeOnly);
  const initial = buyable.find((v) => v.size === '500ml') ?? buyable[0] ?? variants[0];
  const [sku, setSku] = useState(initial?.sku ?? '');
  const [quantity, setQuantity] = useState(1);

  const selected = variants.find((v) => v.sku === sku) ?? initial;
  if (!selected) return null;

  const soldOut = variants.filter((v) => !v.inStock && !v.tradeOnly);
  const tradeOnly = variants.filter((v) => v.tradeOnly);
  const canBuy = selected.inStock && !selected.tradeOnly;

  const notes: React.ReactNode[] = [];
  if (soldOut.length > 0) {
    notes.push(
      <span key="sold-out">
        Sold out in {soldOut.map((v) => v.size).join(' and ')}.
        {buyable.length > 0 && ` ${buyable.map((v) => v.size).join(' and ')} available.`}
      </span>,
    );
  }
  if (tradeOnly.length > 0) {
    notes.push(
      <span key="trade">
        {tradeOnly.map((v) => v.size).join(' and ')} {tradeOnly.length > 1 ? 'are' : 'is a'} trade{' '}
        {tradeOnly.length > 1 ? 'sizes' : 'size'} —{' '}
        <Link href="/#trade" className="underline underline-offset-4">
          send a trade enquiry
        </Link>
        .
      </span>,
    );
  }

  return (
    <div>
      <p className="mt-6 font-display text-h2 text-mulberry">
        {selected.compareAtPrice && (
          <span className="mr-3 text-h3 text-cocoa-60 line-through">
            {formatPrice(selected.compareAtPrice)}
          </span>
        )}
        {formatPrice(selected.price)}
      </p>

      <div className="mt-8">
        <SizeSelector
          variants={variants}
          value={selected.sku}
          onChange={(next) => {
            setSku(next);
            setQuantity(1);
          }}
          describedById={notes.length > 0 ? 'size-note' : undefined}
        />
        {notes.length > 0 && (
          <p id="size-note" className="mt-3 flex flex-col gap-1 text-caption text-mulberry">
            {notes}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <QuantityStepper
          value={quantity}
          onChange={setQuantity}
          label={`Quantity of ${productName}`}
        />
      </div>

      <AddToCartButton
        sku={selected.sku}
        quantity={quantity}
        disabled={!canBuy}
        label={canBuy ? 'Add to cart' : selected.tradeOnly ? 'Trade size' : 'Sold out'}
        item={{
          name: productName,
          size: selected.size,
          price: selected.price,
          category,
        }}
        className="mt-8 w-full"
      />
    </div>
  );
}
