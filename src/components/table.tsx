import * as React from "react"

import { cn } from "@/lib/utils"

// Scoped CSS for the data-grid header band. Keyed off stable data-slot
// attributes (NOT Tailwind utilities) so the OUTER-corner rounding renders
// reliably regardless of the JIT scanner. Only the first/last header cell round
// their outer side; middle cells stay square so the band is ONE continuous bar
// (not a pill per column). Injected once.
const TABLE_BAND_CSS = `
[data-slot="table"] [data-slot="table-head"]:first-child{border-top-left-radius:10px;border-bottom-left-radius:10px}
[data-slot="table"] [data-slot="table-head"]:last-child{border-top-right-radius:10px;border-bottom-right-radius:10px}
`

function Table({ className, style, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <style>{TABLE_BAND_CSS}</style>
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        // Inline border-collapse:separate so the header band's rounded corners
        // actually render. Tailwind preflight forces `table{border-collapse:
        // collapse}` as a base element rule; inline style is the reliable
        // override (radius is ignored under collapse).
        style={{ borderCollapse: "separate", borderSpacing: 0, ...style }}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      // ONE continuous grey band (Sofia 2026-10-07): only the OUTER corners
      // round — the first header cell rounds its left corners, the last rounds
      // its right corners, middle cells stay square so they butt together into a
      // single bar (not a pill per column). rounded-l-lg/rounded-r-lg are
      // standard utilities that compile reliably here.
      className={cn(className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child_td]:border-0", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      // Under border-separate the row divider lives on the CELLS (see
      // TableCell's border-b), not the tr. Keep hover + selected here.
      className={cn(
        "group/tr transition-colors data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, style, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 bg-gray-100 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-gray-600 [&:has([role=checkbox])]:pr-0",
        className
      )}
      // Grey header band: 8px white gap below so the bar floats above the rows,
      // and backgroundClip:padding-box so the grey fill respects the OUTER
      // corner radius (set on first/last th by TableHeader) under the bottom
      // border. No per-th borderRadius here — that made every column a separate
      // pill (Sofia 2026-10-07); the bar must be continuous.
      style={{
        borderBottom: "8px solid #fff",
        backgroundClip: "padding-box",
        ...style,
      }}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      // Row hairline lives on the cell (border-separate ignores tr borders).
      // Last row's cells drop it via the body's [&_tr:last-child] rule.
      className={cn(
        "border-b border-gray-100 px-4 py-3 align-middle text-sm text-gray-900 group-hover/tr:bg-gray-50/50 [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
