import * as React from "react";
export type PillVariant = "neutral" | "brand" | "info" | "success" | "warning" | "danger" | "ghost";
export interface PillProps extends React.ComponentProps<"span"> {
    variant?: PillVariant;
    /**
     * Visual style: coloured outline on transparent fill (default, the house
     * standard for status chips, Sofia 2026-11-23) or soft tinted fill.
     */
    appearance?: "soft" | "outline";
}
export declare function Pill({ variant, appearance, className, style, ...props }: PillProps): React.JSX.Element;
