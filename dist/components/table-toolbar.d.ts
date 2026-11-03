import * as React from "react";
/**
 * TableToolbar — the canonical header row that sits ABOVE a data-grid Table.
 *
 * Standardised 2026-10-07 because the data-grid tabs (Plans / Promotions /
 * Audiences) each had a different header: one was title + count, one was a
 * lone right-aligned button, one was title only. This gives every list the
 * SAME structure: a title (+ optional count/subtitle) on the left, and an
 * optional primary action on the right.
 *
 * RULES:
 *  - Always give a `title`. Add `count` (or `subtitle`) when the list has a
 *    meaningful total.
 *  - `action` is the primary CTA (canonical Button). Omit it for read-only /
 *    system-populated lists (e.g. Plans come from CAPS, so no create button).
 *  - Action copy: sentence case, one verb, e.g. "Create audience",
 *    "Create promo code" (NOT "Create Promo Code").
 */
export interface TableToolbarProps {
    title: React.ReactNode;
    /** A count rendered as the subtitle, e.g. 33 -> "33 audiences". Pass `countLabel` for the noun. */
    count?: number | null;
    /** Noun for the count line (e.g. "audiences"). Pluralised naively. */
    countLabel?: string;
    /** Free-form subtitle (used instead of count when provided). */
    subtitle?: React.ReactNode;
    /** Primary action (canonical Button). Omit for read-only lists. */
    action?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare function TableToolbar({ title, count, countLabel, subtitle, action, className, style, }: TableToolbarProps): React.JSX.Element;
