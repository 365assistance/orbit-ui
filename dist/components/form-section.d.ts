import * as React from "react";
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
    title: string;
    /** Optional sub-line under the title. Use consistently across siblings or not at all. */
    summary?: string;
    open: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    /** Bottom-of-panel actions (canonical Save + Cancel). */
    footer?: React.ReactNode;
    /** Element shown left of the chevron (e.g. a StatusChip). Use on all siblings or none. */
    headerAccessory?: React.ReactNode;
}
export declare function FormSection({ title, summary, open, onToggle, children, footer, headerAccessory, }: FormSectionProps): React.JSX.Element;
