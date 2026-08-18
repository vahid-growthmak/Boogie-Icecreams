import 'server-only';

import { getVariantBySku } from '@/lib/catalog';

import {
  PaymentNotConfiguredError,
  type PaymentEvent,
  type PaymentProvider,
  type CheckoutSessionInput,
} from './types';

/**
 * Stripe Checkout adapter.
 *
 * The Stripe SDK is deliberately not a dependency yet — PRD §11 open decision 1
 * has not been made, and installing both SDKs to pick one later is how a 130KB
 * budget dies. The line-item construction below is the part that matters and is
 * provider-shaped: prices are read from the catalog by SKU, never from the
 * request body. Swap the marked block for `stripe.checkout.sessions.create`
 * when the decision lands.
 */

function buildLineItems(input: CheckoutSessionInput) {
  return input.lines.map((line) => {
    const found = getVariantBySku(line.sku);
    // The route validates first; this is the second gate, not the first.
    if (!found) throw new Error(`Unknown SKU at checkout: ${line.sku}`);

    const { product, variant } = found;
    return {
      quantity: line.quantity,
      price_data: {
        currency: 'inr',
        // Server-side price. The client's number, if it sent one, was ignored.
        unit_amount: variant.price,
        product_data: {
          name: `${product.name} — ${variant.size}`,
          metadata: { sku: variant.sku, slug: product.slug },
        },
      },
    };
  });
}

export const stripeProvider: PaymentProvider = {
  name: 'stripe',

  async createCheckoutSession(input) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new PaymentNotConfiguredError('stripe');

    const lineItems = buildLineItems(input);

    // --- swap this block for the Stripe SDK call ---------------------------
    // const stripe = new Stripe(key);
    // const session = await stripe.checkout.sessions.create({
    //   mode: 'payment',
    //   line_items: lineItems,
    //   success_url: input.successUrl,
    //   cancel_url: input.cancelUrl,
    // });
    // return { url: session.url! };
    void lineItems;
    throw new PaymentNotConfiguredError('stripe');
    // -----------------------------------------------------------------------
  },

  async verifyWebhook(req: Request): Promise<PaymentEvent> {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) throw new PaymentNotConfiguredError('stripe');

    // Signature is verified against the RAW body, before anything is parsed.
    const signature = req.headers.get('stripe-signature');
    if (!signature) throw new Error('Missing signature');
    const raw = await req.text();
    void raw;

    // const event = stripe.webhooks.constructEvent(raw, signature, secret);
    throw new PaymentNotConfiguredError('stripe');
  },
};
