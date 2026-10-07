// ---------------------------------------------------------------------------
// NativeSelect — the shared styled native <select>.
//
// Keeps the element native (form/browser semantics) but reads everything from
// tokens: 1px --border-default border, --radius corners, --ink-primary text,
// focus ring --primary. Use when native select semantics are needed; for a
// richer custom dropdown use Select / PortalSelect.
// ---------------------------------------------------------------------------

import * as React from "react"

import { cn } from "@/lib/utils"

// Inline chevron (data-URI). Stroke hex duplicated (data-URIs can't read vars).
const CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23707885' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")"

export interface NativeSelectProps extends React.ComponentProps<"select"> {}

export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect({ className, style, ...props }, ref) {
    const [focused, setFocused] = React.useState(false)

    return (
      <select
        ref={ref}
        data-slot="native-select"
        className={cn("appearance-none", className)}
        style={{
          background: "var(--card, #fff)",
          border: `1px solid ${focused ? "var(--primary)" : "var(--border-default, var(--border, #e5e7eb))"}`,
          borderRadius: "var(--radius, 8px)",
          padding: "6px 30px 6px 12px",
          fontSize: "var(--text-label-size, 13px)",
          fontWeight: 600,
          color: "var(--ink-primary, #1b1733)",
          cursor: "pointer",
          fontFamily: "var(--font-sans)",
          outline: "none",
          boxShadow: focused
            ? "0 0 0 3px color-mix(in srgb, var(--primary) 25%, transparent)"
            : "none",
          appearance: "none",
          backgroundImage: CHEVRON,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          transition: "border-color var(--motion-fast, .15s), box-shadow var(--motion-fast, .15s)",
          ...style,
        }}
        {...props}
        onFocus={(e) => {
          setFocused(true)
          props.onFocus?.(e)
        }}
        onBlur={(e) => {
          setFocused(false)
          props.onBlur?.(e)
        }}
      />
    )
  }
)
