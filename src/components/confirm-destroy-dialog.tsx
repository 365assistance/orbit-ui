import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./dialog"
import { Button } from "./button"
import { Spinner } from "./spinner"

/**
 * ConfirmDestroyDialog — the single, standard confirmation modal for
 * destructive actions (delete, remove, revoke) across Orbit.
 *
 * Agreed pattern (Sofia, 2026-11-03):
 * - Title: verb + noun, second word lowercase, with a "?" (e.g. "Delete user?").
 *   Caller passes the full title string so it reads naturally per action.
 * - No warning banner/label.
 * - One concise body line with only the relevant detail, e.g.
 *   "This will permanently delete {name}, and this user will lose access
 *    immediately. This action cannot be undone."
 * - Buttons: Cancel (ghost) then the destructive confirm (destructive variant),
 *   in that order.
 *
 * Keep the body to a single focused sentence. Do not add icons, coloured
 * banners, or multi-paragraph copy — that's what this standard removes.
 */
export interface ConfirmDestroyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Full title, e.g. "Delete user?" (verb + lowercase noun + "?"). */
  title: string
  /** One concise line stating the consequence; include "This action cannot be undone." */
  description: React.ReactNode
  /** Confirm button label, e.g. "Delete user". Defaults to the title without the trailing "?". */
  confirmLabel?: string
  cancelLabel?: string
  /** Called when the user confirms the destructive action. */
  onConfirm: () => void
  /** Disables the buttons and shows a spinner on confirm while the action runs. */
  loading?: boolean
}

export function ConfirmDestroyDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  loading = false,
}: ConfirmDestroyDialogProps) {
  const resolvedConfirm = confirmLabel ?? title.replace(/\?\s*$/, "")
  return (
    <Dialog open={open} onOpenChange={(next) => !next && !loading && onOpenChange(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-[var(--ink-muted,var(--muted-foreground))]">{description}</p>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={loading}>
            {loading && <Spinner size="sm" />}
            {resolvedConfirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
