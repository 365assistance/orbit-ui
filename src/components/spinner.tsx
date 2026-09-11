import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const SIZE = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' } as const;

interface SpinnerProps {
  size?: keyof typeof SIZE;
  label?: string;
  className?: string;
}

/**
 * Spinner — indeterminate loading indicator (LoadingStates.md).
 * Icon is aria-hidden; the label is exposed via sr-only text inside role="status".
 * Honours prefers-reduced-motion via motion-reduce:animate-none.
 */
export function Spinner({ size = 'md', label = 'Loading', className }: SpinnerProps) {
  return (
    <div role="status" className={cn('inline-flex items-center justify-center', className)}>
      <Loader2
        className={cn(SIZE[size], 'animate-spin motion-reduce:animate-none')}
        style={{ color: 'var(--primary)' }}
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
