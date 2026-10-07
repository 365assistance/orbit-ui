import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * RowList / RowItem — the airy borderless hover-row list from the vibe
 * direction. NOT a gridline table: rows have no dividers, just a soft hover
 * highlight and a rounded corner on hover. Use for ENTITY LISTS (clients,
 * single sends) where each row is a thing you click into. For multi-column
 * DATA GRIDS (plans, promotions, members, transactions) use Table instead.
 *
 * Composition (left to right):
 *   RowAvatar    — 38px rounded tile, coloured fill, initials
 *   RowPrimary   — two-line cell: bold primary + muted secondary
 *   <StatusChip> — state pill (import from ./status-chip)
 *   RowPill      — neutral outline type pill (e.g. channel: SMS / Email)
 *   RowNumber    — right-aligned tabular-nums count/amount
 *   RowKebab     — the "more" affordance
 *
 * RowItem lays these out with a configurable grid. Pass `columns` to match the
 * cells you render (use FIXED column widths so chips/numbers line up down the
 * list, e.g. "46px 1fr 120px 120px").
 */

function RowList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="row-list"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

function RowItem({
  active = false,
  columns = "auto 1.4fr 1fr 1fr 1fr auto",
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & { active?: boolean; columns?: string }) {
  return (
    <div
      data-slot="row-item"
      data-active={active || undefined}
      className={cn(
        "grid items-center gap-3.5 rounded-xl px-3 py-3 transition-colors hover:bg-[#f7f8fb] data-[active]:bg-[#f7f8fb]",
        className
      )}
      style={{ gridTemplateColumns: columns, ...style }}
      {...props}
    />
  )
}

function RowAvatar({
  color = "var(--primary)",
  children,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & { color?: string }) {
  return (
    <div
      data-slot="row-avatar"
      className={cn(
        "flex h-[38px] w-[38px] items-center justify-center rounded-[var(--radius-sm-vibe,10px)] text-[13px] font-bold text-white",
        className
      )}
      style={{ background: color, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}

function RowPrimary({
  primary,
  secondary,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  primary: React.ReactNode
  secondary?: React.ReactNode
}) {
  return (
    <div data-slot="row-primary" className={cn("min-w-0", className)} {...props}>
      <div
        className="truncate text-sm font-semibold"
        style={{ color: "var(--ink-primary, #1b1733)" }}
      >
        {primary}
      </div>
      {secondary != null ? (
        <div className="truncate text-xs" style={{ color: "var(--ink-faint, #8b8798)" }}>
          {secondary}
        </div>
      ) : null}
    </div>
  )
}

/** Neutral outline "type" pill (e.g. channel tag). Chips-only pill radius. */
function RowPill({ className, style, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="row-pill"
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--radius-pill,9999px)] border px-3 py-[5px] text-center text-xs font-semibold",
        className
      )}
      style={{
        borderColor: "var(--card-line, var(--border, #e5e7eb))",
        color: "var(--ink-mid, #5b5670)",
        ...style,
      }}
      {...props}
    />
  )
}

/** Right-aligned tabular-nums number cell (counts / amounts). */
function RowNumber({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="row-number"
      className={cn("text-right text-sm font-bold tabular-nums", className)}
      style={{ color: "var(--ink-primary, #1b1733)", ...style }}
      {...props}
    />
  )
}

/** The kebab / "more" affordance at the end of a row. */
function RowKebab({ className, children, style, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="row-kebab"
      className={cn(
        "cursor-pointer text-right font-bold text-[var(--ink-subtle,#8b8798)] hover:text-[var(--ink-muted,#5b5670)]",
        className
      )}
      style={{ background: "none", border: "none", ...style }}
      {...props}
    >
      {children ?? "\u22ef"}
    </button>
  )
}

export { RowList, RowItem, RowAvatar, RowPrimary, RowPill, RowNumber, RowKebab }
