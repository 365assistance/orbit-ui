import * as React from "react";
export type MetricChangeDirection = "up" | "down" | "flat";
export interface MetricCardProps extends React.ComponentProps<"div"> {
    /** Small grey label under the number (e.g. "Active members"). */
    label: React.ReactNode;
    /** The hero number (e.g. "12,480", "$84.2k", "4m 12s"). */
    value: React.ReactNode;
    /**
     * Optional change indicator. Omit entirely to hide it. `value` is the delta
     * text (e.g. "+3.2%", "-$5.1k"); `context` is the quiet trailing text
     * (e.g. "vs last month").
     */
    change?: {
        value: React.ReactNode;
        context?: React.ReactNode;
        direction?: MetricChangeDirection;
    };
}
/**
 * MetricCard — minimal, number-first KPI tile.
 *
 * @example
 * <MetricCard label="Active members" value="12,480"
 *   change={{ value: "+3.2%", context: "vs last month", direction: "up" }} />
 *
 * @example  // no change line
 * <MetricCard label="Open invoices" value="317" />
 */
export declare function MetricCard({ label, value, change, className, style, ...props }: MetricCardProps): React.JSX.Element;
