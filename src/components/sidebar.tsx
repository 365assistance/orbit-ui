// ---------------------------------------------------------------------------
// Sidebar — the canonical Orbit left navigation.
//
// Prop-driven and decoupled (no routing/permissions deps): you pass nav
// sections + the active item key, and an onNavigate callback. This is the
// shared shell navigation promoted from the live app + the approved finance-nav
// design (Sofia 2026-11-26). Tokens over hardcoded hex.
//
// Collapsible (Sofia 2026-11-26): pass `collapsible` with controlled
// `collapsed` + `onToggleCollapsed`, or let it manage its own state. Collapsed
// = a slim icon rail (labels + section headings hidden, labels become title
// tooltips).
//
// Pairs with AppShell (app-shell.tsx), TopBar, and PageHeader.
// ---------------------------------------------------------------------------

import * as React from "react"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

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
  /** Compact brand mark shown when collapsed (e.g. just the "O"). Optional. */
  brandCollapsed?: React.ReactNode
  sections: SidebarSection[]
  /** Key of the active item. */
  activeKey?: string
  /** Called when an item is clicked (key, and the item). */
  onNavigate?: (key: string, item: SidebarItem) => void
  /** Footer slot (e.g. help + user). */
  footer?: React.ReactNode
  /** Footer slot shown when collapsed (compact). Falls back to hiding footer. */
  footerCollapsed?: React.ReactNode
  /** Show the collapse toggle and allow the icon-rail mode. */
  collapsible?: boolean
  /** Controlled collapsed state. Omit to let the Sidebar manage its own. */
  collapsed?: boolean
  /** Called when the collapse toggle is clicked (with the next collapsed value). */
  onToggleCollapsed?: (collapsed: boolean) => void
  className?: string
}

export function Sidebar({
  brand,
  brandCollapsed,
  sections,
  activeKey,
  onNavigate,
  footer,
  footerCollapsed,
  collapsible = false,
  collapsed: collapsedProp,
  onToggleCollapsed,
  className,
}: SidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(false)
  const isControlled = collapsedProp !== undefined
  const collapsed = collapsible && (isControlled ? collapsedProp : internalCollapsed)

  const toggle = () => {
    const next = !collapsed
    if (!isControlled) setInternalCollapsed(next)
    onToggleCollapsed?.(next)
  }

  return (
    <nav
      data-slot="sidebar"
      data-collapsed={collapsed ? "" : undefined}
      aria-label="Primary"
      className={cn(
        "flex h-full shrink-0 flex-col transition-[width] duration-150",
        collapsed ? "w-[68px]" : "w-[248px]",
        className
      )}
      style={{
        background: "var(--orbit-surface, var(--card, #fff))",
        borderRight: "1px solid var(--orbit-border, var(--border-default, #e2e4e9))",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div
        className={cn(
          "flex min-h-[56px] items-center gap-2",
          collapsed ? "justify-center px-2" : "px-4"
        )}
      >
        {(brand != null || brandCollapsed != null) && (
          <div className="min-w-0 flex-1 overflow-hidden">
            {collapsed ? (brandCollapsed ?? null) : brand}
          </div>
        )}
        {collapsible && (
          <button
            type="button"
            onClick={toggle}
            aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
            aria-expanded={!collapsed}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg hover:bg-[var(--orbit-surface-muted,var(--surface-alt,#f0f2f8))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-focus-ring,var(--primary))]"
            style={{ color: "var(--orbit-text-muted, var(--ink-muted, #707885))" }}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-[18px] w-[18px]" aria-hidden />
            ) : (
              <PanelLeftClose className="h-[18px] w-[18px]" aria-hidden />
            )}
          </button>
        )}
      </div>

      <div className="orbit-thin-scrollbar flex-1 overflow-y-auto py-2">
        {sections.map((section, si) => (
          <div key={si} className="mb-2">
            {section.label != null && !collapsed && (
              <div
                className="px-5 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.06em]"
                style={{ color: "var(--orbit-text-muted, var(--ink-muted, #707885))" }}
              >
                {section.label}
              </div>
            )}
            {section.label != null && collapsed && si > 0 && (
              <div
                className="mx-3 my-2"
                style={{ borderTop: "1px solid var(--orbit-border, var(--border-default, #e2e4e9))" }}
              />
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
                      title={collapsed && typeof item.label === "string" ? item.label : undefined}
                      onClick={(e) => {
                        if (!item.href) e.preventDefault()
                        onNavigate?.(item.key, item)
                      }}
                      className={cn(
                        "mx-2 flex min-h-[40px] items-center rounded-[10px] text-sm transition-colors",
                        collapsed ? "justify-center px-0" : "gap-3 px-3",
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
                      {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {(footer != null || footerCollapsed != null) && (
        <div
          className={collapsed ? "p-2" : "p-2"}
          style={{ borderTop: "1px solid var(--orbit-border, var(--border-default, #e2e4e9))" }}
        >
          {collapsed ? (footerCollapsed ?? null) : footer}
        </div>
      )}
    </nav>
  )
}
