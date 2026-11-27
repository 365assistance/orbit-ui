import * as React from "react"

import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Avatar — a round identity token. Shows an image when `src` is given, else
// initials on a coloured circle, else a neutral fallback (icon via `children`).
//
// One component for every avatar across the admin (user rows, profile cards,
// assignment chips) so nobody hand-rolls `rounded-full` initial circles.
//
//   <Avatar name="Sofia Frugone" />                    // SF on an auto colour
//   <Avatar name="Sofia Frugone" color="#92248E" />    // fixed colour
//   <Avatar src="/me.png" name="Sofia Frugone" />      // image, initials fallback
//   <Avatar size="lg"><Lock className="size-4" /></Avatar> // icon fallback
// ---------------------------------------------------------------------------

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl"

const SIZE: Record<AvatarSize, { box: string; text: string }> = {
  xs: { box: "size-6", text: "text-[10px]" },
  sm: { box: "size-8", text: "text-xs" },
  md: { box: "size-9", text: "text-[13px]" },
  lg: { box: "size-11", text: "text-sm" },
  xl: { box: "size-14", text: "text-base" },
}

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Full name — used to derive initials and (optionally) an auto colour. */
  name?: string
  /** Image URL. Falls back to initials if it fails to load. */
  src?: string
  /** Background colour for the initials circle. Omit for an auto colour from name. */
  color?: string
  size?: AvatarSize
  /** Fallback content (e.g. an icon) when there's no name/src. */
  children?: React.ReactNode
}

export function initialsFrom(name?: string): string {
  if (!name) return ""
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ""
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

// Deterministic on-brand-ish colour from a string, so the same name always maps
// to the same circle colour without storing one.
const PALETTE = [
  "#92248E", "#2563eb", "#0891b2", "#16a34a", "#d97706",
  "#dc2626", "#7c3aed", "#db2777", "#4f46e5", "#0d9488",
]
export function avatarColorFromName(name?: string): string {
  if (!name) return PALETTE[0]
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return PALETTE[h % PALETTE.length]
}

export function Avatar({
  name,
  src,
  color,
  size = "md",
  children,
  className,
  style,
  ...rest
}: AvatarProps) {
  const [imgOk, setImgOk] = React.useState(true)
  const s = SIZE[size]
  const initials = initialsFrom(name)
  const bg = color ?? avatarColorFromName(name)
  const showImage = src && imgOk

  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-full font-medium text-white",
        s.box,
        s.text,
        className
      )}
      style={{ backgroundColor: showImage ? undefined : initials ? bg : "var(--muted)", color: initials ? "#fff" : "var(--muted-foreground)", ...style }}
      aria-label={name || undefined}
      {...rest}
    >
      {showImage ? (
        <img
          src={src}
          alt={name || ""}
          className="size-full object-cover"
          onError={() => setImgOk(false)}
        />
      ) : initials ? (
        <span aria-hidden>{initials}</span>
      ) : (
        <span aria-hidden className="grid place-items-center">{children}</span>
      )}
    </span>
  )
}
