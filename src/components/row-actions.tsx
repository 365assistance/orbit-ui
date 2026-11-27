import * as React from "react"
import { DropdownMenu } from "radix-ui"
import { MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * RowActions — the canonical per-row action affordance for data tables/lists.
 *
 * Promoted from the live app (orbit-core-ui src/components/ui/row-actions.tsx).
 * One neutral kebab (⋯) trigger that opens a menu; only genuinely destructive
 * items carry colour (tone="danger"). Rendered through a Radix portal, so it is
 * never clipped by an ancestor's overflow:hidden.
 *
 * Usage:
 *   <RowActions
 *     label={`Actions for ${item.name}`}
 *     items={[
 *       { label: 'Edit', icon: Pencil, onSelect: () => edit(item) },
 *       { separator: true },
 *       { label: 'Delete', icon: Trash2, tone: 'danger', onSelect: () => del(item) },
 *     ]}
 *   />
 */

export type RowActionItem =
  | {
      separator?: false
      label: string
      icon?: React.ComponentType<{ className?: string }>
      tone?: "default" | "danger"
      disabled?: boolean
      onSelect: () => void
    }
  | { separator: true }

export interface RowActionsProps {
  /** Accessible label for the trigger, e.g. "Actions for Acme Corp". */
  label: string
  items: RowActionItem[]
  className?: string
}

export function RowActions({ label, items, className }: RowActionsProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={label}
          data-slot="row-actions-trigger"
          className={cn(
            "grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors",
            "hover:bg-[var(--orbit-surface-muted,var(--muted))] hover:text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "data-[state=open]:bg-[var(--orbit-surface-muted,var(--muted))] data-[state=open]:text-foreground",
            className
          )}
        >
          <MoreHorizontal className="h-[18px] w-[18px]" aria-hidden />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          collisionPadding={8}
          data-slot="row-actions-content"
          className="z-[70] min-w-[11rem] rounded-xl border border-border bg-popover p-1 shadow-[0_18px_50px_rgba(16,24,40,0.14)]"
        >
          {items.map((item, i) => {
            if (item.separator) {
              return (
                <DropdownMenu.Separator
                  key={`sep-${i}`}
                  className="my-1 h-px bg-border"
                />
              )
            }
            const Icon = item.icon
            const danger = item.tone === "danger"
            return (
              <DropdownMenu.Item
                key={item.label}
                disabled={item.disabled}
                onSelect={() => {
                  // Let the menu close (do NOT preventDefault, or it persists),
                  // then run the action on the next tick so the menu's focus
                  // return doesn't fight an opening modal/drawer.
                  setTimeout(() => item.onSelect(), 0)
                }}
                className={cn(
                  "flex min-h-9 cursor-pointer items-center gap-2.5 rounded-lg px-3 text-sm outline-none",
                  "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                  danger
                    ? "text-[var(--orbit-error,var(--destructive))] data-[highlighted]:bg-[var(--orbit-error-bg,var(--destructive)/0.1)]"
                    : "text-foreground data-[highlighted]:bg-muted"
                )}
              >
                {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden />}
                {item.label}
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
