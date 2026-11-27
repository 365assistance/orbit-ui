import * as React from "react";
export interface MultiSelectOption {
    value: string;
    label: string;
    /** Optional secondary line shown under the label in the dropdown. */
    description?: string;
}
export interface MultiSelectProps {
    /** Currently selected values. */
    value: string[];
    options: MultiSelectOption[];
    onChange: (next: string[]) => void;
    placeholder?: string;
    /** Placeholder for the inline search input. Defaults to "Search…". */
    searchPlaceholder?: string;
    disabled?: boolean;
    "aria-label"?: string;
    className?: string;
}
export declare function MultiSelect({ value, options, onChange, placeholder, searchPlaceholder, disabled, className, ...rest }: MultiSelectProps): React.JSX.Element;
