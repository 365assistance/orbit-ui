import * as React from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

/**
 * FormSection — the canonical collapsible config/form section.
 *
 * This is the ONE pattern for a titled, collapsible section of a settings/
 * config form (e.g. Branding and Templates tabs in the client config screen).
 * Standardised 2026-10-07 so those tabs stop drifting apart.
 *
 * USAGE RULES (keep every FormSection consistent):
 *  - Title: bold, title case (handled here). Do NOT also add a per-section
 *    summary line unless every sibling section has one — mixing summary/no-
 *    summary across sibling sections is the drift we are removing.
 *  - Field labels inside the body: use the `Label` primitive in TITLE CASE
 *    (bold), not UPPERCASE. Keep all sections' field labels identical.
 *  - Footer: when a section saves independently, pass a `footer` with the
 *    canonical Save + Cancel (Save = primary, Cancel = outline), both disabled
 *    until the section is dirty. If a whole tab saves together, give EVERY
 *    section the same footer (do not mix per-section + a page-level footer).
 *  - headerAccessory: optional element left of the chevron (e.g. a StatusChip).
 *    If you use it, use it on all sibling sections, not just some.
 */
export interface FormSectionProps {
  title: string
  /** Optional sub-line under the title. Use consistently across siblings or not at all. */
  summary?: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
  /** Bottom-of-panel actions (canonical Save + Cancel). */
  footer?: React.ReactNode
  /** Element shown left of the chevron (e.g. a StatusChip). Use on all siblings or none. */
  headerAccessory?: React.ReactNode
}

export function FormSection({
  title,
  summary,
  open,
  onToggle,
  children,
  footer,
  headerAccessory,
}: FormSectionProps) {
  return (
    <div
      data-slot="form-section"
      style={{
        border: "1px solid var(--border-default, var(--border, #e5e7eb))",
        borderRadius: "var(--radius-lg, 12px)",
        background: "var(--card, #fff)",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: "100%",
          border: "none",
          background: open ? "var(--surface-page, #f8f9fb)" : "var(--card, #fff)",
          padding: "14px 16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          textAlign: "left",
        }}
      >
        <span>
          <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "var(--ink-primary, #1b1733)" }}>{title}</span>
          {summary ? (
            <span style={{ display: "block", marginTop: 3, fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--ink-muted, #5b5670)", lineHeight: 1.35 }}>{summary}</span>
          ) : null}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          {headerAccessory}
          <span style={{ color: "var(--primary)", display: "inline-flex" }}>
            {open ? <ChevronDown className="h-4 w-4" aria-hidden /> : <ChevronRight className="h-4 w-4" aria-hidden />}
          </span>
        </span>
      </button>
      {open && (
        <div style={{ borderTop: "1px solid var(--surface-alt, #eef1f5)", padding: 16 }}>
          {children}
          {footer && (
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end", gap: 8 }}>{footer}</div>
          )}
        </div>
      )}
    </div>
  )
}
