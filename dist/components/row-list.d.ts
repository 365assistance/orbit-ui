import * as React from "react";
/**
 * RowList / RowItem — the airy borderless hover-row list from the vibe
 * direction. NOT a gridline table: rows have no dividers, just a soft hover
 * highlight and a rounded corner on hover. Use for ENTITY LISTS (clients,
 * single sends) where each row is a thing you click into. For multi-column
 * DATA GRIDS (plans, promotions, members, transactions) use Table instead.
 *
 * Composition (left to right):
 *   RowAvatar    — 38px rounded tile, coloured fill, initials
 *   RowPrimary   — two-line cell: bold primary + muted secondary
 *   <StatusChip> — state pill (import from ./status-chip)
 *   RowPill      — neutral outline type pill (e.g. channel: SMS / Email)
 *   RowNumber    — right-aligned tabular-nums count/amount
 *   RowKebab     — the "more" affordance
 *
 * RowItem lays these out with a configurable grid. Pass `columns` to match the
 * cells you render (use FIXED column widths so chips/numbers line up down the
 * list, e.g. "46px 1fr 120px 120px").
 */
declare function RowList({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function RowItem({ active, columns, className, style, ...props }: React.ComponentProps<"div"> & {
    active?: boolean;
    columns?: string;
}): React.JSX.Element;
declare function RowAvatar({ color, children, className, style, ...props }: React.ComponentProps<"div"> & {
    color?: string;
}): React.JSX.Element;
declare function RowPrimary({ primary, secondary, className, ...props }: React.ComponentProps<"div"> & {
    primary: React.ReactNode;
    secondary?: React.ReactNode;
}): React.JSX.Element;
/** Neutral outline "type" pill (e.g. channel tag). Chips-only pill radius. */
declare function RowPill({ className, style, ...props }: React.ComponentProps<"span">): React.JSX.Element;
/** Right-aligned tabular-nums number cell (counts / amounts). */
declare function RowNumber({ className, style, ...props }: React.ComponentProps<"div">): React.JSX.Element;
/** The kebab / "more" affordance at the end of a row. */
declare function RowKebab({ className, children, style, ...props }: React.ComponentProps<"button">): React.JSX.Element;
export { RowList, RowItem, RowAvatar, RowPrimary, RowPill, RowNumber, RowKebab };
