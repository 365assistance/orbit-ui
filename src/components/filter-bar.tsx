import * as React from "react"
import { cn } from "@/lib/utils"

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
  search?: React.ReactNode
  /** Right slot — filters, export, refresh, etc. */
  actions?: React.ReactNode
  className?: string
}

export function FilterBar({ search, actions, className }: FilterBarProps) {
  return (
    <div
      data-slot="filter-bar"
      className={cn(
        "rounded-xl border p-4",
        "border-[var(--border-default,var(--border))] bg-[var(--card)]",
        className
      )}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {search != null && (
          <div className="flex flex-1 items-center gap-2">{search}</div>
        )}
        {actions != null && (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        )}
      </div>
    </div>
  )
}
