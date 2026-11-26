import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
/**
 * Checkbox — square boolean control.
 *
 * Shares the Input visual language (border-input, focus ring). Unchecked is a
 * neutral bordered box; checked/indeterminate fills with the brand primary and
 * shows a white check / dash. Supports the Radix `indeterminate` state (pass
 * checked="indeterminate").
 *
 * Pair with <Label> for a clickable label, or wrap label + checkbox yourself.
 */
declare function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>): React.JSX.Element;
export { Checkbox };
