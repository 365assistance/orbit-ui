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
import { PanelLeftClose, PanelLeftOpen, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SidebarChild {
  /** Stable key, used for the active state and onNavigate. */
  key: string
  label: React.ReactNode
  /** Optional href. If omitted, onNavigate(key) is the only signal. */
  href?: string
}

export interface SidebarItem {
  /** Stable key, used for the active state and onNavigate. */
  key: string
  label: React.ReactNode
  /** Optional leading icon (lucide-react component or any SVG component). */
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  /** Optional href. If omitted, onNavigate(key) is the only signal. */
  href?: string
  /**
   * Optional sub-items. When present, this item becomes an expandable group:
   * clicking it toggles the children rather than navigating. A group shows as
   * open/active when one of its children is the active item. In the collapsed
   * icon rail, groups are not expandable (clicking still calls onNavigate for
   * the group key so the host can expand the rail if it wants).
   */
  children?: SidebarChild[]
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
  /**
   * Where the collapse toggle sits:
   * - "floating": a small circular button on the sidebar's right edge (does not
   *   crowd the logo in the narrow rail). Default.
   * - "bottom": a full-width toggle row at the bottom of the sidebar.
   * - "bottom-dot": a small circular toggle on the bottom-right edge of the nav.
   */
  collapseToggle?: "floating" | "bottom" | "bottom-dot"
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
  collapseToggle = "floating",
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
        position: "relative",
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
          <div className={cn("min-w-0 overflow-hidden", collapsed ? "" : "flex-1")}>
            {collapsed ? (brandCollapsed ?? null) : brand}
          </div>
        )}
        {/* Inline toggle only when expanded AND not using the floating edge
            circle (floating shows its own always-visible control). */}
        {collapsible && !collapsed && collapseToggle !== "floating" && (
          <button
            type="button"
            onClick={toggle}
            aria-label="Collapse navigation"
            aria-expanded
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg hover:bg-[var(--orbit-surface-muted,var(--surface-alt,#f0f2f8))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-focus-ring,var(--primary))]"
            style={{ color: "var(--orbit-text-muted, var(--ink-muted, #707885))" }}
          >
            <PanelLeftClose className="h-[18px] w-[18px]" aria-hidden />
          </button>
        )}
      </div>

      {/* FLOATING toggle: a circle that straddles the sidebar's right edge at the
          top (Dribbble-style). Always visible, in both expanded and collapsed
          states, so it is the single consistent collapse control. */}
      {collapsible && collapseToggle === "floating" && (
        <button
          type="button"
          onClick={toggle}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          aria-expanded={!collapsed}
          className="absolute grid h-8 w-8 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-focus-ring,var(--primary))]"
          style={{
            top: 14,
            right: -16,
            background: "var(--orbit-surface, var(--card, #fff))",
            border: "1px solid var(--orbit-border, var(--border-default, #e2e4e9))",
            boxShadow: "0 2px 8px rgba(16,24,40,.12)",
            color: "var(--orbit-text-muted, var(--ink-muted, #707885))",
            zIndex: 20,
          }}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-[15px] w-[15px]" aria-hidden />
          ) : (
            <PanelLeftClose className="h-[15px] w-[15px]" aria-hidden />
          )}
        </button>
      )}

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
              {section.items.map((item) => (
                <SidebarRow
                  key={item.key}
                  item={item}
                  collapsed={collapsed}
                  activeKey={activeKey}
                  onNavigate={onNavigate}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>

      {(footer != null || footerCollapsed != null) && (
        <div
          className="p-2"
          style={{ borderTop: "1px solid var(--orbit-border, var(--border-default, #e2e4e9))" }}
        >
          {/* Footer never disappears on collapse: use footerCollapsed if given,
              otherwise fall back to the expanded footer. */}
          {collapsed ? (footerCollapsed ?? footer) : footer}
        </div>
      )}

      {/* BOTTOM-DOT toggle option: a circular button on the bottom-right edge. */}
      {collapsible && collapseToggle === "bottom-dot" && (
        <button
          type="button"
          onClick={toggle}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          aria-expanded={!collapsed}
          className="absolute grid h-7 w-7 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-focus-ring,var(--primary))]"
          style={{
            bottom: 18,
            right: 6,
            background: "var(--orbit-surface, var(--card, #fff))",
            border: "1px solid var(--orbit-border, var(--border-default, #e2e4e9))",
            boxShadow: "0 2px 6px rgba(16,24,40,.10)",
            color: "var(--orbit-text-muted, var(--ink-muted, #707885))",
            zIndex: 10,
          }}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-[15px] w-[15px]" aria-hidden />
          ) : (
            <PanelLeftClose className="h-[15px] w-[15px]" aria-hidden />
          )}
        </button>
      )}

      {/* BOTTOM toggle option: a full-width row at the very bottom. */}
      {collapsible && collapseToggle === "bottom" && (
        <button
          type="button"
          onClick={toggle}
          aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
          aria-expanded={!collapsed}
          className={cn(
            "m-2 flex min-h-[40px] items-center rounded-[10px] text-sm transition-colors",
            collapsed ? "justify-center px-0" : "gap-3 px-3",
            "hover:bg-[var(--orbit-surface-muted,var(--surface-alt,#f0f2f8))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-focus-ring,var(--primary))]"
          )}
          style={{
            borderTop: "1px solid var(--orbit-border, var(--border-default, #e2e4e9))",
            color: "var(--orbit-text-muted, var(--ink-muted, #707885))",
          }}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-[18px] w-[18px] shrink-0" aria-hidden />
          ) : (
            <>
              <PanelLeftClose className="h-[18px] w-[18px] shrink-0" aria-hidden />
              <span className="flex-1 truncate text-left">Collapse</span>
            </>
          )}
        </button>
      )}
    </nav>
  )
}

// ---------------------------------------------------------------------------
// SidebarRow — one nav entry. A leaf links/navigates; a group (item.children)
// is an expandable disclosure with indented sub-items. The group auto-opens
// when one of its children is the active item.
// ---------------------------------------------------------------------------

function SidebarRow({
  item,
  collapsed,
  activeKey,
  onNavigate,
}: {
  item: SidebarItem
  collapsed: boolean
  activeKey?: string
  onNavigate?: (key: string, item: SidebarItem) => void
}) {
  const Icon = item.icon
  const hasChildren = !!item.children && item.children.length > 0
  const childActive = hasChildren && item.children!.some((c) => c.key === activeKey)
  const active = item.key === activeKey || childActive

  // Group open state: default open when a child is active; user can toggle.
  const [open, setOpen] = React.useState<boolean>(childActive)
  React.useEffect(() => {
    if (childActive) setOpen(true)
  }, [childActive])

  const baseRow =
    "mx-2 flex min-h-[40px] items-center rounded-[10px] text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-focus-ring,var(--primary))]"

  const rowStyle = (isActive: boolean): React.CSSProperties =>
    isActive
      ? {
          background: "var(--orbit-brand-tint, var(--accent, #F5EBFA))",
          color: "var(--orbit-brand-primary, var(--primary, #92248E))",
          fontWeight: 600,
        }
      : { color: "var(--orbit-text-muted, var(--ink-mid, #5b6470))" }

  const hoverOn = (e: React.MouseEvent<HTMLElement>, isActive: boolean) => {
    if (!isActive)
      e.currentTarget.style.background =
        "var(--orbit-surface-muted, var(--surface-alt, #f0f2f8))"
  }
  const hoverOff = (e: React.MouseEvent<HTMLElement>, isActive: boolean) => {
    if (!isActive) e.currentTarget.style.background = "transparent"
  }

  // ── Leaf item ──────────────────────────────────────────────────────────────
  if (!hasChildren) {
    return (
      <li>
        <a
          href={item.href ?? "#"}
          aria-current={active ? "page" : undefined}
          title={collapsed && typeof item.label === "string" ? item.label : undefined}
          onClick={(e) => {
            if (!item.href) e.preventDefault()
            onNavigate?.(item.key, item)
          }}
          className={cn(baseRow, collapsed ? "justify-center px-0" : "gap-3 px-3")}
          style={rowStyle(active)}
          onMouseEnter={(e) => hoverOn(e, active)}
          onMouseLeave={(e) => hoverOff(e, active)}
        >
          {Icon && <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />}
          {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
        </a>
      </li>
    )
  }

  // ── Expandable group ─────────────────────────────────────────────────────────
  // Collapsed rail: render the group like a leaf (icon only). Clicking signals
  // the host (which can expand the rail); we don't show a flyout here.
  if (collapsed) {
    return (
      <li>
        <button
          type="button"
          title={typeof item.label === "string" ? item.label : undefined}
          onClick={() => onNavigate?.(item.key, item)}
          className={cn(baseRow, "w-[calc(100%-16px)] justify-center border-0 bg-transparent px-0 cursor-pointer")}
          style={rowStyle(active)}
          onMouseEnter={(e) => hoverOn(e, active)}
          onMouseLeave={(e) => hoverOff(e, active)}
        >
          {Icon && <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />}
        </button>
      </li>
    )
  }

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(baseRow, "w-[calc(100%-16px)] gap-3 px-3 border-0 bg-transparent cursor-pointer text-left")}
        style={rowStyle(active && !open ? true : childActive)}
        onMouseEnter={(e) => hoverOn(e, childActive)}
        onMouseLeave={(e) => hoverOff(e, childActive)}
      >
        {Icon && <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden />}
        <span className="flex-1 truncate">{item.label}</span>
        <ChevronRight
          className={cn("h-[15px] w-[15px] shrink-0 transition-transform", open ? "rotate-90" : "")}
          aria-hidden
        />
      </button>

      {open && (
        <ul className="list-none">
          {item.children!.map((child) => {
            const cActive = child.key === activeKey
            return (
              <li key={child.key}>
                <a
                  href={child.href ?? "#"}
                  aria-current={cActive ? "page" : undefined}
                  onClick={(e) => {
                    if (!child.href) e.preventDefault()
                    onNavigate?.(child.key, { key: child.key, label: child.label, href: child.href })
                  }}
                  className={cn(baseRow, "gap-3 pl-[42px] pr-3")}
                  style={rowStyle(cActive)}
                  onMouseEnter={(e) => hoverOn(e, cActive)}
                  onMouseLeave={(e) => hoverOff(e, cActive)}
                >
                  <span className="flex-1 truncate">{child.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </li>
  )
}
