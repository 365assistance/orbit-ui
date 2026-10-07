import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * HeroStatCard + StatCard — the two stat surfaces from the vibe direction.
 *
 * HeroStatCard: the single magenta focal block per view. White text on
 * --primary, a subtle concentric-circle motif, an optional eyebrow pill, and
 * one bold headline. One per page maximum (brand rule: one hero colour block,
 * everything else quiet).
 *
 * StatCard: a quiet white card with one big bold number and a small grey
 * label. Hierarchy comes from size/weight/colour, not decoration.
 */

function HeroStatCard({
  eyebrow,
  children,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & { eyebrow?: React.ReactNode }) {
  return (
    <div
      data-slot="hero-stat-card"
      className={cn(
        "relative flex min-h-[210px] flex-col justify-between overflow-hidden rounded-[var(--radius-card,16px)] p-6 text-white",
        className
      )}
      style={{ background: "var(--primary)", fontFamily: "var(--font-sans)", ...style }}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{ right: -60, top: -60, width: 220, height: 220, border: "1px solid rgba(255,255,255,.14)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute rounded-full"
        style={{ right: 20, bottom: -90, width: 260, height: 260, border: "1px solid rgba(255,255,255,.10)" }}
      />
      {eyebrow != null ? (
        <span
          className="relative self-start rounded-[var(--radius-pill,9999px)] px-3.5 py-[5px] text-xs font-semibold"
          style={{ border: "1px solid rgba(255,255,255,.35)" }}
        >
          {eyebrow}
        </span>
      ) : null}
      <div className="relative">{children}</div>
    </div>
  )
}

/** The one bold headline line inside a HeroStatCard. */
function HeroStatHeadline({ className, style, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn("m-0 max-w-[85%] font-semibold leading-tight", className)}
      style={{ fontSize: 23, ...style }}
      {...props}
    />
  )
}

function StatCard({
  label,
  value,
  children,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  label?: React.ReactNode
  value?: React.ReactNode
}) {
  return (
    <div
      data-slot="stat-card"
      className={cn(
        "flex flex-col overflow-hidden rounded-[var(--radius-card,16px)] bg-card p-6",
        className
      )}
      style={{
        boxShadow: "var(--shadow-card, 0 1px 2px rgba(16,24,40,.04), 0 4px 16px rgba(16,24,40,.06))",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...props}
    >
      {label != null ? (
        <span
          className="mb-2 text-[11px] font-bold uppercase tracking-[0.06em]"
          style={{ color: "var(--ink-faint, #8b8798)" }}
        >
          {label}
        </span>
      ) : null}
      {value != null ? (
        <span
          className="leading-[1.1] font-bold"
          style={{ fontSize: 30, color: "var(--ink-primary, #1b1733)" }}
        >
          {value}
        </span>
      ) : null}
      {children}
    </div>
  )
}

export { HeroStatCard, HeroStatHeadline, StatCard }
