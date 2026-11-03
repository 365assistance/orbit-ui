import * as React from "react";
/**
 * FilterBar — the standard list toolbar: a search field on the left and a
 * cluster of filters/actions on the right, wrapped in a bordered panel.
 *
 * Used across admin lists (Tenants, Members, etc.) so the search + filter row
 * looks identical everywhere. Compose it with SearchInput + FilterSelect +
 * Button:
 *
 *   <FilterBar
 *     search={<SearchInput value={q} onChange={setQ} placeholder="Search…" />}
 *     actions={<>
 *       <FilterSelect ... />
 *       <Button variant="outline"><Download/> Export</Button>
 *       <Button variant="outline" size="icon"><RefreshCw/></Button>
 *     </>}
 *   />
 */
export interface FilterBarProps {
    /** Left slot — typically a <SearchInput/>. */
    search?: React.ReactNode;
    /** Right slot — filters, export, refresh, etc. */
    actions?: React.ReactNode;
    className?: string;
}
export declare function FilterBar({ search, actions, className }: FilterBarProps): React.JSX.Element;
