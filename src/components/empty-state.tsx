import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  className?: string;
  /** Heading level for correct document outline. Defaults to h2. */
  as?: 'h2' | 'h3';
}

/**
 * EmptyState — fills a no-data region with a reason and a way forward (EmptyState.md).
 * Not an error; uses a heading (not role=alert). Icon is decorative (aria-hidden by caller).
 * Tokens only.
 */
export function EmptyState({
  title,
  description,
  icon,
  action,
  secondaryAction,
  className,
  as: Heading = 'h2',
}: EmptyStateProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center px-6 py-12 text-center', className)}
    >
      {icon && <div className="mb-3">{icon}</div>}
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
