import { ReactNode } from 'react';
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
export declare function ErrorState({ title, description, icon, action, secondaryAction, live, variant, className, as: Heading, }: ErrorStateProps): import("react").JSX.Element;
export {};
