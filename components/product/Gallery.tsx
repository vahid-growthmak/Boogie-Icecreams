'use client';

import Image from 'next/image';
import { useState } from 'react';

import { GoldPetal } from '@/components/ui/GoldPetal';
import { cn } from '@/lib/cn';
import type { ProductImage } from '@/lib/schema';

/**
 * Primary image on the gold petal (petal use 3 of 3), thumbnails below.
 * Click swaps; left/right arrows move between thumbnails.
 */
export function Gallery({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = e.key === 'ArrowRight' ? active + 1 : active - 1;
    const clamped = (next + images.length) % images.length;
    setActive(clamped);
    document.getElementById(`thumb-${clamped}`)?.focus();
  }

  if (!current) return null;

  return (
    <div>
      <div className="relative isolate flex aspect-square items-center justify-center overflow-hidden">
        <GoldPetal className="top-1/2 left-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2" />
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="(min-width:1024px) 55vw, 92vw"
          priority
          className="object-contain p-10"
        />
      </div>

      {images.length > 1 && (
        <div
          className="no-scrollbar -mx-4 mt-6 flex snap-x gap-3 overflow-x-auto px-4 xs:mx-0 xs:gap-4 xs:px-0"
          role="group"
          aria-label={`${productName} images`}
          onKeyDown={onKeyDown}
        >
          {images.map((image, i) => (
            <button
              key={image.src}
              id={`thumb-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={`Show image ${i + 1} of ${images.length}: ${image.alt}`}
              className={cn(
                'relative aspect-4/5 w-20 shrink-0 snap-start overflow-hidden rounded-[1rem] border bg-white transition-colors xs:w-24',
                i === active ? 'border-mulberry' : 'border-cocoa/15 hover:border-cocoa/40',
              )}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="96px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
