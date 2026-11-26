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
    className?: string;
}
export declare function SettingsMenu({ sections, onSelect, searchable, triggerLabel, className, }: SettingsMenuProps): React.JSX.Element;
