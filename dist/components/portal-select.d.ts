export interface PortalSelectOption {
    value: string;
    label: string;
}
export interface PortalSelectProps {
    value: string;
    options: PortalSelectOption[];
    onChange: (v: string) => void;
    'aria-label'?: string;
    minWidth?: number;
    disabled?: boolean;
    fullWidth?: boolean;
    placeholder?: string;
}
export declare function PortalSelect({ value, options, onChange, minWidth, disabled, fullWidth, placeholder, ...rest }: PortalSelectProps): import("react").JSX.Element;
