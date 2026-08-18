'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/cn';

/**
 * Transparent → paper with a gold hairline after 80px of scroll. PRD §5.1 row 1.
 *
 * This is the only client code in the header: the nav, wordmark and links are
 * server-rendered and passed in as children, so marking the scroll behaviour
 * 'use client' costs a few hundred bytes rather than the whole header.
 */
export function StickyHeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-colors duration-300',
        scrolled
          ? 'border-b border-brand-brown/12 bg-cream/95 backdrop-blur'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      {children}
    </header>
  );
}
