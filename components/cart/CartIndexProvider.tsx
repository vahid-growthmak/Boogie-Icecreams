'use client';

import { createContext, useContext } from 'react';

import type { CartIndex } from '@/lib/cart';

/**
 * The drawer reads its lines from localStorage, so it cannot resolve names and
 * prices on the server. The index is built server-side in app/layout.tsx and
 * handed down — display data only, ~30 rows. It keeps content/ out of the client
 * bundle, and nothing in it is trusted at checkout.
 */
const CartIndexContext = createContext<CartIndex>({});

export function CartIndexProvider({
  index,
  children,
}: {
  index: CartIndex;
  children: React.ReactNode;
}) {
  return <CartIndexContext.Provider value={index}>{children}</CartIndexContext.Provider>;
}

export function useCartIndex(): CartIndex {
  return useContext(CartIndexContext);
}
