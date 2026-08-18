'use client';

import { Button } from '@/components/ui/Button';
import { track, toValue } from '@/lib/analytics';
import { rememberTrigger, useCart } from '@/lib/cart';

/**
 * Add, open the drawer, fire the event — in that order, optimistically.
 * The drawer opening is the confirmation; there is no toast.
 * Shared by the PDP buy panel and the grid quick-add.
 */
export function AddToCartButton({
  sku,
  quantity = 1,
  disabled = false,
  label = 'Add to cart',
  accessibleName,
  variant = 'primary',
  className,
  item,
}: {
  sku: string;
  quantity?: number;
  disabled?: boolean;
  label?: string;
  /** Overrides the visible label for screen readers, e.g. on a quick-add. */
  accessibleName?: string;
  variant?: 'primary' | 'ghost';
  className?: string;
  item: { name: string; size: string; price: number; category: string };
}) {
  const add = useCart((s) => s.add);
  const open = useCart((s) => s.open);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    rememberTrigger(event.currentTarget);
    add(sku, quantity);
    open();
    track('add_to_cart', {
      value: toValue(item.price * quantity),
      items: [
        {
          item_id: sku,
          item_name: item.name,
          item_category: item.category,
          item_variant: item.size,
          price: toValue(item.price),
          quantity,
        },
      ],
    });
  };

  return (
    <Button variant={variant} onClick={onClick} disabled={disabled} className={className}>
      {accessibleName ? (
        <>
          <span aria-hidden="true">{label}</span>
          <span className="sr-only">{accessibleName}</span>
        </>
      ) : (
        label
      )}
    </Button>
  );
}
