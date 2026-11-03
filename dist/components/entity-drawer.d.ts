import * as React from "react";
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
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Drawer title, e.g. "New User" / "Edit User". */
    title: React.ReactNode;
    /** Optional sub-line under the title. */
    description?: React.ReactNode;
    /** Optional element shown above the title (e.g. an avatar / icon). */
    media?: React.ReactNode;
    /** The form body — compose EntityDrawerSection + FormField. */
    children: React.ReactNode;
    /** Primary action handler (submit). */
    onSubmit: () => void;
    /** Primary button label. Default "Create". */
    submitLabel?: React.ReactNode;
    /** Cancel button label. Default "Cancel". */
    cancelLabel?: React.ReactNode;
    /** Disables inputs/footer and spins the submit button. */
    loading?: boolean;
    /** Disables the submit button (e.g. invalid form). */
    submitDisabled?: boolean;
    /** Panel width. Default min(560px, 100%). */
    width?: string;
    className?: string;
}
export declare function EntityDrawer({ open, onOpenChange, title, description, media, children, onSubmit, submitLabel, cancelLabel, loading, submitDisabled, width, className, }: EntityDrawerProps): React.JSX.Element;
/**
 * EntityDrawerSection — an eyebrow-labelled group of fields inside an
 * EntityDrawer (BASIC / CONTACT / WORK, etc.). Not collapsible (that is
 * FormSection's job for settings tabs); this is just a quiet section heading.
 */
export interface EntityDrawerSectionProps {
    /** Short UPPERCASE eyebrow label, e.g. "BASIC". */
    label?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
}
export declare function EntityDrawerSection({ label, children, className }: EntityDrawerSectionProps): React.JSX.Element;
