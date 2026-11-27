// ---------------------------------------------------------------------------
// Toast — lightweight notification system.
//
// A dependency-light toast: a React context + a useState array of toasts, each
// auto-dismissed after `duration` (default 5000ms) and dismissible manually.
// Wrap your app (or a story) in <ToastProvider>, then call the `toast(...)`
// function from the useToast() hook to fire one.
//
// Variants reuse the same --orbit-success / --orbit-warning / --orbit-info
// tokens as the Alert component (tokens over hardcoded hex), with a destructive
// variant on the --destructive token. Viewport is fixed bottom-right, stacked.
// ---------------------------------------------------------------------------

import * as React from "react"
import {
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"

type ToastVariant = "default" | "success" | "warning" | "destructive"

export interface ToastOptions {
  title: string
  description?: string
  variant?: ToastVariant
  /** Auto-dismiss delay in ms. Default 5000. */
  duration?: number
}

interface ToastRecord extends Required<Omit<ToastOptions, "description">> {
  id: string
  description?: string
}

interface ToastContextValue {
  toast: (opts: ToastOptions) => string
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

/**
 * useToast — returns `{ toast, dismiss }`. `toast(opts)` queues a notification
 * and returns its id; `dismiss(id)` removes it early.
 */
export function useToast(): ToastContextValue {
  const ctx = React.useContext(ToastContext)
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>")
  }
  return ctx
}

const variantIcon: Record<
  ToastVariant,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  default: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  destructive: XCircle,
}

// Accent colour per variant, pulled from the shared Orbit tokens.
const variantAccent: Record<ToastVariant, string> = {
  default: "var(--orbit-info)",
  success: "var(--orbit-success)",
  warning: "var(--orbit-warning)",
  destructive: "var(--destructive)",
}

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: ToastRecord
  onDismiss: (id: string) => void
}) {
  const Icon = variantIcon[toast.variant]
  const accent = variantAccent[toast.variant]
  const [visible, setVisible] = React.useState(false)

  // Fade/slide in on mount.
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div
      data-slot="toast"
      data-variant={toast.variant}
      role="status"
      aria-live="polite"
      className={cn(
        "pointer-events-auto flex w-full items-start gap-3 rounded-lg border bg-card p-3 pr-9 text-card-foreground shadow-md",
        "relative transition-all duration-200 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      )}
    >
      <Icon className="mt-0.5 size-5 shrink-0" style={{ color: accent }} />
      <div className="grid gap-0.5">
        <div data-slot="toast-title" className="text-sm font-semibold leading-tight">
          {toast.title}
        </div>
        {toast.description ? (
          <div
            data-slot="toast-description"
            className="text-sm text-muted-foreground"
          >
            {toast.description}
          </div>
        ) : null}
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => onDismiss(toast.id)}
        className="absolute top-2.5 right-2.5 rounded-sm text-muted-foreground opacity-70 transition-opacity outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}

/**
 * ToastProvider — wrap your app. Renders a fixed bottom-right viewport and
 * provides the toast() / dismiss() API via context.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastRecord[]>([])
  const timers = React.useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timer = timers.current[id]
    if (timer) {
      clearTimeout(timer)
      delete timers.current[id]
    }
  }, [])

  const toast = React.useCallback(
    (opts: ToastOptions) => {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
      const duration = opts.duration ?? 5000
      const record: ToastRecord = {
        id,
        title: opts.title,
        description: opts.description,
        variant: opts.variant ?? "default",
        duration,
      }
      setToasts((prev) => [...prev, record])
      if (duration > 0) {
        timers.current[id] = setTimeout(() => dismiss(id), duration)
      }
      return id
    },
    [dismiss]
  )

  // Clear any pending timers on unmount.
  React.useEffect(() => {
    const current = timers.current
    return () => {
      Object.values(current).forEach(clearTimeout)
    }
  }, [])

  const value = React.useMemo<ToastContextValue>(
    () => ({ toast, dismiss }),
    [toast, dismiss]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        data-slot="toast-viewport"
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2"
      >
        {toasts.map((t) => (
          <ToastCard key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}
