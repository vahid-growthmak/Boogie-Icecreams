'use client';

import { useEffect, useRef } from 'react';

import { GoldPetal } from './GoldPetal';
import { cn } from '@/lib/cn';

/**
 * Petal at 0.15 scroll rate, desktop only, never on load. PRD §4.5.
 *
 * A rAF-throttled transform rather than a motion value — the hero is the LCP
 * area and this must not pull an animation library into the first-load bundle.
 * Below lg, or under reduced motion, the petal is simply static: the shape is
 * part of the design, the movement is not.
 */
export function PetalParallax({ className }: { className?: string }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!desktop.matches || reduced.matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      const rect = outer.getBoundingClientRect();
      // Progress through the viewport, 0 → 1, translated at 0.15 of scroll.
      const progress = 1 - (rect.top + rect.height) / (window.innerHeight + rect.height);
      inner.style.transform = `translate3d(0, ${(progress * 0.15 * rect.height).toFixed(1)}px, 0)`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    // Clipped, so a transform can never widen the page or create scroll.
    <div
      ref={outerRef}
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
    >
      <div ref={innerRef} className="will-change-transform">
        <GoldPetal className="static" />
      </div>
    </div>
  );
}
