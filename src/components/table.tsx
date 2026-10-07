import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, style, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
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
      // Grey header band rounded on ALL FOUR corners (top + bottom), so the band
      // reads as a self-contained rounded strip above the rows, matching the
      // approved data-grid style (Sofia 2026-10-07). No bottom border on the
      // header row — the rounded band is the separator, not a hairline.
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
      // Approved data-grid header band (Sofia 2026-10-07): a self-contained
      // rounded grey strip with an 8px white gap below it so it floats above the
      // rows. Every th is fully rounded + backgroundClip:padding-box (the key
      // that makes the grey fill respect the radius under the bottom border);
      // adjacent cells' inner corners touch, so only the band's four OUTER
      // corners read as rounded. All inline => JIT- and theme-proof. Proven in
      // isolation.
      style={{
        borderBottom: "8px solid #fff",
        backgroundClip: "padding-box",
        borderRadius: 10,
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
