// ---------------------------------------------------------------------------
// AppShell + TopBar — the canonical Orbit application frame.
//
// AppShell lays out the fixed Sidebar on the left, a TopBar header, and the
// scrolling #main content region. Promoted from the live app shell + the
// approved finance-nav design (Sofia 2026-11-26). Tokens over hardcoded hex.
//
// The shell only arranges; pass the Sidebar as `sidebar`, header bits via
// TopBar, and the page content as children.
// ---------------------------------------------------------------------------

import * as React from "react"

import { cn } from "@/lib/utils"

export interface TopBarProps {
  /** Page title (h1). */
  title?: React.ReactNode
  /** Left-of-title slot (e.g. a mobile menu button or breadcrumb). */
  leading?: React.ReactNode
  /** Right-aligned actions (search, settings cog, user, etc.). */
  actions?: React.ReactNode
  className?: string
}

export function TopBar({ title, leading, actions, className }: TopBarProps) {
  return (
    <header
      data-slot="top-bar"
      aria-label="Site header"
      className={cn("flex min-h-[56px] items-center gap-3 px-5", className)}
      style={{
        background: "var(--orbit-surface, var(--card, #fff))",
        borderBottom: "1px solid var(--orbit-border, var(--border-default, #e2e4e9))",
        fontFamily: "var(--font-sans)",
      }}
    >
      {leading}
      {title != null && (
        <h1
          className="truncate text-lg font-semibold"
          style={{ color: "var(--orbit-text, var(--ink-primary, #242d38))" }}
        >
          {title}
        </h1>
      )}
      {actions != null && (
        <div className="ml-auto flex items-center gap-1">{actions}</div>
      )}
    </header>
  )
}

export interface AppShellProps {
  /** The <Sidebar/>. */
  sidebar: React.ReactNode
  /** The <TopBar/>. Optional (some screens are chromeless). */
  topBar?: React.ReactNode
  /** Page content (rendered inside #main, scrolls). */
  children: React.ReactNode
  className?: string
}

export function AppShell({ sidebar, topBar, children, className }: AppShellProps) {
  return (
    <div
      data-slot="app-shell"
      className={cn("flex h-screen w-full overflow-hidden", className)}
      style={{ background: "var(--orbit-bg, var(--surface, #f8f9fb))" }}
    >
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
        {topBar}
        <main
          id="main"
          className="orbit-thin-scrollbar min-w-0 flex-1 overflow-y-auto"
        >
          {children}
        </main>
      </div>
    </div>
  )
}
