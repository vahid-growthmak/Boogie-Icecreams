'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { IconButton } from '@/components/ui/IconButton';
import { Menu } from '@/components/ui/icons';

/**
 * The trigger is a plain button; the Radix dialog behind it is code-split and
 * mounted on first open. The header is in the root layout, so anything imported
 * here lands in every route's first-load JS — and the menu panel is needed on
 * one breakpoint, after one tap. PRD §7.
 */
const MobileNavPanel = dynamic(
  () => import('./MobileNavPanel').then((m) => m.MobileNavPanel),
  { ssr: false },
);

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  return (
    <>
      <IconButton
        label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(true)}
      >
        <Menu className="size-5" />
      </IconButton>

      {mounted && <MobileNavPanel open={open} onOpenChange={setOpen} />}
    </>
  );
}
