import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { Check, X } from "lucide-react"
import { Button } from "@/components/button"
import { cn } from "@/lib/utils"

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
  label: string
  /** Optional one-line description under the label in the rail. */
  description?: string
}

export interface SetupWizardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Wizard title, shown top-left of the rail. */
  title: React.ReactNode
  /** Optional sub-line under the title. */
  subtitle?: React.ReactNode
  steps: SetupWizardStep[]
  /** Controlled active step index. */
  activeStep: number
  /** Called when the stepper/footer requests a step change. */
  onStepChange: (index: number) => void
  /** Advance handler (Next). Return/throw is up to caller; use with canAdvance. */
  onNext: () => void
  /** Finish handler (primary on the last step). */
  onFinish: () => void
  /** Gate the Next/Finish button (e.g. current step invalid). Default true. */
  canAdvance?: boolean
  /** Allow clicking completed steps in the rail to jump back. Default true. */
  allowStepJump?: boolean
  /** Primary label on the last step. Default "Finish". */
  finishLabel?: React.ReactNode
  /** Disables footer + relabels primary while submitting. */
  loading?: boolean
  /** Optional bottom-left rail slot (e.g. a Call Support link). */
  supportSlot?: React.ReactNode
  /** Render-prop for the active step's content. */
  children: (activeStep: number) => React.ReactNode
  className?: string
}

export function SetupWizard({
  open,
  onOpenChange,
  title,
  subtitle,
  steps,
  activeStep,
  onStepChange,
  onNext,
  onFinish,
  canAdvance = true,
  allowStepJump = true,
  finishLabel = "Finish",
  loading = false,
  supportSlot,
  children,
  className,
}: SetupWizardProps) {
  const isLast = activeStep === steps.length - 1
  const completed = activeStep // steps before the current one are "done"
  const progressPct = Math.round((completed / steps.length) * 100)

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => !loading && onOpenChange(next)}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 data-open:animate-in data-closed:animate-out data-open:fade-in-0 data-closed:fade-out-0"
          style={{ background: "rgba(15,23,42,0.68)" }}
        />
        <DialogPrimitive.Content
          data-slot="setup-wizard"
          className={cn(
            "fixed left-1/2 top-1/2 z-50 flex max-h-[90vh] w-[min(920px,95vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border duration-200 data-open:animate-in data-closed:animate-out data-open:zoom-in-95 data-closed:zoom-out-95",
            className
          )}
          style={{
            background: "var(--card)",
            borderColor: "var(--border-default)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {/* Left rail: title + vertical stepper + progress + support */}
          <aside
            className="flex w-[260px] shrink-0 flex-col justify-between p-6"
            style={{ background: "var(--surface-page)", borderRight: "1px solid var(--border-default)" }}
          >
            <div>
              <DialogPrimitive.Title className="text-base font-semibold" style={{ color: "var(--ink-primary)" }}>
                {title}
              </DialogPrimitive.Title>
              {subtitle && (
                <DialogPrimitive.Description className="mt-1 text-sm" style={{ color: "var(--ink-muted)" }}>
                  {subtitle}
                </DialogPrimitive.Description>
              )}

              <ol className="mt-6 flex flex-col gap-1" aria-label="Setup steps">
                {steps.map((step, i) => {
                  const status = i < activeStep ? "complete" : i === activeStep ? "current" : "upcoming"
                  const jumpable = allowStepJump && i < activeStep && !loading
                  return (
                    <li key={step.label}>
                      <button
                        type="button"
                        disabled={!jumpable}
                        onClick={() => jumpable && onStepChange(i)}
                        aria-current={status === "current" ? "step" : undefined}
                        className={cn(
                          "flex w-full items-start gap-3 rounded-lg p-2 text-left transition-colors",
                          jumpable && "cursor-pointer hover:bg-[var(--surface-alt)]",
                          !jumpable && "cursor-default"
                        )}
                      >
                        <span
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                          style={{
                            background:
                              status === "complete"
                                ? "var(--primary)"
                                : status === "current"
                                  ? "var(--primary)"
                                  : "var(--surface-alt)",
                            color:
                              status === "upcoming" ? "var(--ink-muted)" : "var(--primary-foreground)",
                            border: status === "upcoming" ? "1px solid var(--border-default)" : "none",
                          }}
                        >
                          {status === "complete" ? <Check className="h-3.5 w-3.5" aria-hidden /> : i + 1}
                        </span>
                        <span className="min-w-0">
                          <span
                            className="block text-sm"
                            style={{
                              fontWeight: status === "current" ? 600 : 500,
                              color: status === "upcoming" ? "var(--ink-muted)" : "var(--ink-primary)",
                            }}
                          >
                            <span className="sr-only">
                              Step {i + 1} of {steps.length}:{" "}
                            </span>
                            {step.label}
                          </span>
                          {step.description && (
                            <span className="mt-0.5 block text-xs" style={{ color: "var(--ink-muted)" }}>
                              {step.description}
                            </span>
                          )}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>

            <div className="mt-6">
              <div className="mb-3">
                <div className="mb-1 flex items-center justify-between text-xs" style={{ color: "var(--ink-muted)" }}>
                  <span>
                    {completed}/{steps.length} completed
                  </span>
                  <span>{progressPct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--surface-alt)" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${progressPct}%`, background: "var(--primary)" }}
                  />
                </div>
              </div>
              {supportSlot}
            </div>
          </aside>

          {/* Right pane: active step content + footer */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex-1 overflow-y-auto p-7">
              <h2 className="mb-1 text-lg font-semibold" style={{ color: "var(--ink-primary)" }}>
                {steps[activeStep]?.label}
              </h2>
              {steps[activeStep]?.description && (
                <p className="mb-5 text-sm" style={{ color: "var(--ink-muted)" }}>
                  {steps[activeStep].description}
                </p>
              )}
              <div className={steps[activeStep]?.description ? "" : "mt-4"}>{children(activeStep)}</div>
            </div>

            <div
              className="flex items-center justify-between gap-2 border-t p-5"
              style={{ borderColor: "var(--border-default)" }}
            >
              <Button
                variant="outline"
                onClick={() => onStepChange(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0 || loading}
                className={activeStep === 0 ? "invisible" : ""}
              >
                Back
              </Button>
              <Button
                onClick={isLast ? onFinish : onNext}
                disabled={!canAdvance || loading}
                className="min-w-[120px]"
              >
                {loading ? "Saving…" : isLast ? finishLabel : "Next"}
              </Button>
            </div>
          </div>

          <DialogPrimitive.Close
            className="absolute right-4 top-4 rounded-sm opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none"
            style={{ color: "var(--ink-muted)" }}
            disabled={loading}
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
