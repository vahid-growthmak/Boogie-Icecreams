---
name: boogie-cart-and-checkout
description: Cart store shape, drawer behaviour, persistence, and provider-agnostic hosted checkout for Boogie Ice Creams. Use when touching the Zustand cart store, CartDrawer, CartLine, CartSummary, add-to-cart or quick-add, the delivery-threshold nudge, /api/checkout, payment webhooks, or the Stripe/Razorpay adapters. Triggers on "add to cart", "cart store", "cart drawer", "quantity stepper", "subtotal", "free delivery threshold", "checkout", "Stripe", "Razorpay", "payment provider", "webhook", "order confirmation", "persist cart", "localStorage".
---

# Cart and checkout

The cart is a **slide-over drawer, not a page**, and checkout is a **hosted redirect**.
That is how the site stays a real store on three templates.

## Store shape — SKUs only

`lib/cart.ts`, Zustand with `persist` to `localStorage` under `boogie-cart-v1`.

```ts
type CartLine = { sku: string; quantity: number };   // that is the whole line

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  add(sku: string, quantity?: number): void;
  setQuantity(sku: string, quantity: number): void;
  remove(sku: string): void;
  clear(): void;
  open(): void;
  close(): void;
};
```

**The store holds SKUs and quantities. Nothing else.** No names, no prices, no images,
no totals. Everything displayable is resolved from the catalog at render time, and
every price is resolved again on the server at checkout.

Why: a persisted price is a stale price and a client-owned price is a forged price.
Stored prices are how storefronts get charged ₹1 for a ₹450 tub.

- `add()` on an existing SKU increments, it does not duplicate the line.
- `setQuantity(sku, 0)` removes. Clamp to `1..99` otherwise.
- Adding an unknown SKU is a no-op plus a console error in dev — it means a data bug.

## Hydration

`persist` rehydrates after first paint, so a naive header badge renders `0` then jumps.
Both of these are required:

1. The cart count badge renders `null` until `useHydrated()` is true, then the number.
   Never render `0` as a placeholder.
2. The drawer's empty state renders only after hydration, so a returning customer never
   sees "Your cart is empty" flash over three tubs.

`skipHydration` is not used; a `hasHydrated` flag set in `onRehydrateStorage` is.

## Drawer behaviour — `components/cart/CartDrawer.tsx`

Radix `Dialog`, right slide-over, `420px` desktop / full-width mobile.

- Focus-trapped, `aria-modal`, labelled `Your cart`.
- `Esc` closes; focus returns to the trigger that opened it — the header cart button,
  or the quick-add button on the card that was clicked.
- Body scroll locked while open. Drawer content scrolls; the summary is pinned.
- Slides in over `320ms` with the reveal easing; collapses to instant under
  `prefers-reduced-motion` (see `boogie-motion`).

Contents: line items with thumbnail, name, size, quantity stepper, remove button
(`Remove <name>, <size>` as its accessible name). Then subtotal, the delivery-threshold
nudge, `CHECKOUT` primary and `Continue shopping` ghost. Empty state links to `/products`.

**Delivery nudge** — "₹300 more for free delivery". The threshold is one constant in
`lib/cart.ts`, formatted through `lib/format.ts`. It disappears, not turns green, once
met. Until delivery zones and the threshold are confirmed (PRD §11.2) the constant is
marked `TODO(copy):` and the nudge does not render.

## Add to cart

Both the PDP button and the grid quick-add do the same three things, in this order:

1. `add(sku, quantity)` — optimistic, no await, no spinner
2. `open()` — the drawer opening *is* the confirmation; no toast
3. fire `add_to_cart` with `item_id`, `size`, `quantity`, `value` (see PRD §8)

Quick-add uses `defaultVariant(product)` — 500ml — resolved on the server and passed to
the card as a plain `sku` string. The card does not import the catalog.

## Checkout — `/api/checkout`

```ts
// lib/payments/types.ts
export interface PaymentProvider {
  createCheckoutSession(input: {
    lines: { sku: string; quantity: number }[];
    successUrl: string;
    cancelUrl: string;
  }): Promise<{ url: string }>;
  verifyWebhook(req: Request): Promise<PaymentEvent>;
}
```

The route:

1. Validates the body with Zod — an array of `{ sku, quantity }`, nothing else accepted.
2. **Re-reads every price from the catalog by SKU** via `getVariantBySku`. A client-sent
   price field is not read; an unknown SKU is a 400, never a fallback.
3. Rejects out-of-stock and `tradeOnly` variants with a message the drawer can render.
4. Builds the session through the `PaymentProvider` resolved from `PAYMENT_PROVIDER`.
5. Returns `{ url }`; the client does `window.location.assign(url)`.
6. `successUrl` is `/?checkout=success`, `cancelUrl` is `/?checkout=cancel` — Home
   renders a confirmation panel from the searchParam. Neither is a route.

Ship `lib/payments/stripe.ts` first; `lib/payments/razorpay.ts` implements the same
interface for INR. The launch provider is still open (PRD §11.1) — which is exactly why
no provider type escapes `lib/payments/`.

## Webhooks

- Verify the signature against the raw body **before parsing anything**.
- Idempotent by event id; a replayed event does no second send.
- On `payment.succeeded`: send confirmation via Resend, fire `purchase` with
  `transaction_id` and `value`.
- Clear the cart on the success redirect, not from the webhook — the browser owns
  `localStorage`.

## Never

- Store a price, a total or a currency amount in `localStorage`
- Compute a total in the browser and send it to the server
- Use floats for money anywhere — integers in paise, formatted once in `lib/format.ts`
- Put a cart page at `/cart`; the drawer is the cart
- Reference `STRIPE_SECRET_KEY` in any file a client component can import
