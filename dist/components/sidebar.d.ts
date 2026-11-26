import * as React from "react";
export interface SidebarChild {
    /** Stable key, used for the active state and onNavigate. */
    key: string;
    label: React.ReactNode;
    /** Optional href. If omitted, onNavigate(key) is the only signal. */
    href?: string;
}
export interface SidebarItem {
    /** Stable key, used for the active state and onNavigate. */
    key: string;
    label: React.ReactNode;
    /** Optional leading icon (lucide-react component or any SVG component). */
    icon?: React.ComponentType<{
        className?: string;
        "aria-hidden"?: boolean;
    }>;
    /** Optional href. If omitted, onNavigate(key) is the only signal. */
    href?: string;
    /**
     * Optional sub-items. When present, this item becomes an expandable group:
     * clicking it toggles the children rather than navigating. A group shows as
     * open/active when one of its children is the active item. In the collapsed
     * icon rail, groups are not expandable (clicking still calls onNavigate for
     * the group key so the host can expand the rail if it wants).
     */
    children?: SidebarChild[];
}
export interface SidebarSection {
    /** Optional section heading (e.g. "Workflow", "Finance"). */
    label?: React.ReactNode;
    items: SidebarItem[];
}
export interface SidebarProps {
    /** Brand mark shown at the top (e.g. the Orbit365 wordmark). */
    brand?: React.ReactNode;
    /** Compact brand mark shown when collapsed (e.g. just the "O"). Optional. */
    brandCollapsed?: React.ReactNode;
    sections: SidebarSection[];
    /** Key of the active item. */
    activeKey?: string;
    /** Called when an item is clicked (key, and the item). */
    onNavigate?: (key: string, item: SidebarItem) => void;
    /** Footer slot (e.g. help + user). */
    footer?: React.ReactNode;
    /** Footer slot shown when collapsed (compact). Falls back to hiding footer. */
    footerCollapsed?: React.ReactNode;
    /** Show the collapse toggle and allow the icon-rail mode. */
    collapsible?: boolean;
    /** Controlled collapsed state. Omit to let the Sidebar manage its own. */
    collapsed?: boolean;
    /** Called when the collapse toggle is clicked (with the next collapsed value). */
    onToggleCollapsed?: (collapsed: boolean) => void;
    /**
     * Where the collapse toggle sits:
     * - "floating": a small circular button on the sidebar's right edge (does not
     *   crowd the logo in the narrow rail). Default.
     * - "bottom": a full-width toggle row at the bottom of the sidebar.
     * - "bottom-dot": a small circular toggle on the bottom-right edge of the nav.
     */
    collapseToggle?: "floating" | "bottom" | "bottom-dot";
    className?: string;
}
export declare function Sidebar({ brand, brandCollapsed, sections, activeKey, onNavigate, footer, footerCollapsed, collapsible, collapsed: collapsedProp, onToggleCollapsed, collapseToggle, className, }: SidebarProps): React.JSX.Element;
