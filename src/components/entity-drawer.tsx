import * as React from "react"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/drawer"
import { Button } from "@/components/button"
import { cn } from "@/lib/utils"

/**
 * EntityDrawer — the canonical CREATE / EDIT shell for a single record.
 *
 * Standard (Sofia 2026-10-20): a right-side drawer with a sectioned single
 * form + a Cancel / primary footer is THE pattern for creating or editing one
 * entity (e.g. Create User, Edit Tenant). It keeps the user in the context of
 * the list behind it. For genuinely multi-step setup flows, use SetupWizard
 * instead (modal + left vertical stepper).
 *
 * Built on the library Drawer primitives. You compose the body from
 * EntityDrawerSection + FormField; the header and the Cancel/submit footer are
 * standardised here so every create/edit drawer is identical.
 *
 * USAGE RULES:
 *  - Group fields with <EntityDrawerSection label="BASIC">…</EntityDrawerSection>.
 *    Section labels are short, UPPERCASE eyebrow labels (reference pattern).
 *  - Footer: Cancel (outline, left) + primary submit (right). Pass
 *    `submitLabel` (default "Create"). `loading` disables both + spins submit.
 *  - Keep the form a single scroll; no steps. If you need steps, use SetupWizard.
 */
export interface EntityDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Drawer title, e.g. "New User" / "Edit User". */
  title: React.ReactNode
  /** Optional sub-line under the title. */
  description?: React.ReactNode
  /** Optional element shown above the title (e.g. an avatar / icon). */
  media?: React.ReactNode
  /** The form body — compose EntityDrawerSection + FormField. */
  children: React.ReactNode
  /** Primary action handler (submit). */
  onSubmit: () => void
  /** Primary button label. Default "Create". */
  submitLabel?: React.ReactNode
  /** Cancel button label. Default "Cancel". */
  cancelLabel?: React.ReactNode
  /** Disables inputs/footer and spins the submit button. */
  loading?: boolean
  /** Disables the submit button (e.g. invalid form). */
  submitDisabled?: boolean
  /** Panel width. Default min(560px, 100%). */
  width?: string
  className?: string
}

export function EntityDrawer({
  open,
  onOpenChange,
  title,
  description,
  media,
  children,
  onSubmit,
  submitLabel = "Create",
  cancelLabel = "Cancel",
  loading = false,
  submitDisabled = false,
  width = "min(560px, 100%)",
  className,
}: EntityDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={(next) => !loading && onOpenChange(next)}>
      <DrawerContent
        showClose={!loading}
        width={width}
        className={cn("p-0", className)}
      >
        <div className="flex h-full flex-col">
          <div className="border-b px-7 pb-5 pt-7" style={{ borderColor: "var(--border-default)" }}>
            <DrawerHeader className="p-0">
              {media && <div className="mb-3">{media}</div>}
              <DrawerTitle>{title}</DrawerTitle>
              {description && <DrawerDescription>{description}</DrawerDescription>}
            </DrawerHeader>
          </div>

          <DrawerBody className="flex-1 overflow-y-auto px-7 py-6">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (!loading && !submitDisabled) onSubmit()
              }}
              className="flex flex-col gap-7"
            >
              {children}
              {/* Hidden submit so Enter submits the form from any field. */}
              <button type="submit" className="sr-only" aria-hidden tabIndex={-1} />
            </form>
          </DrawerBody>

          <DrawerFooter className="px-7 pb-7">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              {cancelLabel}
            </Button>
            <Button onClick={onSubmit} disabled={loading || submitDisabled} className="min-w-[120px]">
              {loading ? "Saving…" : submitLabel}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

/**
 * EntityDrawerSection — an eyebrow-labelled group of fields inside an
 * EntityDrawer (BASIC / CONTACT / WORK, etc.). Not collapsible (that is
 * FormSection's job for settings tabs); this is just a quiet section heading.
 */
export interface EntityDrawerSectionProps {
  /** Short UPPERCASE eyebrow label, e.g. "BASIC". */
  label?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function EntityDrawerSection({ label, children, className }: EntityDrawerSectionProps) {
  return (
    <section data-slot="entity-drawer-section" className={cn("flex flex-col gap-4", className)}>
      {label && (
        <h3
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "var(--ink-muted)" }}
        >
          {label}
        </h3>
      )}
      {children}
    </section>
  )
}
