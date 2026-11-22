import * as React from "react";
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
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Full title, e.g. "Delete user?" (verb + lowercase noun + "?"). */
    title: string;
    /** One concise line stating the consequence; include "This action cannot be undone." */
    description: React.ReactNode;
    /** Confirm button label, e.g. "Delete user". Defaults to the title without the trailing "?". */
    confirmLabel?: string;
    cancelLabel?: string;
    /** Called when the user confirms the destructive action. */
    onConfirm: () => void;
    /** Disables the buttons and shows a spinner on confirm while the action runs. */
    loading?: boolean;
}
export declare function ConfirmDestroyDialog({ open, onOpenChange, title, description, confirmLabel, cancelLabel, onConfirm, loading, }: ConfirmDestroyDialogProps): React.JSX.Element;
