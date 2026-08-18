import { TradeEnquirySchema } from '@/lib/schema';

export const runtime = 'nodejs';

/**
 * Same Zod schema the form uses on the client, so the two cannot drift.
 * Resend is wired behind RESEND_API_KEY; without it the enquiry is logged and
 * the caller still gets a truthful response.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 });
  }

  const parsed = TradeEnquirySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      {
        error: 'Some fields need another look',
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.TRADE_ENQUIRY_TO;

  if (!apiKey || !to) {
    console.info('trade enquiry (email not configured)', parsed.data);
    return Response.json({ ok: true, delivered: false });
  }

  const { name, business, businessType, email, phone, message } = parsed.data;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Boogie Ice Creams <trade@boogieicecreams.com>',
      to: [to],
      reply_to: email,
      subject: `Trade enquiry — ${business}`,
      text: [
        `Name: ${name}`,
        `Business: ${business} (${businessType})`,
        `Email: ${email}`,
        `Phone: ${phone || '—'}`,
        '',
        message,
      ].join('\n'),
    }),
  });

  if (!res.ok) {
    console.error('resend failed', res.status, await res.text());
    return Response.json({ error: "That didn't send." }, { status: 502 });
  }

  return Response.json({ ok: true, delivered: true });
}
