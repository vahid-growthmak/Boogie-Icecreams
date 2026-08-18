'use client';

import { usePathname } from 'next/navigation';

import { Phone, WhatsApp } from '@/components/ui/icons';
import { CONTACT } from '@/lib/site';

/**
 * Sitemap §1.12 — Pinned WhatsApp + Call.
 *
 * "Floating conversion path for the archetype who will not complete a form.
 * Pre-filled with page context so the sales conversation opens already qualified
 * rather than at zero."
 *
 * The page context is the pathname, turned into a readable opening line. A
 * salesperson picking up the thread knows which surface the enquiry came off.
 *
 * Renders nothing until a number is confirmed. The sitemap requires a single
 * phone number sitewide and records that the current estate publishes two
 * different ones; neither is in the supplied pack. Set CONTACT.phone /
 * CONTACT.whatsapp in lib/site.ts and the rail appears.
 */
export function PinnedContact() {
  const pathname = usePathname();
  const { phone, whatsapp } = CONTACT;

  if (!phone && !whatsapp) return null;

  const context = pathname === '/' ? 'the homepage' : `the ${pathname.replace(/^\//, '')} page`;
  const message = encodeURIComponent(
    `Hello Boogies — I'm enquiring from ${context} on your website.`,
  );

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3 lg:right-6 lg:bottom-6">
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp.replace(/\D/g, '')}?text=${message}`}
          rel="noreferrer noopener"
          target="_blank"
          aria-label="Message Boogies on WhatsApp"
          className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition-transform hover:scale-105"
        >
          <WhatsApp className="size-7" />
        </a>
      )}
      {phone && (
        <a
          href={`tel:${phone.replace(/\s/g, '')}`}
          aria-label={`Call Boogies on ${phone}`}
          className="flex size-14 items-center justify-center rounded-full bg-brand-brown text-paper shadow-[0_10px_30px_-10px_rgba(74,34,20,0.6)] transition-transform hover:scale-105"
        >
          <Phone className="size-6" />
        </a>
      )}
    </div>
  );
}
