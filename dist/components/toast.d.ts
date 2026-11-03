import * as React from "react";
export type ToastVariant = "default" | "success" | "warning" | "destructive";
export interface ToastOptions {
    title: string;
    description?: string;
    variant?: ToastVariant;
    /** auto-dismiss ms; defaults to 5000 */
    duration?: number;
}
interface ToastContextValue {
    toast: (opts: ToastOptions) => void;
}
export declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export declare function useToast(): ToastContextValue;
export {};
