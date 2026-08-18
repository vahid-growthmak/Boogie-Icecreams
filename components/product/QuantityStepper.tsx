'use client';

import { IconButton } from '@/components/ui/IconButton';
import { Minus, Plus } from '@/components/ui/icons';
import { cn } from '@/lib/cn';

/**
 * Two buttons and a real number input with a label. Decrease is disabled at 1
 * rather than silently clamping, so the boundary is visible.
 */
export function QuantityStepper({
  value,
  onChange,
  label,
  size = 'md',
  max = 99,
}: {
  value: number;
  onChange: (next: number) => void;
  label: string;
  size?: 'sm' | 'md';
  max?: number;
}) {
  const dimension = size === 'sm' ? 'size-8' : 'size-11';

  return (
    <div className="flex items-center gap-1">
      <IconButton
        label="Decrease quantity"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        className={dimension}
      >
        <Minus className="size-4" />
      </IconButton>

      <label className="sr-only" htmlFor={`qty-${label}`}>
        {label}
      </label>
      <input
        id={`qty-${label}`}
        type="number"
        inputMode="numeric"
        min={1}
        max={max}
        value={value}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (Number.isFinite(next)) onChange(Math.min(Math.max(next, 1), max));
        }}
        className={cn(
          'w-12 rounded-none border-none bg-transparent text-center text-body text-cocoa',
          '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none',
        )}
      />

      <IconButton
        label="Increase quantity"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        className={dimension}
      >
        <Plus className="size-4" />
      </IconButton>
    </div>
  );
}
