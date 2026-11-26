// ---------------------------------------------------------------------------
// TableFilter — one "Filters" button that holds every table filter in a single
// popover, instead of a row of separate dropdowns.
//
// Chosen by Sofia (2026-11-26, "Option 1") for data-dense tables (finance) that
// were sprouting too many standalone FilterSelect dropdowns. The button shows a
// count of active filters; the popover groups filters into labelled sections of
// checkboxes with Apply and Reset; and ActiveFilterChips renders the applied
// filters as removable chips above the table so they stay visible.
//
// Composes with FilterBar / TableToolbar / TableCard. Tokens over hardcoded hex.
// Built on the unified radix-ui Popover (same dep as the rest of the library).
// ---------------------------------------------------------------------------

import * as React from "react"
import { Popover } from "radix-ui"
import { Filter, Check, X } from "lucide-react"

import { cn } from "@/lib/utils"

export interface FilterOption {
  value: string
  label: React.ReactNode
}

export interface FilterGroup {
  /** Stable key for this group (e.g. "status"). */
  id: string
  /** Section heading (e.g. "Status"). */
  label: string
  options: FilterOption[]
}

/** Selected values per group id: { status: ["active","pending"], plan: ["premium"] }. */
export type FilterSelection = Record<string, string[]>

export interface TableFilterProps {
  groups: FilterGroup[]
  /** Controlled applied selection. */
  value: FilterSelection
  /** Called with the new selection when the user applies or clears. */
  onChange: (next: FilterSelection) => void
  /** Button label. Defaults to "Filters". */
  label?: string
  className?: string
}

function countSelected(sel: FilterSelection): number {
  return Object.values(sel).reduce((n, arr) => n + (arr?.length ?? 0), 0)
}

/**
 * TableFilter — the "Filters" button + count + popover panel.
 *
 * @example
 * const [filters, setFilters] = React.useState<FilterSelection>({})
 * <TableFilter groups={groups} value={filters} onChange={setFilters} />
 */
export function TableFilter({
  groups,
  value,
  onChange,
  label = "Filters",
  className,
}: TableFilterProps) {
  const [open, setOpen] = React.useState(false)
  // Draft lets the user toggle freely, then Apply commits (or Cancel discards).
  const [draft, setDraft] = React.useState<FilterSelection>(value)

  React.useEffect(() => {
    if (open) setDraft(value)
  }, [open, value])

  const activeCount = countSelected(value)

  const toggle = (groupId: string, optValue: string) => {
    setDraft((d) => {
      const current = d[groupId] ?? []
      const next = current.includes(optValue)
        ? current.filter((v) => v !== optValue)
        : [...current, optValue]
      return { ...d, [groupId]: next }
    })
  }

  const apply = () => {
    onChange(draft)
    setOpen(false)
  }
  const reset = () => {
    const cleared: FilterSelection = {}
    setDraft(cleared)
    onChange(cleared)
    setOpen(false)
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          data-slot="table-filter-trigger"
          aria-label={label}
          className={cn(
            "inline-flex h-8 items-center gap-2 rounded-lg border px-3 text-sm font-medium",
            "border-[var(--border-default,var(--border))] bg-[var(--card)]",
            "text-[var(--ink-primary,var(--foreground))]",
            "hover:bg-[var(--surface-alt,var(--muted))]",
            "aria-expanded:bg-[var(--surface-alt,var(--muted))]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
            className
          )}
        >
          <Filter className="size-4" aria-hidden />
          {label}
          {activeCount > 0 && (
            <span
              data-slot="table-filter-count"
              className="inline-grid min-w-[18px] place-items-center rounded-full px-[5px] text-[11px] font-bold leading-[18px] text-white"
              style={{ background: "var(--primary)", height: 18 }}
            >
              {activeCount}
            </span>
          )}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={6}
          className="z-[80] w-[300px] overflow-hidden rounded-xl border shadow-[var(--shadow-lg,0_16px_44px_rgba(36,45,56,.18))]"
          style={{ background: "var(--card)", borderColor: "var(--border-default)" }}
        >
          <div
            className="flex items-center justify-between px-3.5 py-3 text-sm font-bold"
            style={{ borderBottom: "1px solid var(--border-subtle, var(--border-default))" }}
          >
            {label}
            <button
              type="button"
              onClick={reset}
              className="text-xs font-semibold underline"
              style={{ color: "var(--ink-muted)" }}
            >
              Reset
            </button>
          </div>

          <div className="max-h-[360px] overflow-y-auto">
            {groups.map((group) => (
              <div
                key={group.id}
                className="px-3.5 py-3"
                style={{ borderBottom: "1px solid var(--border-subtle, var(--border-default))" }}
              >
                <div
                  className="mb-2 text-xs font-bold uppercase tracking-[0.03em]"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {group.label}
                </div>
                {group.options.map((opt) => {
                  const checked = (draft[group.id] ?? []).includes(opt.value)
                  return (
                    <label
                      key={opt.value}
                      className="flex cursor-pointer items-center gap-2 py-1 text-sm"
                      style={{ color: "var(--ink-primary)" }}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggle(group.id, opt.value)}
                      />
                      <span
                        aria-hidden
                        className="grid size-4 place-items-center rounded"
                        style={{
                          border: checked
                            ? "1.5px solid var(--primary)"
                            : "1.5px solid var(--border-strong, #cbd2dc)",
                          background: checked ? "var(--primary)" : "transparent",
                          color: "#fff",
                        }}
                      >
                        {checked && <Check className="size-3" />}
                      </span>
                      {opt.label}
                    </label>
                  )
                })}
              </div>
            ))}
          </div>

          <div className="flex gap-2 px-3.5 py-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-[34px] flex-1 rounded-lg text-sm font-bold"
              style={{
                background: "var(--accent)",
                color: "var(--primary)",
                border: "1px solid var(--border-default)",
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={apply}
              className="h-[34px] flex-1 rounded-lg text-sm font-bold text-white"
              style={{ background: "var(--primary)" }}
            >
              Apply
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

export interface ActiveFilterChipsProps {
  groups: FilterGroup[]
  value: FilterSelection
  onChange: (next: FilterSelection) => void
  className?: string
}

/**
 * ActiveFilterChips — removable chips for the currently applied filters. Render
 * above the table so active filters stay visible while the controls are tucked
 * inside the TableFilter popover.
 */
export function ActiveFilterChips({
  groups,
  value,
  onChange,
  className,
}: ActiveFilterChipsProps) {
  const labelFor = (
    groupId: string,
    optValue: string,
  ): { group: React.ReactNode; opt: React.ReactNode } => {
    const g = groups.find((x) => x.id === groupId)
    const o = g?.options.find((x) => x.value === optValue)
    return { group: g?.label ?? groupId, opt: o?.label ?? optValue }
  }

  const entries: Array<{ groupId: string; value: string }> = []
  for (const g of groups) {
    for (const v of value[g.id] ?? []) entries.push({ groupId: g.id, value: v })
  }
  if (entries.length === 0) return null

  const remove = (groupId: string, optValue: string) => {
    onChange({
      ...value,
      [groupId]: (value[groupId] ?? []).filter((v) => v !== optValue),
    })
  }
  const clearAll = () => onChange({})

  return (
    <div
      data-slot="active-filter-chips"
      className={cn("flex flex-wrap items-center gap-2", className)}
    >
      {entries.map(({ groupId, value: v }) => {
        const { group, opt } = labelFor(groupId, v)
        return (
          <span
            key={`${groupId}:${v}`}
            className="inline-flex items-center gap-1.5 rounded-full py-[3px] pl-2.5 pr-[6px] text-xs font-semibold"
            style={{
              color: "var(--primary)",
              background: "var(--accent)",
              border: "1px solid var(--border-default)",
            }}
          >
            {group}: {opt}
            <button
              type="button"
              aria-label={`Remove filter`}
              onClick={() => remove(groupId, v)}
              className="grid size-[15px] place-items-center rounded-full"
              style={{ background: "var(--card)", color: "var(--primary)" }}
            >
              <X className="size-3" />
            </button>
          </span>
        )
      })}
      <button
        type="button"
        onClick={clearAll}
        className="text-xs font-semibold underline"
        style={{ color: "var(--ink-muted)" }}
      >
        Clear all
      </button>
    </div>
  )
}
