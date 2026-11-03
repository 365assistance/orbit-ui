import * as React from "react";
/**
 * StatusChip — an outline pill with a coloured status dot.
 *
 * The one scannable state affordance from the vibe direction: a neutral outline
 * pill, a small solid dot in the state colour, then the label. Pill radius is
 * intentional here (reserved for chips, not buttons).
 *
 * Two families of variant live here so every status across the admin uses ONE
 * component (no bespoke inline dot+pill markup):
 *
 *  Generic lifecycle (original):
 *    in-process = orange, completed = green, draft = grey,
 *    failed = red (destructive), scheduled = info blue.
 *
 *  Client config / go-live (Sofia 2026-10-07):
 *    ready = green ("configured, safe to switch on")
 *    live = green ("switched on for customers")
 *    in-progress = amber ("still being configured")
 *    not-started = grey
 *    opted-in = green, opted-out = grey
 */
export type StatusVariant = "in-process" | "completed" | "draft" | "failed" | "scheduled" | "ready" | "live" | "in-progress" | "not-started" | "opted-in" | "opted-out";
declare function StatusChip({ variant, children, className, style, ...props }: React.ComponentProps<"span"> & {
    variant: StatusVariant;
}): React.JSX.Element;
export { StatusChip };
