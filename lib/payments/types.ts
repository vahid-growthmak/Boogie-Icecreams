/** PRD §6.5. The launch provider is still an open decision, which is exactly why
 *  no provider type escapes this folder. */

export type CheckoutLine = { sku: string; quantity: number };

export type CheckoutSessionInput = {
  lines: CheckoutLine[];
  successUrl: string;
  cancelUrl: string;
};

export type PaymentEvent =
  | { type: 'payment.succeeded'; id: string; amount: number; email?: string }
  | { type: 'payment.failed'; id: string }
  | { type: 'ignored'; id: string };

export interface PaymentProvider {
  readonly name: 'stripe' | 'razorpay';
  createCheckoutSession(input: CheckoutSessionInput): Promise<{ url: string }>;
  verifyWebhook(req: Request): Promise<PaymentEvent>;
}

/** Thrown when a provider is asked to do something it cannot yet do. */
export class PaymentNotConfiguredError extends Error {
  constructor(provider: string) {
    super(`${provider} is not configured — set its keys in the environment`);
    this.name = 'PaymentNotConfiguredError';
  }
}
