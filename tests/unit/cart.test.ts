import { beforeEach, describe, expect, it } from 'vitest';

import { cartCount, cartSubtotal, useCart, type CartIndex } from '@/lib/cart';

const index: CartIndex = {
  'BOOGIE-STRW-500': {
    sku: 'BOOGIE-STRW-500',
    slug: 'strawberries-and-cream',
    name: 'Strawberries & Cream',
    size: '500ml',
    price: 45000,
    image: '/x.svg',
    imageAlt: 'x',
    category: 'ice-cream',
  },
  'BOOGIE-VNLA-100': {
    sku: 'BOOGIE-VNLA-100',
    slug: 'madagascan-vanilla',
    name: 'Madagascan Vanilla',
    size: '100ml',
    price: 13000,
    image: '/y.svg',
    imageAlt: 'y',
    category: 'ice-cream',
  },
};

describe('cart store', () => {
  beforeEach(() => {
    useCart.setState({ lines: [], isOpen: false });
  });

  it('increments an existing line rather than duplicating it', () => {
    useCart.getState().add('BOOGIE-STRW-500');
    useCart.getState().add('BOOGIE-STRW-500', 2);
    expect(useCart.getState().lines).toEqual([{ sku: 'BOOGIE-STRW-500', quantity: 3 }]);
  });

  it('removes the line when quantity drops to zero', () => {
    useCart.getState().add('BOOGIE-STRW-500');
    useCart.getState().setQuantity('BOOGIE-STRW-500', 0);
    expect(useCart.getState().lines).toEqual([]);
  });

  it('clamps quantity at 99', () => {
    useCart.getState().add('BOOGIE-STRW-500', 99);
    useCart.getState().add('BOOGIE-STRW-500', 5);
    expect(useCart.getState().lines[0]?.quantity).toBe(99);
  });

  it('stores SKUs and quantities only — no prices', () => {
    useCart.getState().add('BOOGIE-STRW-500', 2);
    const line = useCart.getState().lines[0];
    expect(Object.keys(line ?? {}).sort()).toEqual(['quantity', 'sku']);
  });

  it('resolves the subtotal through the index', () => {
    useCart.getState().add('BOOGIE-STRW-500', 2);
    useCart.getState().add('BOOGIE-VNLA-100', 1);
    expect(cartSubtotal(useCart.getState().lines, index)).toBe(103000);
    expect(cartCount(useCart.getState().lines)).toBe(3);
  });

  it('ignores an unknown SKU in the subtotal rather than guessing a price', () => {
    useCart.getState().add('BOOGIE-GONE-500', 1);
    expect(cartSubtotal(useCart.getState().lines, index)).toBe(0);
  });
});
