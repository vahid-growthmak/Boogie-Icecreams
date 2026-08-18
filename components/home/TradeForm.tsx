'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { TradeEnquirySchema } from '@/lib/schema';

const BUSINESS_TYPES = [
  { value: 'deli', label: 'Deli or farm shop' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'other', label: 'Something else' },
] as const;

type FieldErrors = Partial<Record<string, string>>;

/**
 * 6/6, form right. Client and server validate with the same Zod schema, so the
 * two can't drift. Errors are announced, tied to their field, and say what to do.
 */
export function TradeForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const parsed = TradeEnquirySchema.safeParse(data);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        next[key] ??= issue.message;
      }
      setErrors(next);
      // Focus the first invalid field rather than leaving the user to hunt.
      const firstKey = Object.keys(next)[0];
      if (firstKey) form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus('sending');

    try {
      const res = await fetch('/api/trade-enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        setStatus('failed');
        return;
      }
      setStatus('sent');
      track('trade_enquiry_submit', { business_type: parsed.data.businessType });
      form.reset();
    } catch {
      setStatus('failed');
    }
  }

  const fieldClass = (name: string) =>
    cn(
      'w-full rounded-none border bg-transparent px-4 py-3 text-body text-cocoa',
      errors[name] ? 'border-mulberry' : 'border-cocoa/25 focus:border-mulberry',
    );

  return (
    <section id="trade" className="section-y scroll-mt-24 bg-sand/60">
      <Container>
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow text-cocoa-60">Trade</p>
            <h2 className="mt-4 text-h2">Stock Boogie</h2>
            <p className="mt-6 text-body-lead text-mulberry">
              2.4L and 5L tubs go out to delis, farm shops, hotels and restaurants.
            </p>
            <p className="mt-5 text-body text-cocoa">
              Tell us what you serve and roughly how much of it, and we will come back with sizes,
              lead times and what we can deliver to your area. There is no minimum order for a
              first delivery.
            </p>

            <div className="relative mt-10 hidden aspect-6/5 lg:block">
              <Image
                src="/images/editorial/trade.webp"
                alt="Catering tubs stacked in a cold store ready for delivery"
                fill
                sizes="50vw"
                className="object-cover"
              />
            </div>
          </div>

          <form onSubmit={onSubmit} noValidate className="lg:col-span-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label htmlFor="name" className="eyebrow mb-2 block text-cocoa-60">
                  Your name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={fieldClass('name')}
                />
                {errors.name && (
                  <p id="name-error" className="mt-2 text-caption text-mulberry">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="business" className="eyebrow mb-2 block text-cocoa-60">
                  Business
                </label>
                <input
                  id="business"
                  name="business"
                  type="text"
                  autoComplete="organization"
                  aria-invalid={Boolean(errors.business)}
                  aria-describedby={errors.business ? 'business-error' : undefined}
                  className={fieldClass('business')}
                />
                {errors.business && (
                  <p id="business-error" className="mt-2 text-caption text-mulberry">
                    {errors.business}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="businessType" className="eyebrow mb-2 block text-cocoa-60">
                  What kind of business
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  defaultValue="deli"
                  className={fieldClass('businessType')}
                >
                  {BUSINESS_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="email" className="eyebrow mb-2 block text-cocoa-60">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={fieldClass('email')}
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 text-caption text-mulberry">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="sm:col-span-1">
                <label htmlFor="phone" className="eyebrow mb-2 block text-cocoa-60">
                  Phone <span className="normal-case">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className={fieldClass('phone')}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="eyebrow mb-2 block text-cocoa-60">
                  What are you looking for
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={fieldClass('message')}
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-caption text-mulberry">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="mt-8 w-full sm:w-auto" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send enquiry'}
            </Button>

            <p aria-live="polite" className="mt-4 text-caption text-cocoa-60">
              {status === 'sent' && 'Thanks — we will come back to you within two working days.'}
              {status === 'failed' &&
                "That didn't send. Email us and we'll pick it up from there."}
            </p>
          </form>
        </div>
      </Container>
    </section>
  );
}
