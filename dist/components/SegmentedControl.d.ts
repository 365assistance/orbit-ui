import type { CSSProperties, ReactNode } from 'react';
export interface SegmentOption<T extends string> {
    value: T;
    label: ReactNode;
    /** optional aria-label / title when the label is a symbol (e.g. "#", "%") */
    srLabel?: string;
}
export interface SegmentedControlProps<T extends string> {
    value: T;
    onChange: (value: T) => void;
    options: SegmentOption<T>[];
    /** compact = symbol toggles (#/%); default = text tabs */
    size?: 'sm' | 'md';
    ariaLabel?: string;
    className?: string;
    style?: CSSProperties;
    /** When true the control is non-interactive and dimmed. */
    disabled?: boolean;
}
export declare function SegmentedControl<T extends string>({ value, onChange, options, size, ariaLabel, className, style, disabled, }: SegmentedControlProps<T>): import("react").JSX.Element;
