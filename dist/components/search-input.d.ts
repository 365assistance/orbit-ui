/**
 * SearchInput — shared search field for admin lists (clients, members, etc.).
 *
 * The base Orbit Input is bg-transparent with a light border, which disappears
 * on grey page backgrounds. This wraps it in a clearly-visible affordance:
 * white fill, defined border, a leading magnifier, and an optional clear button.
 * Tokenised so it stays on-system. Use everywhere search appears so it doesn't
 * drift per-screen.
 */
export declare function SearchInput({ value, onChange, placeholder, ariaLabel, width, }: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    ariaLabel?: string;
    /** Max width in px; pass 0 for full width. */
    width?: number;
}): import("react").JSX.Element;
