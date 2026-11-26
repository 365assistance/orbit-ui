import * as React from "react";
export type ModalSize = "sm" | "md" | "lg" | "xl";
export interface ModalProps {
    /** Controlled open state. */
    open: boolean;
    /** Called when the modal requests to open/close. */
    onOpenChange: (open: boolean) => void;
    /** Modal heading. */
    title: React.ReactNode;
    /** Optional sub-heading under the title. */
    description?: React.ReactNode;
    /** Width preset. Defaults to md. */
    size?: ModalSize;
    /**
     * If false, Esc and overlay-click will not close the modal. Reserve for a
     * genuinely critical in-flight step; most modals should stay dismissible.
     */
    dismissible?: boolean;
    /** Body content. */
    children?: React.ReactNode;
    /** Action row. Convention: primary right, cancel/ghost to its left. */
    footer?: React.ReactNode;
    /**
     * Full-width rule under the header (and, implicitly, the grey footer bar).
     * Use for modals with a top title bar (e.g. Create Policy).
     */
    headerDivider?: boolean;
    /**
     * Grey footer bar (light grey fill + top rule, flush to the bottom edge).
     * Implied by headerDivider; set explicitly for modals that want the footer
     * bar without a header rule.
     */
    footerBar?: boolean;
    /** Extra class on the content surface. */
    className?: string;
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
export declare function Modal({ open, onOpenChange, title, description, size, dismissible, children, footer, headerDivider, footerBar, className, }: ModalProps): React.JSX.Element;
