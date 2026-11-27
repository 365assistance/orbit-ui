import * as React from "react";
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Full name — used to derive initials and (optionally) an auto colour. */
    name?: string;
    /** Image URL. Falls back to initials if it fails to load. */
    src?: string;
    /** Background colour for the initials circle. Omit for an auto colour from name. */
    color?: string;
    size?: AvatarSize;
    /** Fallback content (e.g. an icon) when there's no name/src. */
    children?: React.ReactNode;
}
export declare function initialsFrom(name?: string): string;
export declare function avatarColorFromName(name?: string): string;
export declare function Avatar({ name, src, color, size, children, className, style, ...rest }: AvatarProps): React.JSX.Element;
