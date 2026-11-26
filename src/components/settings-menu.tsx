// ---------------------------------------------------------------------------
// SettingsMenu — the cog settings dropdown (Jira-style, sectioned).
//
// A trigger (the cog icon button) that opens a sectioned menu: each section has
// a heading and items of icon + title + description, with an optional search
// field. Approved design (Sofia 2026-11-26) for the Orbit settings entry point.
// Built on the unified radix-ui Popover. Tokens over hardcoded hex.
// ---------------------------------------------------------------------------

import * as React from "react"
import { Popover } from "radix-ui"
import { Settings, Search } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SettingsMenuItem {
  key: string
  title: React.ReactNode
  description?: React.ReactNode
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
  href?: string
}

export interface SettingsMenuSection {
  label: React.ReactNode
  items: SettingsMenuItem[]
}

export interface SettingsMenuProps {
  sections: SettingsMenuSection[]
  onSelect?: (key: string, item: SettingsMenuItem) => void
  /** Show the search field at the top. Default true. */
  searchable?: boolean
  /** Accessible label for the trigger. Default "Settings". */
  triggerLabel?: string
  className?: string
}

export function SettingsMenu({
  sections,
  onSelect,
  searchable = true,
  triggerLabel = "Settings",
  className,
}: SettingsMenuProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-label={triggerLabel}
          data-slot="settings-menu-trigger"
          className={cn(
            "grid min-h-[36px] min-w-[36px] place-items-center rounded-lg",
            "hover:bg-[var(--orbit-surface-muted,var(--surface-alt,#f0f2f8))]",
            "aria-expanded:bg-[var(--orbit-surface-muted,var(--surface-alt,#f0f2f8))]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orbit-focus-ring,var(--primary))]",
            className
          )}
          style={{ color: "var(--orbit-text-muted, var(--ink-muted, #707885))" }}
        >
          <Settings className="h-[18px] w-[18px]" aria-hidden />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="end"
          sideOffset={8}
          className="z-[1000] w-[380px] overflow-hidden rounded-[14px] border p-[10px] shadow-[var(--shadow-lg,0_18px_50px_rgba(36,45,56,.20))]"
          style={{
            background: "var(--orbit-surface, var(--card, #fff))",
            borderColor: "var(--orbit-border, var(--border-default, #e2e4e9))",
            maxHeight: "80vh",
            overflowY: "auto",
            fontFamily: "var(--font-sans)",
          }}
        >
          {searchable && (
            <div
              className="mx-2 mb-2.5 mt-1.5 flex items-center gap-2 rounded-[9px] px-2.5 py-2 text-sm"
              style={{
                border: "1px solid var(--orbit-border, var(--border-default, #D8DEE6))",
                color: "var(--orbit-text-muted, var(--ink-muted, #707885))",
              }}
            >
              <Search className="h-[15px] w-[15px]" aria-hidden />
              Search settings
            </div>
          )}

          {sections.map((section, si) => (
            <div key={si}>
              <div
                className="px-3 pb-1.5 pt-3 text-[11px] font-extrabold uppercase tracking-[0.05em]"
                style={{ color: "var(--orbit-text-muted, var(--ink-muted, #707885))" }}
              >
                {section.label}
              </div>
              {section.items.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.key}
                    href={item.href ?? "#"}
                    role="menuitem"
                    onClick={(e) => {
                      if (!item.href) e.preventDefault()
                      onSelect?.(item.key, item)
                      setOpen(false)
                    }}
                    className="flex items-start gap-3 rounded-[9px] px-3 py-2.5 no-underline"
                    style={{ color: "var(--orbit-text, var(--ink-primary, #242d38))" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "var(--orbit-brand-tint, var(--accent, #F6E9F6))")
                    }
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span
                      className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[9px]"
                      style={{
                        background: "var(--orbit-brand-tint, var(--accent, #F6E9F6))",
                        color: "var(--orbit-brand-primary, var(--primary, #92248E))",
                      }}
                    >
                      {Icon && <Icon className="h-[18px] w-[18px]" aria-hidden />}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold leading-tight">{item.title}</span>
                      {item.description && (
                        <span
                          className="mt-0.5 text-xs leading-snug"
                          style={{ color: "var(--orbit-text-muted, var(--ink-muted, #707885))" }}
                        >
                          {item.description}
                        </span>
                      )}
                    </span>
                  </a>
                )
              })}
            </div>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
