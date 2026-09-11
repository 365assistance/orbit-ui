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

export interface PillProps extends React.ComponentProps<"span"> {
  variant?: PillVariant
}

export function Pill({
  variant = "neutral",
  className,
  style,
  ...props
}: PillProps) {
  const v = VARIANT_STYLE[variant]
  return (
    <span
      data-slot="pill"
      data-variant={variant}
      className={cn("inline-flex w-fit items-center gap-1 whitespace-nowrap", className)}
      style={{
        background: v.bg,
        color: v.color,
        border: v.border,
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
