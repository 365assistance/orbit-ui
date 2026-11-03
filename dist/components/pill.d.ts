import * as React from "react";
export type PillVariant = "neutral" | "brand" | "success" | "warning" | "danger" | "ghost";
export interface PillProps extends React.ComponentProps<"span"> {
    variant?: PillVariant;
}
export declare function Pill({ variant, className, style, ...props }: PillProps): React.JSX.Element;
