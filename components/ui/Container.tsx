import { cn } from '@/lib/cn';

/** Page width and gutters. 1280px max, 24px → 48px at lg. PRD §4.4. */
export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav' | 'main';
}) {
  return (
    <Tag className={cn('mx-auto w-full max-w-(--container-site) px-6 lg:px-12', className)}>
      {children}
    </Tag>
  );
}
