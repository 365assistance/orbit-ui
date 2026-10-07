import { Button } from "./button"

/**
 * Pagination — shared list-footer pagination control.
 *
 * The canonical "Showing X-Y of Z - Previous / Next" list footer. Zero-based
 * `page`. Renders nothing when there is only a single page unless `alwaysShow`
 * is set. `label` overrides the noun in the summary (e.g. "clients").
 */
export interface PaginationProps {
  /** Current page index (0-based). */
  page: number
  /** Rows per page. */
  pageSize: number
  /** Total number of rows across all pages (post-filter). */
  total: number
  /** Called with the next 0-based page index. */
  onPageChange: (page: number) => void
  /** Noun used in the "Showing X-Y of Z {label}" summary. Default "results". */
  label?: string
  /** Render even when everything fits on one page. Default false. */
  alwaysShow?: boolean
  /** Extra margin-top override; defaults to 14px. */
  marginTop?: number
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  label = "results",
  alwaysShow = false,
  marginTop = 14,
}: PaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(0, page), pageCount - 1)

  if (!alwaysShow && total <= pageSize) return null

  const from = total === 0 ? 0 : safePage * pageSize + 1
  const to = Math.min((safePage + 1) * pageSize, total)

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop }}>
      <span style={{ fontSize: 12, color: "var(--ink-muted, #5b5670)", fontFamily: "var(--font-sans)" }}>
        {total === 0
          ? "No results"
          : `Showing ${from.toLocaleString()}-${to.toLocaleString()} of ${total.toLocaleString()} ${label}`}
      </span>
      <div style={{ display: "flex", gap: 6 }}>
        <Button
          variant="outline"
          size="sm"
          disabled={safePage === 0}
          onClick={() => onPageChange(Math.max(0, safePage - 1))}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={safePage >= pageCount - 1}
          onClick={() => onPageChange(Math.min(pageCount - 1, safePage + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default Pagination
