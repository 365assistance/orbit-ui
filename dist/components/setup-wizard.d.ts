import * as React from "react";
/**
 * SetupWizard — the canonical MULTI-STEP SETUP shell.
 *
 * Standard (Sofia 2026-10-20): a modal with a VERTICAL STEPPER down the left
 * and the active step's FORM + ACTIONS on the right is THE pattern for any
 * genuinely multi-step setup/creation flow across the vibe UI (e.g. Create
 * Tenant, onboarding). For single-form create/edit of one record, use
 * EntityDrawer instead.
 *
 * This component owns the chrome (modal, left rail with progress, right pane,
 * Back/Next footer). You own the step content: pass `steps` (labels + optional
 * descriptions) and render the current step's fields via the `children`
 * render-prop (receives the active index). Validation/adv; you decide via
 * `onNext`/`canAdvance`.
 *
 * USAGE RULES:
 *  - Steps: 3+ is the sweet spot; for 1–2 simple steps prefer a drawer/modal.
 *  - The left rail shows step status (done = check, current = filled, upcoming
 *    = muted) + an "X/Y completed" progress bar. Keep step labels short.
 *  - Footer: Back (outline, hidden on first step) + primary (Next, or the
 *    `finishLabel` on the last step). `loading` disables + relabels the primary.
 *  - `supportSlot` (optional) renders bottom-left of the rail (e.g. Call
 *    Support). Use consistently across wizards or not at all.
 */
export interface SetupWizardStep {
    /** Short step label, e.g. "Project Info". */
    label: string;
    /** Optional one-line description under the label in the rail. */
    description?: string;
}
export interface SetupWizardProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Wizard title, shown top-left of the rail. */
    title: React.ReactNode;
    /** Optional sub-line under the title. */
    subtitle?: React.ReactNode;
    steps: SetupWizardStep[];
    /** Controlled active step index. */
    activeStep: number;
    /** Called when the stepper/footer requests a step change. */
    onStepChange: (index: number) => void;
    /** Advance handler (Next). Return/throw is up to caller; use with canAdvance. */
    onNext: () => void;
    /** Finish handler (primary on the last step). */
    onFinish: () => void;
    /** Gate the Next/Finish button (e.g. current step invalid). Default true. */
    canAdvance?: boolean;
    /** Allow clicking completed steps in the rail to jump back. Default true. */
    allowStepJump?: boolean;
    /** Primary label on the last step. Default "Finish". */
    finishLabel?: React.ReactNode;
    /** Disables footer + relabels primary while submitting. */
    loading?: boolean;
    /** Optional bottom-left rail slot (e.g. a Call Support link). */
    supportSlot?: React.ReactNode;
    /** Render-prop for the active step's content. */
    children: (activeStep: number) => React.ReactNode;
    className?: string;
}
export declare function SetupWizard({ open, onOpenChange, title, subtitle, steps, activeStep, onStepChange, onNext, onFinish, canAdvance, allowStepJump, finishLabel, loading, supportSlot, children, className, }: SetupWizardProps): React.JSX.Element;
