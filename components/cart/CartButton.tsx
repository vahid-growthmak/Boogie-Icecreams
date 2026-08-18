'use client';

import { useCartIndex } from '@/components/cart/CartIndexProvider';
import { IconButton } from '@/components/ui/IconButton';
import { CartIcon } from '@/components/ui/icons';
import { track, toValue } from '@/lib/analytics';
import { cartCount, cartSubtotal, rememberTrigger, useCart } from '@/lib/cart';

/**
 * The header cart trigger. Renders no badge until the store has rehydrated —
 * a 0 that jumps to 3 is worse than a badge that arrives a frame late.
 */
export function CartButton() {
  const lines = useCart((s) => s.lines);
  const hasHydrated = useCart((s) => s.hasHydrated);
  const open = useCart((s) => s.open);
  const index = useCartIndex();

  const count = cartCount(lines);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    rememberTrigger(event.currentTarget);
    open();
    track('view_cart', {
      value: toValue(cartSubtotal(lines, index)),
      items: lines.map((l) => ({ item_id: l.sku, quantity: l.quantity })),
    });
  };

  return (
    <IconButton
      label={hasHydrated && count > 0 ? `Open cart, ${count} items` : 'Open cart'}
      onClick={handleOpen}
      className="relative"
    >
      <CartIcon className="size-5" />
      {hasHydrated && count > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-mulberry text-[0.625rem] font-semibold text-paper"
          aria-hidden="true"
        >
          {count}
        </span>
      )}
    </IconButton>
  );
}
