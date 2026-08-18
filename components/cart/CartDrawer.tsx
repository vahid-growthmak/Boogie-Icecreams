'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';

import { CartLine } from '@/components/cart/CartLine';
import { useCartIndex } from '@/components/cart/CartIndexProvider';
import { Button, ButtonLink } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { Close } from '@/components/ui/icons';
import { track, toValue } from '@/lib/analytics';
import {
  FREE_DELIVERY_THRESHOLD,
  cartSubtotal,
  restoreTrigger,
  useCart,
  type CartIndexEntry,
} from '@/lib/cart';
import { formatPrice } from '@/lib/format';

/**
 * Right slide-over, 420px desktop / full width mobile. Focus-trapped and
 * Esc-closable by Radix; focus returns to whichever trigger opened it. PRD §5.4.
 */
export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const lines = useCart((s) => s.lines);
  const hasHydrated = useCart((s) => s.hasHydrated);
  const index = useCartIndex();
  const reduced = useReducedMotion();

  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);

  const resolved = lines
    .map((line) => {
      const entry = index[line.sku];
      return entry ? { entry, quantity: line.quantity } : null;
    })
    .filter((l): l is { entry: CartIndexEntry; quantity: number } => l !== null);

  const subtotal = cartSubtotal(lines, index);
  const remaining =
    FREE_DELIVERY_THRESHOLD === null ? null : FREE_DELIVERY_THRESHOLD - subtotal;

  async function handleCheckout() {
    setCheckoutError(null);
    setCheckingOut(true);
    track('begin_checkout', {
      value: toValue(subtotal),
      items: lines.map((l) => ({ item_id: l.sku, quantity: l.quantity })),
    });

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        // SKUs and quantities. No prices leave the browser.
        body: JSON.stringify({ lines }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setCheckoutError(data.error ?? "Checkout isn't available right now. Nothing was charged.");
        return;
      }
      window.location.assign(data.url);
    } catch {
      setCheckoutError("Checkout didn't start. Nothing was charged — try again.");
    } finally {
      setCheckingOut(false);
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(next) => !next && close()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-ink-plum"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              />
            </Dialog.Overlay>

            <Dialog.Content
              asChild
              forceMount
              // Radix has no Trigger to return focus to here, so we hand it the
              // control that actually opened the drawer.
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                restoreTrigger();
              }}
            >
              <motion.div
                className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[420px] flex-col bg-white"
                initial={{ x: reduced ? 0 : '100%' }}
                animate={{ x: 0 }}
                exit={{ x: reduced ? 0 : '100%' }}
                transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between border-b border-cocoa/15 px-6 py-5">
                  <Dialog.Title className="text-h3 text-mulberry">Your cart</Dialog.Title>
                  <Dialog.Close asChild>
                    <IconButton label="Close cart">
                      <Close className="size-5" />
                    </IconButton>
                  </Dialog.Close>
                </div>

                <div className="flex-1 overflow-y-auto px-6">
                  {/* Empty state waits for hydration so a returning customer never
                      sees "nothing in the cart" flash over three tubs. */}
                  {!hasHydrated ? (
                    <p className="py-10 text-caption text-cocoa-60">Loading your cart…</p>
                  ) : resolved.length === 0 ? (
                    <div className="py-12">
                      <p className="text-body text-cocoa">Nothing in the cart yet.</p>
                      <Link
                        href="/products"
                        onClick={close}
                        className="eyebrow mt-4 inline-block border-b border-cocoa/40 pb-1 text-cocoa hover:border-mulberry hover:text-mulberry"
                      >
                        Browse the flavours
                      </Link>
                    </div>
                  ) : (
                    <ul className="list-none">
                      {resolved.map(({ entry, quantity }) => (
                        <CartLine key={entry.sku} entry={entry} quantity={quantity} />
                      ))}
                    </ul>
                  )}
                </div>

                {hasHydrated && resolved.length > 0 && (
                  <div className="border-t border-cocoa/15 px-6 py-6">
                    <div className="flex items-baseline justify-between">
                      <span className="eyebrow text-cocoa">Subtotal</span>
                      <span className="font-display text-h3 text-mulberry">
                        {formatPrice(subtotal)}
                      </span>
                    </div>

                    {remaining !== null && remaining > 0 && (
                      <p className="mt-2 text-caption text-cocoa-60">
                        {formatPrice(remaining)} more for free delivery
                      </p>
                    )}

                    <p className="mt-2 text-caption text-cocoa-60">
                      Delivery calculated at checkout. Tubs travel in insulated packaging.
                    </p>

                    {checkoutError && (
                      <p role="alert" className="mt-4 text-caption text-mulberry">
                        {checkoutError}
                      </p>
                    )}

                    <Button
                      className="mt-5 w-full"
                      onClick={handleCheckout}
                      disabled={checkingOut}
                    >
                      {checkingOut ? 'Starting checkout…' : 'Checkout'}
                    </Button>
                    <ButtonLink
                      href="/products"
                      variant="ghost"
                      className="mt-3 w-full"
                      onClick={close}
                    >
                      Continue shopping
                    </ButtonLink>
                  </div>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
