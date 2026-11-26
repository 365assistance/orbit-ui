// ---------------------------------------------------------------------------
// PageHeader + PageContainer — the content-area page frame.
//
// PageContainer is the padded, scrollable shell for a page's content;
// PageHeader is the title + optional subtitle + right-aligned actions row.
// Promoted from the live app page.tsx primitives (Sofia 2026-11-26). Tokens
// over hardcoded hex. Sits inside AppShell's #main.
// ---------------------------------------------------------------------------

import * as React from "react"

import { cn } from "@/lib/utils"

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "contained" centres the content at a reading width (forms/settings). */
  width?: "full" | "contained"
}

export function PageContainer({
  width = "full",
  className,
  children,
  ...props
}: PageContainerProps) {
  return (
    <div
      data-slot="page-container"
      className={cn("w-full", className)}
      style={{ fontFamily: "var(--font-sans)" }}
      {...props}
    >
      <div className={cn("p-8", width === "contained" && "mx-auto max-w-5xl")}>
        {children}
      </div>
    </div>
  )
}

export interface PageHeaderProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  /** Right-aligned actions (primary CTA, etc.). */
  actions?: React.ReactNode
  className?: string
}

export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      className={cn("mb-8 flex items-start justify-between gap-4", className)}
    >
      <div className="min-w-0">
        {title != null && title !== "" && (
          <h1
            className="text-[28px] font-bold leading-tight tracking-tight"
            style={{ color: "var(--orbit-text, var(--ink-primary, #242d38))" }}
          >
            {title}
          </h1>
        )}
        {subtitle && (
          <p
            className="mt-1 max-w-2xl text-sm leading-relaxed"
            style={{ color: "var(--orbit-text-muted, var(--ink-muted, #707885))" }}
          >
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  )
}
