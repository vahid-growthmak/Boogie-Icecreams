'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { cn } from '@/lib/cn';

/**
 * The site's only scroll animation. Every section uses this; nobody writes a second.
 *
 * opacity 0→1, translateY 16px→0, 420ms, cubic-bezier(.22,1,.36,1),
 * staggered 60ms within a group, fired once at 20% intersection. PRD §4.6.
 *
 * Deliberately IntersectionObserver + CSS rather than a motion component: this
 * wraps nearly every section on the site, so putting an animation library in the
 * first-load graph for it costs ~40KB against a 130KB budget (PRD §7). The motion
 * package still owns the cart drawer, which is lazily loaded.
 *
 * Server output is VISIBLE. The hidden state is applied on mount, before paint,
 * so a visitor without JavaScript reads a complete page rather than a blank one.
 */

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export function Reveal({
  children,
  delayIndex = 0,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  /** Position within its group; multiplied by the 60ms stagger. */
  delayIndex?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed || shown) return;
    const node = ref.current;
    if (!node) return;

    // 20% intersection per PRD §4.6 — except for a block taller than the
    // viewport, where 20% of the element can never be on screen at once and the
    // content would stay hidden forever. Those fire as soon as they enter.
    const tallerThanViewport = node.getBoundingClientRect().height > window.innerHeight * 0.8;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: tallerThanViewport ? 0 : 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [armed, shown]);

  const hidden = armed && !shown;

  return (
    <Tag
      // @ts-expect-error — ref type narrows per tag; all three are HTMLElements.
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
        hidden ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100',
        className,
      )}
      style={hidden ? undefined : { transitionDelay: `${delayIndex * 60}ms` }}
    >
      {children}
    </Tag>
  );
}
