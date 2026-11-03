/**
 * FieldHelp — an inline, accessible help affordance for a form field.
 *
 * Renders a small help-circle icon next to a label. Hover/focus reveals a
 * tooltip with the guidance that previously sat as helper text under the input.
 * Keeps the form visually clean while preserving the information for users who
 * want it. Keyboard-focusable; tooltip is also triggered on focus (Radix).
 *
 * `label` is the accessible name announced to screen readers (the visible
 * tooltip text is supplementary, per Orbit a11y: icon affordances need an
 * aria-label as the source of truth).
 */
export declare function FieldHelp({ label, children, }: {
    /** Accessible label, e.g. "Help: registration plate". */
    label: string;
    /** Tooltip body content. */
    children: React.ReactNode;
}): import("react").JSX.Element;
