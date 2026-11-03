import * as React from "react";
/**
 * FilterSelect — the compact pill dropdown used in FilterBar (e.g. "All Status",
 * "All Plans"). A styled Radix DropdownMenu trigger + on-brand menu. Same height
 * (h-8) as the default Button so it lines up in the toolbar.
 *
 *   <FilterSelect
 *     value={status}
 *     onChange={setStatus}
 *     options={[{value:'all',label:'All Status'},{value:'active',label:'Active'}]}
 *     ariaLabel="Filter by status"
 *   />
 */
export interface FilterSelectOption {
    value: string;
    label: string;
}
export interface FilterSelectProps {
    value: string;
    options: FilterSelectOption[];
    onChange: (value: string) => void;
    ariaLabel?: string;
    className?: string;
}
export declare function FilterSelect({ value, options, onChange, ariaLabel, className, }: FilterSelectProps): React.JSX.Element;
