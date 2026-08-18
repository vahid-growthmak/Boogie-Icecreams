'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Container } from '@/components/ui/Container';
import { useCart } from '@/lib/cart';

/**
 * ?checkout=success|cancel returns to Home with a panel. It is a searchParam on
 * Home, not a route — PRD §3 keeps the template count at three.
 *
 * It reads the param on the client, inside a Suspense boundary, so Home itself
 * stays statically rendered with ISR rather than opting into dynamic rendering
 * for a banner that appears once per order.
 *
 * The cart is cleared here, on the success redirect, rather than from the
 * webhook: the browser owns localStorage.
 */
export function CheckoutNotice() {
  const params = useSearchParams();
  const state = params.get('checkout');
  const clear = useCart((s) => s.clear);

  useEffect(() => {
    if (state === 'success') clear();
  }, [state, clear]);

  if (state !== 'success' && state !== 'cancel') return null;

  return (
    <Container className="pt-8">
      <div role="status" className="border border-gold bg-white px-6 py-5">
        {state === 'success' ? (
          <>
            <p className="text-h3 text-mulberry">Order placed</p>
            <p className="mt-2 text-body text-cocoa">
              A confirmation is on its way to your inbox. Tubs travel in insulated packaging and we
              will email again when yours leaves the freezer.
            </p>
          </>
        ) : (
          <>
            <p className="text-h3 text-mulberry">Checkout cancelled</p>
            <p className="mt-2 text-body text-cocoa">
              Nothing was charged and your cart is still here.
            </p>
          </>
        )}
      </div>
    </Container>
  );
}
