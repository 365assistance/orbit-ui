import * as React from "react"
import { DropdownMenu } from "radix-ui"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

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
  value: string
  label: string
}

export interface FilterSelectProps {
  value: string
  options: FilterSelectOption[]
  onChange: (value: string) => void
  ariaLabel?: string
  className?: string
}

export function FilterSelect({
  value,
  options,
  onChange,
  ariaLabel,
  className,
}: FilterSelectProps) {
  const current = options.find((o) => o.value === value)

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          data-slot="filter-select-trigger"
          className={cn(
            "inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-sm font-medium",
            "border-[var(--border-default,var(--border))] bg-[var(--card)]",
            "text-[var(--ink-primary,var(--foreground))]",
            "hover:bg-[var(--surface-alt,var(--muted))]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]",
            "aria-expanded:bg-[var(--surface-alt,var(--muted))]",
            className
          )}
        >
          {current?.label ?? options[0]?.label ?? ""}
          <ChevronDown
            className="size-4 text-[var(--ink-muted,var(--muted-foreground))]"
            aria-hidden
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={4}
          className={cn(
            "z-50 min-w-[10rem] rounded-xl border p-1 shadow-[var(--shadow-md,0_1px_3px_rgba(16,24,40,.08))]",
            "border-[var(--border-default,var(--border))] bg-[var(--card)]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )}
        >
          {options.map((option) => (
            <DropdownMenu.Item
              key={option.value}
              onSelect={() => onChange(option.value)}
              data-active={option.value === value || undefined}
              className={cn(
                "flex h-8 cursor-pointer items-center rounded-md px-3 text-sm outline-none",
                "text-[var(--ink-primary,var(--foreground))]",
                "data-[highlighted]:bg-[var(--surface-alt,var(--muted))]",
                "data-[active]:font-semibold data-[active]:text-[var(--primary)]"
              )}
            >
              {option.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
