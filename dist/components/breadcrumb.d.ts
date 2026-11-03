import * as React from "react";
/** Shape orbit-ui expects from a consumer-supplied link component. */
export interface BreadcrumbLinkProps {
    to: string;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}
export type BreadcrumbLinkComponent = React.ComponentType<BreadcrumbLinkProps>;
export interface BreadcrumbItem {
    label: string;
    /** Router path; when omitted the crumb renders as plain (current) text. */
    to?: string;
}
export interface BreadcrumbProps {
    items: BreadcrumbItem[];
    /** Separator glyph between crumbs. Defaults to a chevron icon. */
    separator?: React.ReactNode;
    /**
     * Consumer's router link component (react-router Link, Next Link, etc.).
     * Keeps orbit-ui router-agnostic. Falls back to a plain <a> when omitted.
     */
    linkComponent?: BreadcrumbLinkComponent;
    className?: string;
}
export declare function Breadcrumb({ items, separator, linkComponent, className }: BreadcrumbProps): React.JSX.Element;
