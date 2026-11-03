declare const SIZE: {
    readonly sm: "h-4 w-4";
    readonly md: "h-5 w-5";
    readonly lg: "h-6 w-6";
};
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
export declare function Spinner({ size, label, className }: SpinnerProps): import("react").JSX.Element;
export {};
