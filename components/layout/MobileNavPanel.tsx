'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';

import { IconButton } from '@/components/ui/IconButton';
import { Close } from '@/components/ui/icons';
import { Logo } from '@/components/ui/Logo';
import { NAV, PARTNER_JOURNEYS } from '@/lib/site';

/** Same trap-and-return rules as the cart drawer. Radix handles both. */
export function MobileNavPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink-plum/40" />
        <Dialog.Content
          id="mobile-nav"
          className="fixed inset-y-0 left-0 z-50 flex w-full max-w-sm flex-col bg-paper"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div className="flex items-center justify-between border-b border-cocoa/15 px-6 py-5">
            <Logo height={44} alt="Boogies Ice Cream" className="h-11" />
            <Dialog.Close asChild>
              <IconButton label="Close menu">
                <Close className="size-5" />
              </IconButton>
            </Dialog.Close>
          </div>

          <nav className="px-6 py-8">
            <ul className="flex list-none flex-col gap-5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => onOpenChange(false)}
                    className="font-display text-h2 text-mulberry"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* The dropdown has no hover on touch, so the five journeys are
                listed outright rather than hidden behind the parent slot. */}
            <p className="eyebrow mt-10 text-cocoa-60">Partner with Boogies</p>
            <ul className="mt-4 flex list-none flex-col gap-4 border-l border-gold/50 pl-5">
              {PARTNER_JOURNEYS.map((journey) => (
                <li key={journey.href}>
                  <Link
                    href={journey.href}
                    onClick={() => onOpenChange(false)}
                    className="text-body text-cocoa hover:text-mulberry"
                  >
                    {journey.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
