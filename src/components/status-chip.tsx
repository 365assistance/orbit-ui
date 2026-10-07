import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * StatusChip — an outline pill with a coloured status dot.
 *
 * The one scannable state affordance from the vibe direction: a neutral outline
 * pill, a small solid dot in the state colour, then the label. Pill radius is
 * intentional here (reserved for chips, not buttons).
 *
 * Two families of variant live here so every status across the admin uses ONE
 * component (no bespoke inline dot+pill markup):
 *
 *  Generic lifecycle (original):
 *    in-process = orange, completed = green, draft = grey,
 *    failed = red (destructive), scheduled = info blue.
 *
 *  Client config / go-live (Sofia 2026-10-07):
 *    ready = green ("configured, safe to switch on")
 *    live = green ("switched on for customers")
 *    in-progress = amber ("still being configured")
 *    not-started = grey
 *    opted-in = green, opted-out = grey
 */
export type StatusVariant =
  | "in-process"
  | "completed"
  | "draft"
  | "failed"
  | "scheduled"
  | "ready"
  | "live"
  | "in-progress"
  | "not-started"
  | "opted-in"
  | "opted-out"

const DOT: Record<StatusVariant, string> = {
  "in-process": "var(--orbit-orange, #fe4a00)",
  completed: "var(--orbit-success, #16a34a)",
  draft: "var(--ink-faint, #8b8798)",
  failed: "var(--destructive, #dc2626)",
  scheduled: "var(--orbit-info, #2563eb)",
  ready: "var(--orbit-success, #16a34a)",
  live: "var(--orbit-success, #16a34a)",
  "in-progress": "var(--orbit-warning, #d97706)",
  "not-started": "var(--ink-faint, #8b8798)",
  "opted-in": "var(--orbit-success, #16a34a)",
  "opted-out": "var(--ink-faint, #8b8798)",
}

const DEFAULT_LABEL: Record<StatusVariant, string> = {
  "in-process": "In process",
  completed: "Completed",
  draft: "Draft",
  failed: "Failed",
  scheduled: "Scheduled",
  ready: "Ready",
  live: "Live",
  "in-progress": "In progress",
  "not-started": "Not started",
  "opted-in": "Opted in",
  "opted-out": "Opted out",
}

function StatusChip({
  variant,
  children,
  className,
  style,
  ...props
}: React.ComponentProps<"span"> & { variant: StatusVariant }) {
  return (
    <span
      data-slot="status-chip"
      data-variant={variant}
      className={cn(
        "inline-flex w-fit items-center gap-[7px] whitespace-nowrap rounded-[var(--radius-pill,9999px)] border px-3 py-[5px] text-xs font-semibold",
        className
      )}
      style={{
        borderColor: "var(--card-line, var(--border, #e5e7eb))",
        color: "var(--ink-primary, #1b1733)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      {...props}
    >
      <span
        aria-hidden
        className="inline-block h-[7px] w-[7px] shrink-0 rounded-full"
        style={{ background: DOT[variant] }}
      />
      {children ?? DEFAULT_LABEL[variant]}
    </span>
  )
}

export { StatusChip }
