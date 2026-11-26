import * as React from "react";
/**
 * Textarea — multi-line text input.
 *
 * Shares the Input visual language (same border, radius, focus ring, disabled
 * and invalid states) but drops the fixed single-line height for a sensible
 * multi-line min-height and vertical resize. Use for descriptions, notes, and
 * any free-text field that needs more than one line.
 */
declare function Textarea({ className, ...props }: React.ComponentProps<"textarea">): React.JSX.Element;
export { Textarea };
