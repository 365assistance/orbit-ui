import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { type VariantProps } from "class-variance-authority";
export type ToastVariant = "info" | "success" | "warning" | "error";
export interface ToastOptions {
    variant?: ToastVariant;
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
    /** Auto-dismiss timer in ms. Ignored for `error` — those stay until dismissed. */
    duration?: number;
    dismissible?: boolean;
}
interface ToastRecord extends ToastOptions {
    id: string;
    open: boolean;
}
declare function dismiss(id: string): void;
/** Fire a toast from anywhere. Returns { id, dismiss }. */
export declare function toast(options: ToastOptions): {
    id: string;
    dismiss: () => void;
};
export declare function useToast(): {
    toasts: ToastRecord[];
    toast: typeof toast;
    dismiss: typeof dismiss;
};
declare const ToastViewport: React.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastViewportProps & React.RefAttributes<HTMLOListElement>, "ref"> & React.RefAttributes<HTMLOListElement>>;
declare const toastVariants: (props?: ({
    variant?: "info" | "success" | "warning" | "error" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const iconByVariant: {
    readonly info: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly success: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly warning: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly error: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
};
export interface ToastRootProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>, VariantProps<typeof toastVariants> {
}
declare const ToastRoot: React.ForwardRefExoticComponent<ToastRootProps & React.RefAttributes<HTMLLIElement>>;
declare const ToastIcon: React.FC<{
    variant: keyof typeof iconByVariant;
}>;
declare const ToastTitle: React.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastTitleProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ToastDescription: React.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastDescriptionProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const ToastAction: React.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastActionProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const ToastClose: React.ForwardRefExoticComponent<Omit<ToastPrimitive.ToastCloseProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export declare function Toaster(): React.JSX.Element;
/**
 * Back-compat convenience: a provider that just renders the Toaster alongside
 * children, so existing `<ToastProvider><App/></ToastProvider>` wiring keeps
 * working. The module-level `toast()` store is global, so this only needs to
 * mount the <Toaster/> once.
 */
export declare function ToastProvider({ children }: {
    children: React.ReactNode;
}): React.JSX.Element;
export { Toaster as OrbitToaster, ToastViewport, ToastRoot, ToastIcon, ToastTitle, ToastDescription, ToastAction, ToastClose, };
