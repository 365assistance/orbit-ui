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
  /** Collapsible (default). When false, the body is always shown and the header
   *  is static (no toggle button, no chevron); `open`/`onToggle` are ignored. */
  collapsible?: boolean
  /** Card chrome (default true). When false, the section drops its outer border,
   *  radius, background and header band — just a titled group of fields. Use in
   *  modals where the modal is already the container, to avoid nested borders. */
  bordered?: boolean
  open?: boolean
  onToggle?: () => void
  children: React.ReactNode
  /** Bottom-of-panel actions (canonical Save + Cancel). */
  footer?: React.ReactNode
  /** Element shown left of the chevron (e.g. a StatusChip). Use on all siblings or none. */
  headerAccessory?: React.ReactNode
}

export function FormSection({
  title,
  summary,
  collapsible = true,
  bordered = true,
  open: openProp,
  onToggle,
  children,
  footer,
  headerAccessory,
}: FormSectionProps) {
  // Non-collapsible sections are always expanded.
  const open = collapsible ? !!openProp : true

  const header = (
    <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, width: "100%" }}>
      <span>
        <span style={{ display: "block", fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: "var(--ink-primary, #1b1733)" }}>{title}</span>
        {summary ? (
          <span style={{ display: "block", marginTop: 3, fontFamily: "var(--font-sans)", fontSize: 12, color: "var(--ink-muted, #5b5670)", lineHeight: 1.35 }}>{summary}</span>
        ) : null}
      </span>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        {headerAccessory}
        {collapsible && (
          <span style={{ color: "var(--primary)", display: "inline-flex" }}>
            {open ? <ChevronDown className="h-4 w-4" aria-hidden /> : <ChevronRight className="h-4 w-4" aria-hidden />}
          </span>
        )}
      </span>
    </span>
  )

  // Borderless: no card chrome, just a titled group — for modals where the modal
  // is the container (avoids nested borders; Sofia 2026-11-23).
  if (!bordered) {
    return (
      <div data-slot="form-section">
        <div style={{ marginBottom: 12 }}>{header}</div>
        <div>
          {children}
          {footer && (
            <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end", gap: 8 }}>{footer}</div>
          )}
        </div>
      </div>
    )
  }

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
      {collapsible ? (
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
          {header}
        </button>
      ) : (
        <div style={{ background: "var(--card, #fff)", padding: "14px 16px" }}>{header}</div>
      )}
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
