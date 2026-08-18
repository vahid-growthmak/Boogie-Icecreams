'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';

import { Chevron } from '@/components/ui/icons';
import { cn } from '@/lib/cn';
import { PARTNER_JOURNEYS } from '@/lib/site';

/**
 * The five-way partner router, sitemap §1.1: "Distributor listed first and
 * visually weighted in the dropdown."
 *
 * Opens on hover for pointers and on click/Enter for everyone else, because a
 * hover-only menu is unreachable by keyboard and by touch. Escape closes and
 * returns focus to the trigger; a click outside closes. The links are real
 * anchors in the document, so the menu degrades to a plain list without JS.
 */
export function PartnerMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className={cn('relative', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 font-round text-body text-brand-brown/85 transition-colors hover:text-berry"
      >
        Partner With Us
        <Chevron className={cn('size-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      <div
        id={menuId}
        // Kept in the DOM and hidden with visibility so the links stay
        // crawlable; the sitemap counts this dropdown as the site's primary
        // commercial surface and it must not be JS-gated for search.
        className={cn(
          'absolute top-full left-1/2 z-50 w-84 -translate-x-1/2 pt-4 transition-opacity duration-200',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      >
        <ul className="list-none rounded-card border border-brand-brown/10 bg-cream p-2 shadow-[0_18px_50px_-24px_rgba(74,34,20,0.45)]">
          {PARTNER_JOURNEYS.map((journey) => (
            <li key={journey.href}>
              <Link
                href={journey.href}
                tabIndex={open ? undefined : -1}
                onClick={() => setOpen(false)}
                className={cn(
                  'block rounded-[1.25rem] px-4 py-3 transition-colors hover:bg-tint-1',
                  journey.weighted && 'bg-tint-2',
                )}
              >
                <span
                  className={cn(
                    'block font-round',
                    journey.weighted ? 'text-h3 text-brand-brown' : 'text-body text-brand-brown',
                  )}
                >
                  {journey.label}
                </span>
                <span className="mt-0.5 block text-caption text-brand-brown-soft">{journey.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
