// ---------------------------------------------------------------------------
// Breadcrumb — portal-wide hierarchy / back-navigation primitive.
//
// Why: the audit found ~6 pages hand-rolling their own back links and
// chevron-joined breadcrumbs with inline lucide icons + useNavigate and
// hardcoded greys (POLISH-AUDIT §3 "Breadcrumb"). This consolidates them into
// one small typed component.
//
// Non-current crumbs are --ink-muted links; the final crumb is --ink-primary
// bold plain text. Chevron separator by default.
//
// Router-agnostic (orbit-ui rule): the library does NOT depend on any router.
// Pass your app's link component via `linkComponent` (e.g. react-router's Link
// or Next's Link). It receives `{ to, className, style, children }`. When
// omitted, crumbs with a `to` fall back to a plain <a href>.
// Follows the SegmentedControl pattern: small, typed, self-contained, tokens.
// ---------------------------------------------------------------------------

import * as React from "react"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

/** Shape orbit-ui expects from a consumer-supplied link component. */
export interface BreadcrumbLinkProps {
  to: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export type BreadcrumbLinkComponent = React.ComponentType<BreadcrumbLinkProps>

export interface BreadcrumbItem {
  label: string
  /** Router path; when omitted the crumb renders as plain (current) text. */
  to?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  /** Separator glyph between crumbs. Defaults to a chevron icon. */
  separator?: React.ReactNode
  /**
   * Consumer's router link component (react-router Link, Next Link, etc.).
   * Keeps orbit-ui router-agnostic. Falls back to a plain <a> when omitted.
   */
  linkComponent?: BreadcrumbLinkComponent
  className?: string
}

export function Breadcrumb({ items, separator, linkComponent, className }: BreadcrumbProps) {
  const LinkComp = linkComponent
  const sep = separator ?? (
    <ChevronRight
      className="size-3.5 shrink-0"
      style={{ color: "var(--ink-subtle)" }}
      aria-hidden
    />
  )

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {isLast || !item.to ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn("text-body-sm")}
                  style={{
                    color: isLast ? "var(--ink-primary)" : "var(--ink-muted)",
                    fontWeight: isLast ? 600 : 400,
                  }}
                >
                  {item.label}
                </span>
              ) : LinkComp ? (
                <LinkComp
                  to={item.to}
                  className="text-body-sm transition-colors hover:underline"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {item.label}
                </LinkComp>
              ) : (
                <a
                  href={item.to}
                  className="text-body-sm transition-colors hover:underline"
                  style={{ color: "var(--ink-muted)" }}
                >
                  {item.label}
                </a>
              )}
              {!isLast && sep}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
