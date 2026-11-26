// ---------------------------------------------------------------------------
// MetricCard — the canonical dashboard KPI tile.
//
// Chosen by Sofia (2026-11-26) from the page-pattern audit: she rejected both
// the prototype card (status dot) and the live Orbit card (coloured icon badge
// + trend line) in favour of a more minimal, number-first card (audit
// "Option B"). The number is the hero, the label sits beneath it, and an
// optional small change line (e.g. "+3.2% vs last month") can be shown or
// hidden per use. No icon, no trend graph, tokens only.
//
// This is a NEW focused component, separate from StatCard (stat-card.tsx),
// which keeps its existing API for current consumers.
// ---------------------------------------------------------------------------

import * as React from "react"

import { cn } from "@/lib/utils"

export type MetricChangeDirection = "up" | "down" | "flat"

export interface MetricCardProps extends React.ComponentProps<"div"> {
  /** Small grey label under the number (e.g. "Active members"). */
  label: React.ReactNode
  /** The hero number (e.g. "12,480", "$84.2k", "4m 12s"). */
  value: React.ReactNode
  /**
   * Optional change indicator. Omit entirely to hide it. `value` is the delta
   * text (e.g. "+3.2%", "-$5.1k"); `context` is the quiet trailing text
   * (e.g. "vs last month").
   */
  change?: {
    value: React.ReactNode
    context?: React.ReactNode
    direction?: MetricChangeDirection
  }
}

const CHANGE_COLOR: Record<MetricChangeDirection, string> = {
  up: "var(--orbit-success, #16a34a)",
  down: "var(--orbit-error, #dc2626)",
  flat: "var(--ink-muted, #707885)",
}

/**
 * MetricCard — minimal, number-first KPI tile.
 *
 * @example
 * <MetricCard label="Active members" value="12,480"
 *   change={{ value: "+3.2%", context: "vs last month", direction: "up" }} />
 *
 * @example  // no change line
 * <MetricCard label="Open invoices" value="317" />
 */
export function MetricCard({
  label,
  value,
  change,
  className,
  style,
  ...props
}: MetricCardProps) {
  return (
    <div
      data-slot="metric-card"
      className={cn("flex flex-col overflow-hidden", className)}
      style={{
        background: "var(--card, #fff)",
        border: "1px solid var(--border-default, #e2e4e9)",
        borderRadius: "var(--radius-card, 14px)",
        padding: 22,
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...props}
    >
      <span
        data-slot="metric-value"
        className="font-bold leading-none"
        style={{
          fontSize: 34,
          letterSpacing: "-0.5px",
          color: "var(--ink-primary, #242d38)",
        }}
      >
        {value}
      </span>
      <span
        data-slot="metric-label"
        className="font-medium"
        style={{
          marginTop: 8,
          fontSize: 13,
          color: "var(--ink-muted, #707885)",
        }}
      >
        {label}
      </span>
      {change ? (
        <span
          data-slot="metric-change"
          data-direction={change.direction ?? "flat"}
          style={{ marginTop: 10, fontSize: 13, fontWeight: 700 }}
        >
          <span style={{ color: CHANGE_COLOR[change.direction ?? "flat"] }}>
            {change.value}
          </span>
          {change.context ? (
            <span style={{ marginLeft: 6, fontWeight: 500, color: "var(--ink-muted, #707885)" }}>
              {change.context}
            </span>
          ) : null}
        </span>
      ) : null}
    </div>
  )
}
