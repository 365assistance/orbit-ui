import * as React from "react";
export interface TopBarProps {
    /** Page title (h1). */
    title?: React.ReactNode;
    /** Left-of-title slot (e.g. a mobile menu button or breadcrumb). */
    leading?: React.ReactNode;
    /** Right-aligned actions (search, settings cog, user, etc.). */
    actions?: React.ReactNode;
    className?: string;
}
export declare function TopBar({ title, leading, actions, className }: TopBarProps): React.JSX.Element;
export interface AppShellProps {
    /** The <Sidebar/>. */
    sidebar: React.ReactNode;
    /** The <TopBar/>. Optional (some screens are chromeless). */
    topBar?: React.ReactNode;
    /** Page content (rendered inside #main, scrolls). */
    children: React.ReactNode;
    className?: string;
}
export declare function AppShell({ sidebar, topBar, children, className }: AppShellProps): React.JSX.Element;
