// ---------------------------------------------------------------------------
// Sidebar — the canonical Orbit left navigation.
//
// Prop-driven and decoupled (no routing/permissions deps): you pass nav
// sections + the active item key, and an onNavigate callback. This is the
// shared shell navigation promoted from the live app + the approved finance-nav
// design (Sofia 2026-11-26). Tokens over hardcoded hex.
//
// Pairs with AppShell (app-shell.tsx), TopBar, and PageHeader.
// ---------------------------------------------------------------------------

import * as React from "react"

import { cn } from "@/lib/utils"

export interface SidebarItem {
  /** Stable key, used for the active state and onNavigate. */
  key: string
  label: React.ReactNode
  /** Optional leading icon (lucide-react component or any SVG component). */
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  /** Optional href. If omitted, onNavigate(key) is the only signal. */
  href?: string
}

export interface SidebarSection {
  /** Optional section heading (e.g. "Workflow", "Finance"). */
  label?: React.ReactNode
  items: SidebarItem[]
}

export interface SidebarProps {
  /** Brand mark shown at the top (e.g. the Orbit365 wordmark). */
  brand?: React.ReactNode
  sections: SidebarSection[]
  /** Key of the active item. */
  activeKey?: string
  /** Called when an item is clicked (key, and the item). */
  onNavigate?: (key: string, item: SidebarItem) => void
  /** Footer slot (e.g. help + user). */
  footer?: React.ReactNode
  className?: string
}

export function Sidebar({
  brand,
  sections,
  activeKey,
  onNavigate,
  footer,
  className,
}: SidebarProps) {
  return (
    <nav
      data-slot="sidebar"
      aria-label="Primary"
      className={cn("flex h-full w-[248px] shrink-0 flex-col", className)}
      style={{
        background: "var(--orbit-surface, var(--card, #fff))",
        borderRight: "1px solid var(--orbit-border, var(--border-default, #e2e4e9))",
        fontFamily: "var(--font-sans)",
      }}
    >
      {brand != null && (
        <div className="flex min-h-[56px] items-center px-4">{brand}</div>
      )}

      <div className="orbit-thin-scrollbar flex-1 overflow-y-auto py-2">
        {sections.map((section, si) => (
          <div key={si} className="mb-2">
            {section.label != null && (
              <div
                className="px-5 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.06em]"
                style={{ color: "var(--orbit-text-muted, var(--ink-muted, #707885))" }}
              >
                {section.label}
              </div>
            )}
            <ul className="list-none">
              {section.items.map((item) => {
                const active = item.key === activeKey
                const Icon = item.icon
                return (
                  <li key={item.key}>
                    <a
                      href={item.href ?? "#"}
                      aria-current={active ? "page" : undefined}
                      onClick={(e) => {
                        if (!item.href) e.preventDefault()
                        onNavigate?.(item.key, item)
                      }}
                      className={cn(
                        "mx-2 flex min-h-[40px] items-center gap-3 rounded-[10px] px-3 text-sm transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-focus-ring,var(--primary))]"
                      )}
                      style={
                        active
                          ? {
                              background: "var(--orbit-brand-tint, var(--accent, #F5EBFA))",
                              color: "var(--orbit-brand-primary, var(--primary, #92248E))",
                              fontWeight: 600,
                            }
                          : {
                              color: "var(--orbit-text-muted, var(--ink-mid, #5b6470))",
                            }
                      }
                      onMouseEnter={(e) => {
                        if (!active)
                          e.currentTarget.style.background =
                            "var(--orbit-surface-muted, var(--surface-alt, #f0f2f8))"
                      }}
                      onMouseLeave={(e) => {
                        if (!active) e.currentTarget.style.background = "transparent"
                      }}
                    >
                      {Icon && <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />}
                      <span className="flex-1 truncate">{item.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {footer != null && (
        <div
          className="p-2"
          style={{ borderTop: "1px solid var(--orbit-border, var(--border-default, #e2e4e9))" }}
        >
          {footer}
        </div>
      )}
    </nav>
  )
}
