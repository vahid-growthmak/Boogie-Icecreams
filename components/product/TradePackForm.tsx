'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { TradeEnquirySchema } from '@/lib/schema';
import { PARTNER_JOURNEYS } from '@/lib/site';

type FieldErrors = Partial<Record<string, string>>;

const INTERESTS = PARTNER_JOURNEYS.map((journey) => ({
  value: journey.href.split('/').at(-1) as string,
  label: journey.label,
}));

/**
 * Sitemap §2.5 — Trade pack download, behind a light gate: "phone + WhatsApp +
 * territory."
 *
 * Light means light. Four fields, one of them optional, and no email required —
 * the archetype this exists for is phone-first and abandons on a required email.
 * Client and server share one Zod schema so they cannot drift.
 *
 * The pack itself is not yet a file. Rather than link a download that 404s, a
 * successful submit says a human will send it — which is what would happen
 * anyway. Wire the real artifact in when it exists.
 */
export function TradePackForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = TradeEnquirySchema.safeParse(Object.fromEntries(new FormData(form)));

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
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
      if (!res.ok) return setStatus('failed');
      setStatus('sent');
      track('trade_enquiry_submit', { interest: parsed.data.interest });
      form.reset();
    } catch {
      setStatus('failed');
    }
  }

  const field = (name: string) =>
    cn(
      'w-full rounded-none border bg-paper px-4 py-3 text-body text-cocoa',
      errors[name] ? 'border-mulberry' : 'border-cocoa/25 focus:border-mulberry',
    );

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tp-name" className="eyebrow mb-2 block text-cocoa-60">
            Your name
          </label>
          <input
            id="tp-name"
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'tp-name-err' : undefined}
            className={field('name')}
          />
          {errors.name && (
            <p id="tp-name-err" className="mt-2 text-caption text-mulberry">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="tp-district" className="eyebrow mb-2 block text-cocoa-60">
            District or town
          </label>
          <input
            id="tp-district"
            name="district"
            aria-invalid={Boolean(errors.district)}
            aria-describedby={errors.district ? 'tp-district-err' : undefined}
            className={field('district')}
          />
          {errors.district && (
            <p id="tp-district-err" className="mt-2 text-caption text-mulberry">
              {errors.district}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="tp-phone" className="eyebrow mb-2 block text-cocoa-60">
            Phone
          </label>
          <input
            id="tp-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'tp-phone-err' : undefined}
            className={field('phone')}
          />
          {errors.phone && (
            <p id="tp-phone-err" className="mt-2 text-caption text-mulberry">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="tp-whatsapp" className="eyebrow mb-2 block text-cocoa-60">
            WhatsApp <span className="normal-case">(if different)</span>
          </label>
          <input id="tp-whatsapp" name="whatsapp" type="tel" className={field('whatsapp')} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="tp-interest" className="eyebrow mb-2 block text-cocoa-60">
            What are you interested in
          </label>
          <select
            id="tp-interest"
            name="interest"
            defaultValue="distributor"
            className={field('interest')}
          >
            {INTERESTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button type="submit" className="mt-8 w-full sm:w-auto" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Request the trade pack'}
      </Button>

      <p aria-live="polite" className="mt-4 text-caption text-cocoa-60">
        {status === 'sent' &&
          'Thanks — we will send the pack and come back to you on whether that territory is open.'}
        {status === 'failed' && "That didn't send. Call or WhatsApp us and we'll pick it up there."}
      </p>
    </form>
  );
}
