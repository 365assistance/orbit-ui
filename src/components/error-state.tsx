import { ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  /** When the error appears dynamically, set live to announce via role="alert". */
  live?: boolean;
  variant?: 'inline' | 'page';
  className?: string;
  as?: 'h2' | 'h3';
}

/**
 * ErrorState — explains a failure and always offers a recovery path (ErrorState.md).
 * Error is conveyed by icon + text + colour (--orbit-error), never colour alone.
 * role="alert" only when live. Tokens only.
 */
export function ErrorState({
  title,
  description,
  icon,
  action,
  secondaryAction,
  live = false,
  variant = 'inline',
  className,
  as: Heading = 'h2',
}: ErrorStateProps) {
  return (
    <div
      role={live ? 'alert' : undefined}
      aria-live={live ? 'assertive' : undefined}
      className={cn(
        'flex flex-col items-center justify-center text-center',
        variant === 'page' ? 'px-6 py-16' : 'px-6 py-10',
        className,
      )}
    >
      <div className="mb-3" aria-hidden>
        {icon ?? (
          <AlertTriangle
            className={variant === 'page' ? 'h-10 w-10' : 'h-6 w-6'}
            style={{ color: 'var(--orbit-error)' }}
          />
        )}
      </div>
      <Heading className="text-base font-bold" style={{ color: 'var(--foreground)' }}>
        {title}
      </Heading>
      {description && (
        <p className="mt-1 max-w-sm text-sm" style={{ color: 'var(--muted-foreground)' }}>
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="mt-4 flex items-center gap-2">
          {secondaryAction}
          {action}
        </div>
      )}
    </div>
  );
}
