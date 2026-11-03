import * as React from "react";
/**
 * HeroStatCard + StatCard — the two stat surfaces from the vibe direction.
 *
 * HeroStatCard: the single magenta focal block per view. White text on
 * --primary, a subtle concentric-circle motif, an optional eyebrow pill, and
 * one bold headline. One per page maximum (brand rule: one hero colour block,
 * everything else quiet).
 *
 * StatCard: a quiet white card with one big bold number and a small grey
 * label. Hierarchy comes from size/weight/colour, not decoration.
 */
declare function HeroStatCard({ eyebrow, children, className, style, ...props }: React.ComponentProps<"div"> & {
    eyebrow?: React.ReactNode;
}): React.JSX.Element;
/** The one bold headline line inside a HeroStatCard. */
declare function HeroStatHeadline({ className, style, ...props }: React.ComponentProps<"h2">): React.JSX.Element;
/** Icon-tile accent colours for StatCard. Colour must mean something
 *  (restrained-colour rule): use brand for the headline metric, info/success/
 *  warning/danger for semantic counts, neutral for plain context. */
export type StatCardColor = "brand" | "info" | "success" | "warning" | "danger" | "neutral";
declare function StatCard({ label, value, icon: Icon, color, children, className, style, ...props }: React.ComponentProps<"div"> & {
    label?: React.ReactNode;
    value?: React.ReactNode;
    /** Optional leading icon. When set, the card uses the horizontal
     *  icon-tile layout (tile + label/value stack); otherwise the plain
     *  vertical layout. */
    icon?: React.ComponentType<{
        className?: string;
    }>;
    /** Icon-tile accent colour (only used when `icon` is set). Default brand. */
    color?: StatCardColor;
}): React.JSX.Element;
export { HeroStatCard, HeroStatHeadline, StatCard };
