// ---------------------------------------------------------------------------
// MultiSelect — a searchable multi-select with selected items shown as removable
// chips inside the field. Click/type to open a portalled, filterable dropdown of
// the remaining options; pick one to add it as a chip; click the chip's × (or
// backspace on an empty query) to remove.
//
// Portals the dropdown to <body> (with pointer-events:auto) so it works inside a
// Modal/Drawer and escapes overflow/stacking contexts, matching PortalSelect.
// ---------------------------------------------------------------------------
import * as React from "react"
import { createPortal } from "react-dom"
import { ChevronDown, X, Check } from "lucide-react"

import { cn } from "@/lib/utils"

export interface MultiSelectOption {
  value: string
  label: string
  /** Optional secondary line shown under the label in the dropdown. */
  description?: string
}

export interface MultiSelectProps {
  /** Currently selected values. */
  value: string[]
  options: MultiSelectOption[]
  onChange: (next: string[]) => void
  placeholder?: string
  /** Placeholder for the inline search input. Defaults to "Search…". */
  searchPlaceholder?: string
  disabled?: boolean
  "aria-label"?: string
  className?: string
}

export function MultiSelect({
  value,
  options,
  onChange,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  disabled = false,
  className,
  ...rest
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const fieldRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const [rect, setRect] = React.useState<{ left: number; top: number; width: number; maxHeight: number; placement: 'down' | 'up' } | null>(null)

  const byValue = React.useMemo(() => new Map(options.map((o) => [o.value, o])), [options])
  const selectedOptions = value.map((v) => byValue.get(v)).filter(Boolean) as MultiSelectOption[]
  const available = options.filter(
    (o) => !value.includes(o.value) && o.label.toLowerCase().includes(query.trim().toLowerCase())
  )

  const place = React.useCallback(() => {
    const el = fieldRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const GAP = 4
    const MARGIN = 8
    const spaceBelow = window.innerHeight - r.bottom - GAP - MARGIN
    const spaceAbove = r.top - GAP - MARGIN
    // Flip up when there isn't a comfortable amount of room below and there's
    // more room above. The list always scrolls within whichever space it gets.
    const flipUp = spaceBelow < 180 && spaceAbove > spaceBelow
    const maxHeight = Math.max(120, Math.min(300, flipUp ? spaceAbove : spaceBelow))
    setRect({
      left: r.left,
      width: r.width,
      maxHeight,
      placement: flipUp ? 'up' : 'down',
      top: flipUp ? r.top - GAP : r.bottom + GAP,
    })
  }, [])

  React.useLayoutEffect(() => {
    if (open) place()
  }, [open, place, value.length])

  React.useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node
      if (fieldRef.current?.contains(t) || menuRef.current?.contains(t)) return
      setOpen(false)
    }
    const onReflow = () => place()
    document.addEventListener("mousedown", onDoc)
    window.addEventListener("resize", onReflow)
    window.addEventListener("scroll", onReflow, true)
    return () => {
      document.removeEventListener("mousedown", onDoc)
      window.removeEventListener("resize", onReflow)
      window.removeEventListener("scroll", onReflow, true)
    }
  }, [open, place])

  const add = (v: string) => {
    onChange([...value, v])
    setQuery("")
    inputRef.current?.focus()
  }
  const remove = (v: string) => onChange(value.filter((x) => x !== v))

  return (
    <div className={cn("relative", className)}>
      <div
        ref={fieldRef}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={rest["aria-label"]}
        aria-expanded={open}
        onClick={() => {
          if (disabled) return
          setOpen(true)
          inputRef.current?.focus()
        }}
        className={cn(
          "flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-lg border border-input bg-card px-2 py-1.5 text-sm transition-colors",
          "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
          disabled && "pointer-events-none cursor-not-allowed bg-muted opacity-100"
        )}
      >
        {selectedOptions.map((o) => (
          <span
            key={o.value}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground"
          >
            {o.label}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                remove(o.value)
              }}
              aria-label={`Remove ${o.label}`}
              className="grid size-3.5 place-items-center rounded-sm text-muted-foreground hover:text-foreground"
            >
              <X className="size-3" aria-hidden />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={query}
          disabled={disabled}
          onChange={(e) => {
            setQuery(e.target.value)
            if (!open) setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && query === "" && value.length > 0) {
              remove(value[value.length - 1])
            }
          }}
          placeholder={selectedOptions.length === 0 ? placeholder : searchPlaceholder}
          className="min-w-[80px] flex-1 border-0 bg-transparent p-0.5 text-sm outline-none placeholder:text-muted-foreground"
        />
        <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} aria-hidden />
      </div>

      {open && rect != null && createPortal(
        <div
          ref={menuRef}
          role="listbox"
          style={{
            position: "fixed",
            left: rect.left,
            top: rect.top,
            transform: rect.placement === "up" ? "translateY(-100%)" : undefined,
            width: rect.width,
            maxHeight: rect.maxHeight,
            pointerEvents: "auto",
            zIndex: 1001,
          }}
          className="overflow-auto rounded-lg border border-border bg-popover p-1 shadow-[0_18px_50px_rgba(16,24,40,0.14)]"
        >
          {available.length === 0 ? (
            <p className="px-2 py-3 text-center text-xs text-muted-foreground">
              {query ? "No matches." : "Nothing to add."}
            </p>
          ) : (
            available.map((o) => (
              <button
                key={o.value}
                type="button"
                role="option"
                aria-selected={false}
                onClick={() => add(o.value)}
                className="flex w-full items-start gap-2.5 rounded-md px-2.5 py-2 text-left text-sm text-foreground outline-none hover:bg-muted focus-visible:bg-muted"
              >
                <Check className="mt-0.5 size-4 shrink-0 opacity-0" aria-hidden />
                <span className="min-w-0">
                  <span className="block truncate font-medium">{o.label}</span>
                  {o.description && <span className="block truncate text-xs text-muted-foreground">{o.description}</span>}
                </span>
              </button>
            ))
          )}
        </div>,
        document.body
      )}
    </div>
  )
}
