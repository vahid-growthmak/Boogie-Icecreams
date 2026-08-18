'use client';

// Client store: the drawer and the header badge are the only consumers.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * The cart holds SKUs and quantities. Nothing else. PRD §6.5 — a persisted
 * price is a stale price, and a client-owned price is a forged price. Everything
 * displayable is resolved from the catalog index; everything charged is
 * re-resolved on the server at checkout.
 */

export type CartLineItem = { sku: string; quantity: number };

/** Display-only mirror of the catalog, built on the server. Carries no secrets. */
export type CartIndexEntry = {
  sku: string;
  slug: string;
  name: string;
  size: string;
  price: number;
  image: string;
  imageAlt: string;
  category: string;
};

export type CartIndex = Record<string, CartIndexEntry>;

const MAX_QUANTITY = 99;

type CartState = {
  lines: CartLineItem[];
  isOpen: boolean;
  hasHydrated: boolean;
  add: (sku: string, quantity?: number) => void;
  setQuantity: (sku: string, quantity: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  setHydrated: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      hasHydrated: false,

      add: (sku, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.sku === sku);
          if (!existing) return { lines: [...state.lines, { sku, quantity }] };
          return {
            lines: state.lines.map((l) =>
              l.sku === sku
                ? { ...l, quantity: Math.min(l.quantity + quantity, MAX_QUANTITY) }
                : l,
            ),
          };
        }),

      setQuantity: (sku, quantity) =>
        set((state) => ({
          lines:
            quantity <= 0
              ? state.lines.filter((l) => l.sku !== sku)
              : state.lines.map((l) =>
                  l.sku === sku ? { ...l, quantity: Math.min(quantity, MAX_QUANTITY) } : l,
                ),
        })),

      remove: (sku) => set((state) => ({ lines: state.lines.filter((l) => l.sku !== sku) })),
      clear: () => set({ lines: [] }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      setHydrated: () => set({ hasHydrated: true }),
    }),
    {
      name: 'boogie-cart-v1',
      partialize: (state) => ({ lines: state.lines }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);

/**
 * Focus must return to the exact control that opened the drawer — the header
 * button, or the quick-add on the specific card that was clicked.
 *
 * Radix normally handles this via Dialog.Trigger, but the drawer is opened from
 * store state and mounted lazily, so there is no trigger element for it to
 * remember. We track it ourselves and hand it back in onCloseAutoFocus. Kept
 * outside the store deliberately: a DOM node has no business in serialisable state.
 */
let lastTrigger: HTMLElement | null = null;

export function rememberTrigger(element: HTMLElement | null): void {
  lastTrigger = element;
}

export function restoreTrigger(): void {
  lastTrigger?.focus();
  lastTrigger = null;
}

export function cartCount(lines: CartLineItem[]): number {
  return lines.reduce((n, l) => n + l.quantity, 0);
}

/** Subtotal in paise, resolved through the index. Never persisted. */
export function cartSubtotal(lines: CartLineItem[], index: CartIndex): number {
  return lines.reduce((total, line) => {
    const entry = index[line.sku];
    return entry ? total + entry.price * line.quantity : total;
  }, 0);
}

/**
 * Free-delivery threshold in paise.
 * TODO(ops): PRD §11 open decision 2 — delivery zones, cut-off times and the
 * real threshold are unconfirmed. While this is null the nudge does not render,
 * because an invented delivery promise is a promise we might not keep.
 */
export const FREE_DELIVERY_THRESHOLD: number | null = null;
