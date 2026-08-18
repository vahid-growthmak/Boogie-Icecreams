'use client';

import { useRef } from 'react';

import { IconButton } from '@/components/ui/IconButton';
import { ArrowLeft, ArrowRight } from '@/components/ui/icons';

/**
 * A scroll-snap list, not a widget. Cards stay in tab order and in the document,
 * arrows scroll by one viewport of the strip, and left/right keys move between
 * cards when focus is inside. On lg it stops scrolling and becomes a 4-up grid.
 */
export function BestSellersCarousel({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  const listRef = useRef<HTMLUListElement>(null);

  function scrollBy(direction: 1 | -1) {
    const list = listRef.current;
    if (!list) return;
    list.scrollBy({ left: direction * list.clientWidth * 0.8, behavior: 'smooth' });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const focusables = listRef.current?.querySelectorAll<HTMLElement>('a[href]');
    if (!focusables?.length) return;
    const current = Array.from(focusables).indexOf(document.activeElement as HTMLElement);
    if (current === -1) return;
    e.preventDefault();
    const next = focusables[Math.min(Math.max(current + (e.key === 'ArrowRight' ? 1 : -1), 0), focusables.length - 1)];
    next?.focus();
    next?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }

  return (
    <>
      <div className="relative mb-10 flex items-center justify-center">
        <h2 className="text-h2">{heading}</h2>
        <div className="absolute right-0 hidden gap-2 sm:flex">
          <IconButton label="Previous flavours" onClick={() => scrollBy(-1)}>
            <ArrowLeft className="size-5" />
          </IconButton>
          <IconButton label="Next flavours" onClick={() => scrollBy(1)}>
            <ArrowRight className="size-5" />
          </IconButton>
        </div>
      </div>

      <ul
        ref={listRef}
        onKeyDown={onKeyDown}
        // Stays a scroll-snap strip at every width, 4-up on lg. It was a grid on
        // desktop, which left a ragged second row whenever the best-seller count
        // was not a multiple of four — and gave the arrows nothing to do.
        className="no-scrollbar -mx-6 flex list-none snap-x snap-mandatory gap-6 overflow-x-auto px-6 lg:mx-0 lg:px-0"
      >
        {children}
      </ul>
    </>
  );
}
