import * as React from "react";
export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** "contained" centres the content at a reading width (forms/settings). */
    width?: "full" | "contained";
}
export declare function PageContainer({ width, className, children, ...props }: PageContainerProps): React.JSX.Element;
export interface PageHeaderProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    /** Right-aligned actions (primary CTA, etc.). */
    actions?: React.ReactNode;
    className?: string;
}
export declare function PageHeader({ title, subtitle, actions, className }: PageHeaderProps): React.JSX.Element;
