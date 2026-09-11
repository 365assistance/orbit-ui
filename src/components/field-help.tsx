import { HelpCircle } from "lucide-react"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/tooltip"

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
export function FieldHelp({
  label,
  children,
}: {
  /** Accessible label, e.g. "Help: registration plate". */
  label: string
  /** Tooltip body content. */
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          className="inline-flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2"
          style={{
            color: "var(--primary)",
            background: "none",
            border: "none",
            cursor: "help",
            padding: 0,
            // @ts-expect-error -- CSS var for focus ring colour
            "--tw-ring-color": "var(--primary)",
          }}
        >
          <HelpCircle className="h-3.5 w-3.5" aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  )
}
