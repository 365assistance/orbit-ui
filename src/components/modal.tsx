// ---------------------------------------------------------------------------
// Modal — the high-level action/standard modal.
//
// Promoted from the live Orbit app (orbit-core-ui ui/modal.tsx) via the page
// pattern audit: Sofia picked "action-modals = Orbit live" as canonical
// (2026-11-26). This is the opinionated wrapper (title + body + footer action
// row, sizes, optional header divider / grey footer bar) that most app modals
// want, so callers do not re-assemble Dialog primitives every time.
//
// Built ON TOP of the library's Dialog primitives (dialog.tsx), NOT a second
// Radix dialog. One modal system: Dialog = the low-level primitive, Modal =
// the ready-made wrapper, ConfirmDestroyDialog = a specific confirm. Tokens
// over hardcoded hex, matching Dialog.
// ---------------------------------------------------------------------------

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./dialog"

export type ModalSize = "sm" | "md" | "lg" | "xl"

const sizeMaxWidth: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
}

export interface ModalProps {
  /** Controlled open state. */
  open: boolean
  /** Called when the modal requests to open/close. */
  onOpenChange: (open: boolean) => void
  /** Modal heading. */
  title: React.ReactNode
  /** Optional sub-heading under the title. */
  description?: React.ReactNode
  /** Width preset. Defaults to md. */
  size?: ModalSize
  /**
   * If false, Esc and overlay-click will not close the modal. Reserve for a
   * genuinely critical in-flight step; most modals should stay dismissible.
   */
  dismissible?: boolean
  /** Body content. */
  children?: React.ReactNode
  /** Action row. Convention: primary right, cancel/ghost to its left. */
  footer?: React.ReactNode
  /**
   * Full-width rule under the header (and, implicitly, the grey footer bar).
   * Use for modals with a top title bar (e.g. Create Policy).
   */
  headerDivider?: boolean
  /**
   * Grey footer bar (light grey fill + top rule, flush to the bottom edge).
   * Implied by headerDivider; set explicitly for modals that want the footer
   * bar without a header rule.
   */
  footerBar?: boolean
  /** Extra class on the content surface. */
  className?: string
}

/**
 * Modal — controlled, opinionated modal wrapper.
 *
 * @example
 * const [open, setOpen] = React.useState(false)
 * <Modal open={open} onOpenChange={setOpen} title="Create tenant"
 *   footer={<><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
 *            <Button onClick={save}>Save</Button></>}>
 *   ...fields...
 * </Modal>
 */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  size = "md",
  dismissible = true,
  children,
  footer,
  headerDivider = false,
  footerBar = false,
  className,
}: ModalProps) {
  // A grey footer bar comes with the header-divider treatment, or on request.
  const greyFooter = headerDivider || footerBar

  return (
    <Dialog
      open={open}
      onOpenChange={dismissible ? onOpenChange : undefined}
    >
      <DialogContent
        // Flush padding when we are drawing header/footer bars, so the bars can
        // span edge-to-edge; otherwise keep Dialog's default p-6 via the header/
        // body/footer paddings below.
        className={cn(
          "gap-0 p-0 overflow-hidden",
          sizeMaxWidth[size],
          className
        )}
        onEscapeKeyDown={(e) => {
          if (!dismissible) e.preventDefault()
        }}
        onInteractOutside={(e) => {
          if (!dismissible) {
            e.preventDefault()
            return
          }
          // Don't dismiss when the interaction is with a portalled popup that
          // logically belongs to the modal's content (e.g. PortalSelect's
          // listbox, tooltips, menus). These render under document.body so
          // Radix treats them as "outside", which would wrongly close the modal.
          const target = e.target as HTMLElement | null
          if (
            target?.closest(
              '[role="listbox"],[data-slot="row-actions-content"],[data-radix-popper-content-wrapper],[role="menu"],[role="tooltip"]'
            )
          ) {
            e.preventDefault()
          }
        }}
      >
        <DialogHeader
          className={cn(
            "px-6 pt-6",
            headerDivider ? "pb-4 border-b" : "pb-2"
          )}
          style={
            headerDivider
              ? { borderColor: "var(--border-default)" }
              : undefined
          }
        >
          <DialogTitle className="font-bold">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="px-6 py-4 overflow-y-auto">{children}</div>

        {footer && (
          <DialogFooter
            className={cn(
              "px-6 py-4",
              greyFooter && "border-t"
            )}
            style={
              greyFooter
                ? {
                    background: "var(--surface-alt, var(--muted))",
                    borderColor: "var(--border-default)",
                  }
                : undefined
            }
          >
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
