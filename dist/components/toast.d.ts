import * as React from "react";
type ToastVariant = "default" | "success" | "warning" | "destructive";
export interface ToastOptions {
    title: string;
    description?: string;
    variant?: ToastVariant;
    /** Auto-dismiss delay in ms. Default 5000. */
    duration?: number;
}
interface ToastContextValue {
    toast: (opts: ToastOptions) => string;
    dismiss: (id: string) => void;
}
/**
 * useToast — returns `{ toast, dismiss }`. `toast(opts)` queues a notification
 * and returns its id; `dismiss(id)` removes it early.
 */
export declare function useToast(): ToastContextValue;
/**
 * ToastProvider — wrap your app. Renders a fixed bottom-right viewport and
 * provides the toast() / dismiss() API via context.
 */
export declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export {};
