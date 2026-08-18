import 'server-only';

import { stripeProvider } from './stripe';
import type { PaymentProvider } from './types';

/**
 * Provider selection is one env var and one switch. Razorpay implements the
 * same interface for INR; add `./razorpay` here when PRD §11 decision 1 lands.
 */
export function getPaymentProvider(): PaymentProvider {
  const choice = process.env.PAYMENT_PROVIDER ?? 'stripe';
  switch (choice) {
    case 'razorpay':
      // return razorpayProvider;
      throw new Error('Razorpay adapter not implemented — see lib/payments/README');
    case 'stripe':
    default:
      return stripeProvider;
  }
}

export type { PaymentProvider, PaymentEvent, CheckoutLine } from './types';
export { PaymentNotConfiguredError } from './types';
