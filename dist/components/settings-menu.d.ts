import * as React from "react";
export interface SettingsMenuItem {
    key: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ComponentType<{
        className?: string;
        "aria-hidden"?: boolean;
    }>;
    href?: string;
}
export interface SettingsMenuSection {
    label: React.ReactNode;
    items: SettingsMenuItem[];
}
export interface SettingsMenuProps {
    sections: SettingsMenuSection[];
    onSelect?: (key: string, item: SettingsMenuItem) => void;
    /** Show the search field at the top. Default true. */
    searchable?: boolean;
    /** Accessible label for the trigger. Default "Settings". */
    triggerLabel?: string;
    /**
     * Mark the cog as active (e.g. the user is currently on a settings page).
     * Tints the trigger with the brand colour + a brand-tint background so the
     * entry point reads as "selected".
     */
    active?: boolean;
    /**
     * Key of the settings item the user is currently on. The matching menu item
     * is highlighted (brand tint + purple text) so the open menu shows which
     * settings page is active, mirroring the side nav's active state.
     */
    activeKey?: string;
    /**
     * When provided, renders a "Sign out" row at the bottom of the menu. Called
     * when it is clicked (the menu closes automatically).
     */
    onSignOut?: () => void;
    /** Label for the sign-out row. Default "Sign out". */
    signOutLabel?: React.ReactNode;
    className?: string;
}
export declare function SettingsMenu({ sections, onSelect, searchable, triggerLabel, active, activeKey, onSignOut, signOutLabel, className, }: SettingsMenuProps): React.JSX.Element;
