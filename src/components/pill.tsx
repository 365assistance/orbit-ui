// ---------------------------------------------------------------------------
// Pill — small labelled chip (distinct from Badge).
//
// Why: the audit found status/label chips hand-rolled inline everywhere as
// <span style={{ borderRadius: 9999, padding: '3px 10px', background:'#F0F2F8',
// color:'#5b6470' }}> — 48 uses of borderRadius:9999 across 17 files, plus the
// 999/50 radius typos (POLISH-AUDIT §3 "Pill"). Badge is rounded-4xl and
// semantic; Pill is the neutral/soft chip used for things like "3 days ago" or
// channel tags.
//
// Follows the SegmentedControl pattern: small, typed, self-contained, tokenised
// bg/text pairs, no heavy deps.
// ---------------------------------------------------------------------------

import * as React from "react"

import { cn } from "@/lib/utils"

export type PillVariant =
  | "neutral"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "ghost"

const VARIANT_STYLE: Record<PillVariant, { bg: string; color: string; border?: string }> = {
  neutral: { bg: "var(--surface-alt)", color: "var(--ink-mid)" },
  brand: { bg: "var(--accent)", color: "var(--primary)" },
  success: { bg: "var(--orbit-success-bg)", color: "var(--orbit-success)" },
  warning: { bg: "var(--orbit-warning-bg)", color: "var(--orbit-warning)" },
  danger: { bg: "var(--orbit-error-bg)", color: "var(--orbit-error)" },
  ghost: { bg: "transparent", color: "var(--ink-muted)", border: "1px solid var(--border-default)" },
}

// Outlined appearance: coloured border + text on a transparent fill (the house
// style for status chips, Sofia 2026-11-13). Each variant maps to its semantic
// colour token for BOTH border and text; `brand` uses --primary. `ghost` and
// `neutral` fall back to the neutral border/ink so they stay subtle.
const OUTLINE_STYLE: Record<PillVariant, { color: string; border: string }> = {
  neutral: { color: "var(--ink-mid)", border: "1px solid var(--border-default)" },
  brand: { color: "var(--primary)", border: "1px solid var(--primary)" },
  success: { color: "var(--orbit-success)", border: "1px solid var(--orbit-success)" },
  warning: { color: "var(--orbit-warning)", border: "1px solid var(--orbit-warning)" },
  danger: { color: "var(--orbit-error)", border: "1px solid var(--orbit-error)" },
  ghost: { color: "var(--ink-muted)", border: "1px solid var(--border-default)" },
}

export interface PillProps extends React.ComponentProps<"span"> {
  variant?: PillVariant
  /** Visual style: soft tinted fill (default) or coloured outline on transparent fill. */
  appearance?: "soft" | "outline"
}

export function Pill({
  variant = "neutral",
  appearance = "soft",
  className,
  style,
  ...props
}: PillProps) {
  const soft = VARIANT_STYLE[variant]
  const outline = OUTLINE_STYLE[variant]
  const isOutline = appearance === "outline"
  return (
    <span
      data-slot="pill"
      data-variant={variant}
      data-appearance={appearance}
      className={cn("inline-flex w-fit items-center gap-1 whitespace-nowrap", className)}
      style={{
        background: isOutline ? "transparent" : soft.bg,
        color: isOutline ? outline.color : soft.color,
        border: isOutline ? outline.border : soft.border,
        borderRadius: "var(--radius-pill)",
        padding: "2px 10px",
        fontSize: "var(--text-label-size)",
        lineHeight: "var(--text-label-line)",
        fontWeight: "var(--text-label-weight)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...props}
    />
  )
}
