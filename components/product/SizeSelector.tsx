'use client';

import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { cn } from '@/lib/cn';
import type { Variant } from '@/lib/schema';

/**
 * Segmented control. Out-of-stock sizes are disabled with a visible reason,
 * never hidden — hiding a size makes it unfindable and unexplainable. PRD §5.3.
 */
export function SizeSelector({
  variants,
  value,
  onChange,
  describedById,
}: {
  variants: Variant[];
  value: string;
  onChange: (sku: string) => void;
  describedById?: string;
}) {
  return (
    <div>
      <p className="eyebrow mb-3 text-cocoa-60" id="size-label">
        Size
      </p>
      <ToggleGroup.Root
        type="single"
        value={value}
        onValueChange={(next) => next && onChange(next)}
        aria-labelledby="size-label"
        aria-describedby={describedById}
        className="flex flex-wrap gap-0 border border-cocoa/25"
      >
        {variants.map((variant) => (
          <ToggleGroup.Item
            key={variant.sku}
            value={variant.sku}
            disabled={!variant.inStock || variant.tradeOnly}
            className={cn(
              'eyebrow flex-1 border-r border-cocoa/25 px-6 py-4 transition-colors last:border-r-0',
              'data-[state=on]:bg-mulberry data-[state=on]:text-paper',
              'data-[state=off]:text-cocoa data-[state=off]:hover:text-mulberry',
              'disabled:cursor-not-allowed disabled:text-cocoa-60 disabled:line-through disabled:hover:text-cocoa-60',
            )}
          >
            {variant.size}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
}
