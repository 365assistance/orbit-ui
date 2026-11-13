import * as React from "react";
export type PillVariant = "neutral" | "brand" | "success" | "warning" | "danger" | "ghost";
export interface PillProps extends React.ComponentProps<"span"> {
    variant?: PillVariant;
    /** Visual style: soft tinted fill (default) or coloured outline on transparent fill. */
    appearance?: "soft" | "outline";
}
export declare function Pill({ variant, appearance, className, style, ...props }: PillProps): React.JSX.Element;
