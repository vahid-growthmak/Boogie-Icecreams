'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';

import { IconButton } from '@/components/ui/IconButton';
import { Close } from '@/components/ui/icons';
import { Wordmark } from '@/components/ui/Wordmark';

const LINKS = [
  { href: '/#story', label: 'Our story' },
  { href: '/products', label: 'Our products' },
  { href: '/#trade', label: 'Trade' },
  { href: '/#contact', label: 'Contact' },
];

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
            <Wordmark className="text-[1.75rem]" />
            <Dialog.Close asChild>
              <IconButton label="Close menu">
                <Close className="size-5" />
              </IconButton>
            </Dialog.Close>
          </div>

          <nav className="px-6 py-8">
            <ul className="flex list-none flex-col gap-6">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => onOpenChange(false)}
                    className="font-display text-h2 text-mulberry"
                  >
                    {link.label}
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
