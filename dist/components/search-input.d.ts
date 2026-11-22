/**
 * SearchInput — the ONE shared search field across Orbit (admin lists, pickers,
 * modals: clients, members, tenants, permissions, etc.).
 *
 * Standardised 2026-11-11 (Sofia): one style everywhere so search stops drifting
 * per-screen with different border radii. White fill, defined border, a leading
 * magnifier, moderate rounded corners (8px, matching other Orbit controls), a
 * purple focus ring, and an optional clear button. Use this everywhere search
 * appears — do not hand-roll a search input.
 */
export declare function SearchInput({ value, onChange, placeholder, ariaLabel, width, }: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    ariaLabel?: string;
    /** Max width in px; pass 0 for full width. */
    width?: number;
}): import("react").JSX.Element;
