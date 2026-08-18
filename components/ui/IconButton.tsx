import { cn } from '@/lib/cn';

/**
 * One of only two round things on the site — icon buttons and carousel dots.
 * Always requires an accessible name, because it never contains text.
 */
export function IconButton({
  label,
  children,
  className,
  tone = 'default',
  ...props
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  tone?: 'default' | 'inverse';
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-full border transition-colors',
        tone === 'inverse'
          ? 'border-paper/40 text-paper hover:border-gold hover:text-gold'
          : 'border-cocoa/25 text-cocoa hover:border-mulberry hover:text-mulberry',
        'disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-cocoa/25 disabled:hover:text-cocoa',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
