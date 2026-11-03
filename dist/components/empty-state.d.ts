import { ReactNode } from 'react';
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
export declare function EmptyState({ title, description, icon, action, secondaryAction, className, as: Heading, }: EmptyStateProps): import("react").JSX.Element;
export {};
