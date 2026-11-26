import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Textarea — multi-line text input.
 *
 * Shares the Input visual language (same border, radius, focus ring, disabled
 * and invalid states) but drops the fixed single-line height for a sensible
 * multi-line min-height and vertical resize. Use for descriptions, notes, and
 * any free-text field that needs more than one line.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-h-16 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none field-sizing-content resize-y placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
