import { getVariantBySku } from '@/lib/catalog';
import { getPaymentProvider, PaymentNotConfiguredError } from '@/lib/payments';
import { CheckoutInputSchema } from '@/lib/schema';
import { siteUrl } from '@/lib/seo';

export const runtime = 'nodejs';

/**
 * Accepts SKUs and quantities. Re-reads every price from the catalog. A price
 * sent by the client is not read, and an unknown SKU is a 400 rather than a
 * fallback — this route is the single reason client prices can be ignored.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const parsed = CheckoutInputSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  for (const line of parsed.data.lines) {
    const found = getVariantBySku(line.sku);
    if (!found) {
      return Response.json({ error: 'Something in your cart is no longer available.' }, { status: 400 });
    }
    if (!found.variant.inStock) {
      return Response.json(
        { error: `${found.product.name} is sold out in ${found.variant.size}.` },
        { status: 409 },
      );
    }
    if (found.variant.tradeOnly) {
      return Response.json(
        { error: `${found.variant.size} is a trade size — send a trade enquiry instead.` },
        { status: 409 },
      );
    }
  }

  try {
    const provider = getPaymentProvider();
    const session = await provider.createCheckoutSession({
      lines: parsed.data.lines,
      successUrl: new URL('/?checkout=success', siteUrl()).toString(),
      cancelUrl: new URL('/?checkout=cancel', siteUrl()).toString(),
    });
    return Response.json({ url: session.url });
  } catch (error) {
    if (error instanceof PaymentNotConfiguredError) {
      // Expected until PRD §11 decision 1 lands and keys are set.
      return Response.json(
        { error: "Online checkout isn't switched on yet. Nothing was charged." },
        { status: 503 },
      );
    }
    console.error('checkout failed', error);
    return Response.json(
      { error: "Payment didn't start. Nothing was charged — try again." },
      { status: 500 },
    );
  }
}
