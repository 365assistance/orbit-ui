import * as React from "react"

/**
 * TableToolbar — the canonical header row that sits ABOVE a data-grid Table.
 *
 * Standardised 2026-10-07 because the data-grid tabs (Plans / Promotions /
 * Audiences) each had a different header: one was title + count, one was a
 * lone right-aligned button, one was title only. This gives every list the
 * SAME structure: a title (+ optional count/subtitle) on the left, and an
 * optional primary action on the right.
 *
 * RULES:
 *  - Always give a `title`. Add `count` (or `subtitle`) when the list has a
 *    meaningful total.
 *  - `action` is the primary CTA (canonical Button). Omit it for read-only /
 *    system-populated lists (e.g. Plans come from CAPS, so no create button).
 *  - Action copy: sentence case, one verb, e.g. "Create audience",
 *    "Create promo code" (NOT "Create Promo Code").
 */
export interface TableToolbarProps {
  title: React.ReactNode
  /** A count rendered as the subtitle, e.g. 33 -> "33 audiences". Pass `countLabel` for the noun. */
  count?: number | null
  /** Noun for the count line (e.g. "audiences"). Pluralised naively. */
  countLabel?: string
  /** Free-form subtitle (used instead of count when provided). */
  subtitle?: React.ReactNode
  /** Primary action (canonical Button). Omit for read-only lists. */
  action?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export function TableToolbar({
  title,
  count,
  countLabel = "items",
  subtitle,
  action,
  className,
  style,
}: TableToolbarProps) {
  const countLine =
    subtitle != null
      ? subtitle
      : count != null
        ? count === 0
          ? "None yet"
          : `${count.toLocaleString()} ${countLabel}${count === 1 ? "" : countLabel.endsWith("s") ? "" : "s"}`
        : null

  return (
    <div
      data-slot="table-toolbar"
      className={className}
      style={{
        marginBottom: 16,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        ...style,
      }}
    >
      <div>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--ink-primary, #1b1733)", fontFamily: "var(--font-sans)" }}>
          {title}
        </p>
        {countLine != null ? (
          <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--ink-muted, #5b5670)", fontFamily: "var(--font-sans)" }}>
            {countLine}
          </p>
        ) : null}
      </div>
      {action != null ? <div style={{ flexShrink: 0 }}>{action}</div> : null}
    </div>
  )
}
