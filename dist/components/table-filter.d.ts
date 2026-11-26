import * as React from "react";
export interface FilterOption {
    value: string;
    label: React.ReactNode;
}
export interface FilterGroup {
    /** Stable key for this group (e.g. "status"). */
    id: string;
    /** Section heading (e.g. "Status"). */
    label: string;
    options: FilterOption[];
}
/** Selected values per group id: { status: ["active","pending"], plan: ["premium"] }. */
export type FilterSelection = Record<string, string[]>;
export interface TableFilterProps {
    groups: FilterGroup[];
    /** Controlled applied selection. */
    value: FilterSelection;
    /** Called with the new selection when the user applies or clears. */
    onChange: (next: FilterSelection) => void;
    /** Button label. Defaults to "Filters". */
    label?: string;
    className?: string;
}
/**
 * TableFilter — the "Filters" button + count + popover panel.
 *
 * @example
 * const [filters, setFilters] = React.useState<FilterSelection>({})
 * <TableFilter groups={groups} value={filters} onChange={setFilters} />
 */
export declare function TableFilter({ groups, value, onChange, label, className, }: TableFilterProps): React.JSX.Element;
export interface ActiveFilterChipsProps {
    groups: FilterGroup[];
    value: FilterSelection;
    onChange: (next: FilterSelection) => void;
    className?: string;
}
/**
 * ActiveFilterChips — removable chips for the currently applied filters. Render
 * above the table so active filters stay visible while the controls are tucked
 * inside the TableFilter popover.
 */
export declare function ActiveFilterChips({ groups, value, onChange, className, }: ActiveFilterChipsProps): React.JSX.Element | null;
