'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { useCart } from '@/lib/cart';

/**
 * The drawer is never needed at first paint, and it is the only thing on the
 * site that pulls in the motion library. Mounting it on first open keeps ~40KB
 * out of every route's first-load JS (PRD §7) at the cost of one frame the first
 * time the cart is opened.
 */
const CartDrawer = dynamic(() => import('./CartDrawer').then((m) => m.CartDrawer), {
  ssr: false,
});

export function CartDrawerMount() {
  const isOpen = useCart((s) => s.isOpen);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  return mounted ? <CartDrawer /> : null;
}
