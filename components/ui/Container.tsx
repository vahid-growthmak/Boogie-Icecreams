import { cn } from '@/lib/cn';

/**
 * Page width and gutters.
 *
 * The gutter steps rather than staying at 24px everywhere: 16px on a 320–375
 * phone, where 24px each side eats 15% of the screen; 20px from 390; 24px on
 * tablet; 48px on desktop. PRD §4.4 set the desktop figures, which are unchanged.
 */
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
    <Tag className={cn('mx-auto w-full max-w-(--container-site) px-4 xs:px-5 md:px-6 lg:px-12', className)}>
      {children}
    </Tag>
  );
}
