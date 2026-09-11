// ---------------------------------------------------------------------------
// Toast — portal-wide transient feedback (Radix Toast wrapper).
//
// Why: the audit found exactly ONE toast in the whole app — a bespoke
// useState + setTimeout in ClientsPage.tsx (POLISH-AUDIT §3 "Toast"). Every
// other page that needs feedback has none. This ships a real provider so any
// component can call `toast({...})`.
//
// Usage:
//   Wrap the app once:  <ToastProvider> ... </ToastProvider>
//   Anywhere below:     const { toast } = useToast();
//                       toast({ title: "Saved", variant: "success" });
//
// Follows the SegmentedControl pattern: small, typed, self-contained, tokens
// over hardcoded hex. Semantic colour comes from the --orbit-*-bg / --orbit-*
// token pairs; a coloured left border carries the accent.
// ---------------------------------------------------------------------------

import * as React from "react"
import { Toast as ToastPrimitive } from "radix-ui"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

export type ToastVariant = "default" | "success" | "warning" | "destructive"

export interface ToastOptions {
  title: string
  description?: string
  variant?: ToastVariant
  /** auto-dismiss ms; defaults to 5000 */
  duration?: number
}

interface ToastRecord extends ToastOptions {
  id: number
  open: boolean
}

interface ToastContextValue {
  toast: (opts: ToastOptions) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

/** Token pairs per variant: [accent border/text, background]. */
const VARIANT_STYLE: Record<
  ToastVariant,
  { accent: string; bg: string; text: string }
> = {
  default: {
    accent: "var(--ink-muted)",
    bg: "var(--card)",
    text: "var(--ink-primary)",
  },
  success: {
    accent: "var(--orbit-success)",
    bg: "var(--orbit-success-bg)",
    text: "var(--ink-primary)",
  },
  warning: {
    accent: "var(--orbit-warning)",
    bg: "var(--orbit-warning-bg)",
    text: "var(--ink-primary)",
  },
  destructive: {
    accent: "var(--orbit-error)",
    bg: "var(--orbit-error-bg)",
    text: "var(--ink-primary)",
  },
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([])
  const idRef = React.useRef(0)

  const toast = React.useCallback((opts: ToastOptions) => {
    const id = ++idRef.current
    setToasts((prev) => [...prev, { ...opts, id, open: true }])
  }, [])

  const setOpen = React.useCallback((id: number, open: boolean) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, open } : t))
    )
    if (!open) {
      // Remove after the close animation settles.
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 250)
    }
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastPrimitive.Provider swipeDirection="right" duration={5000}>
        {children}
        {toasts.map((t) => {
          const style = VARIANT_STYLE[t.variant ?? "default"]
          return (
            <ToastPrimitive.Root
              key={t.id}
              open={t.open}
              onOpenChange={(open) => setOpen(t.id, open)}
              duration={t.duration ?? 5000}
              className={cn(
                "grid grid-cols-[1fr_auto] items-start gap-3 p-4 data-open:animate-in data-closed:animate-out data-open:slide-in-from-right-full data-closed:fade-out-0 data-[swipe=end]:animate-out"
              )}
              style={{
                width: 340,
                maxWidth: "calc(100vw - 32px)",
                background: style.bg,
                color: style.text,
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-md)",
                borderLeft: `3px solid ${style.accent}`,
              }}
            >
              <div className="grid gap-0.5">
                <ToastPrimitive.Title className="text-label" style={{ color: style.text }}>
                  {t.title}
                </ToastPrimitive.Title>
                {t.description && (
                  <ToastPrimitive.Description
                    className="text-body-sm"
                    style={{ color: "var(--ink-muted)" }}
                  >
                    {t.description}
                  </ToastPrimitive.Description>
                )}
              </div>
              <ToastPrimitive.Close
                aria-label="Close"
                className="rounded-sm opacity-60 transition-opacity outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring"
                style={{ color: "var(--ink-muted)" }}
              >
                <X className="size-4" />
              </ToastPrimitive.Close>
            </ToastPrimitive.Root>
          )
        })}
        <ToastPrimitive.Viewport
          className="fixed top-0 right-0 z-[100] m-0 flex w-auto max-w-[100vw] list-none flex-col gap-2 p-4 outline-none"
        />
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext)
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>")
  }
  return ctx
}
