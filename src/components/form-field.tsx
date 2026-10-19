import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/label"
import { FieldHelp } from "@/components/field-help"

/**
 * FormField — the canonical label + control + help/error wrapper.
 *
 * ONE pattern for a single labelled form control, used by both EntityDrawer
 * (single-form create/edit) and SetupWizard (multi-step setup) so every form
 * field reads identically across the vibe UI. Do not hand-roll label+input
 * blocks in pages; compose FormField instead.
 *
 * USAGE RULES:
 *  - `label` is title-case (bold, via the Label primitive). Keep consistent.
 *  - `required` adds a subtle asterisk; keep requiredness truthful.
 *  - `help` renders the inline FieldHelp affordance next to the label
 *    (preferred over permanent helper text, matching the library's a11y rule).
 *  - `hint` is optional persistent sub-text UNDER the control (use sparingly;
 *    prefer `help`). `error` replaces the hint and marks the field invalid.
 *  - Pass the control as children; wire `htmlFor`/`id` yourself for a11y.
 */
export interface FormFieldProps {
  /** Visible, title-case label. */
  label: React.ReactNode
  /** id of the control this label points at (sets htmlFor). */
  htmlFor?: string
  /** Marks the field required (visual asterisk only). */
  required?: boolean
  /** Inline help tooltip content, shown via the FieldHelp affordance. */
  help?: React.ReactNode
  /** Persistent sub-text under the control. Prefer `help`. */
  hint?: React.ReactNode
  /** Error message; replaces hint and flags the field invalid. */
  error?: React.ReactNode
  /** The control (Input, Select, etc.). */
  children: React.ReactNode
  className?: string
}

export function FormField({
  label,
  htmlFor,
  required,
  help,
  hint,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div data-slot="form-field" className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center gap-1.5">
        <Label htmlFor={htmlFor}>
          {label}
          {required && (
            <span aria-hidden style={{ color: "var(--destructive)" }}>
              *
            </span>
          )}
        </Label>
        {help && (
          <FieldHelp label={typeof label === "string" ? `Help: ${label}` : "Help"}>
            {help}
          </FieldHelp>
        )}
      </div>
      {children}
      {error ? (
        <p data-slot="form-field-error" className="text-sm" style={{ color: "var(--destructive)" }}>
          {error}
        </p>
      ) : hint ? (
        <p data-slot="form-field-hint" className="text-sm" style={{ color: "var(--ink-muted)" }}>
          {hint}
        </p>
      ) : null}
    </div>
  )
}

/**
 * FormFieldRow — a responsive two-column grid for pairing fields side by side
 * (collapses to one column on narrow panels). Matches the two-up field rows in
 * the New-employee drawer reference.
 */
export function FormFieldRow({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-field-row"
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", className)}
      {...props}
    />
  )
}
