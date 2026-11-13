import * as React from "react"
import { cn } from "@/lib/utils"

// When a <Table/> is rendered INSIDE a TableCard, the grey header band must sit
// FLUSH with the card's border (Sofia 2026-11-13): no outer-corner rounding and
// no white gap below the band, so the header reads as part of the card edge
// rather than a floating inset pill. Standalone <Table/> elsewhere keeps its
// rounded floating band (that CSS lives in table.tsx). Scoped to
// [data-slot="table-card"] so it only affects tables inside this component.
const FLUSH_HEADER_CSS = `
[data-slot="table-card"] [data-slot="table-head"]:first-child{border-top-left-radius:0;border-bottom-left-radius:0}
[data-slot="table-card"] [data-slot="table-head"]:last-child{border-top-right-radius:0;border-bottom-right-radius:0}
[data-slot="table-card"] [data-slot="table-head"]{border-bottom:1px solid var(--border-default,var(--border))}
[data-slot="table-card"] [data-slot="table-head"]:first-child,[data-slot="table-card"] [data-slot="table-cell"]:first-child{padding-left:20px}
[data-slot="table-card"] [data-slot="table-head"]:last-child,[data-slot="table-card"] [data-slot="table-cell"]:last-child{padding-right:20px}
`

/**
 * TableCard — one bordered panel that JOINS the search/filter toolbar, the
 * data table, and the footer into a single card (Sofia 2026-11-13, from the
 * Figma table that uses our UI kit).
 *
 * This is the "joined" alternative to the older layout where <FilterBar/> was a
 * separate bordered card floating ABOVE a separate table card. Here the toolbar,
 * table and footer share ONE border/radius/shadow so they read as a single
 * surface:
 *
 *   ┌─────────────────────────────────────────────┐
 *   │  [search]              [filters] [actions]   │  ← toolbar slot
 *   ├─────────────────────────────────────────────┤
 *   │  TABLE (header band + rows)                  │  ← children (<Table/>)
 *   ├─────────────────────────────────────────────┤
 *   │  Showing X of Y            < Page 1 of 1 >   │  ← footer slot
 *   └─────────────────────────────────────────────┘
 *
 * Compose it with the existing primitives — SearchInput + FilterSelect + Button
 * in the toolbar, <Table/> as children, <Pagination/> (or a count line) in the
 * footer:
 *
 *   <TableCard
 *     search={<SearchInput value={q} onChange={setQ} placeholder="Search…" />}
 *     actions={<>
 *       <FilterSelect ... />
 *       <Button variant="outline"><Download/> Export</Button>
 *     </>}
 *     footer={<Pagination page={p} pageSize={20} total={n} onPageChange={setP} />}
 *   >
 *     <Table>…</Table>
 *   </TableCard>
 *
 * RULES:
 *  - The table divider band and footer divider are drawn BY TableCard, so the
 *    <Table/> inside should not carry its own outer border/card.
 *  - Omit `search`/`actions` to drop the toolbar row entirely (headerless table).
 *  - Omit `footer` to drop the footer row.
 */
export interface TableCardProps {
  /** Left side of the toolbar — typically a <SearchInput/>. */
  search?: React.ReactNode
  /** Right side of the toolbar — filters, export, refresh, etc. */
  actions?: React.ReactNode
  /** The table. Render a <Table/> here; TableCard supplies the surrounding card. */
  children: React.ReactNode
  /** Footer row — typically <Pagination/> or a "Showing X of Y" count line. */
  footer?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function TableCard({
  search,
  actions,
  children,
  footer,
  className,
  style,
}: TableCardProps) {
  const hasToolbar = search != null || actions != null

  return (
    <div
      data-slot="table-card"
      className={cn(
        // One unified surface: soft border, large radius, subtle raised shadow,
        // card background. The toolbar / table / footer all live inside it.
        "overflow-hidden rounded-2xl border shadow-sm",
        "border-[var(--border-default,var(--border))] bg-[var(--card)]",
        className
      )}
      style={style}
    >
      {hasToolbar && (
        <div
          data-slot="table-card-toolbar"
          className={cn(
            // Toolbar sits flush inside the card, divided from the table below.
            "flex flex-col gap-3 border-b px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:px-5 lg:py-4",
            "border-[var(--border-default,var(--border))]"
          )}
        >
          {search != null ? (
            <div className="flex flex-1 items-center gap-2">{search}</div>
          ) : (
            // Keep actions right-aligned even when there is no search slot.
            <div className="hidden lg:block lg:flex-1" />
          )}
          {actions != null && (
            <div className="flex flex-wrap items-center gap-2">{actions}</div>
          )}
        </div>
      )}

      {/* The table. It renders its own header band + row hairlines; TableCard
          just hosts it inside the shared card so there is no double border.
          Flush: no horizontal padding, so the header band + rows span the full
          card width and the header sits flush with the card border (Sofia
          2026-11-13). The FLUSH_HEADER_CSS below squares the band's outer
          corners and drops the gap below it when inside a TableCard. */}
      <style>{FLUSH_HEADER_CSS}</style>
      <div data-slot="table-card-body">
        {children}
      </div>

      {footer != null && (
        <div
          data-slot="table-card-footer"
          className={cn(
            "border-t px-4 py-3 lg:px-5 lg:py-4",
            "border-[var(--border-default,var(--border))]"
          )}
        >
          {footer}
        </div>
      )}
    </div>
  )
}

export default TableCard
