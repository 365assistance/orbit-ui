import * as React from "react"
import * as ToastPrimitive from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react"

import { cn } from "@/lib/utils"

// ---------------------------------------------------------------------------
// Toast — the canonical Orbit toast, promoted from the live app
// (orbit-core-ui src/components/ui/toast.tsx + use-toast + toaster).
//
// Radix-based (native swipe-to-dismiss + hover/focus pause of the timer).
// Top-right viewport. Variants: info | success | warning | error. Errors never
// auto-dismiss on a timer. Call the module-level `toast(...)` from anywhere;
// render <Toaster/> once near the app root.
// ---------------------------------------------------------------------------

export type ToastVariant = "info" | "success" | "warning" | "error"

export interface ToastOptions {
  variant?: ToastVariant
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
  /** Auto-dismiss timer in ms. Ignored for `error` — those stay until dismissed. */
  duration?: number
  dismissible?: boolean
}

interface ToastRecord extends ToastOptions {
  id: string
  open: boolean
}

const MAX_VISIBLE = 3
const DEFAULT_DURATION = 5000

let toasts: ToastRecord[] = []
const listeners = new Set<(toasts: ToastRecord[]) => void>()

function emit() {
  for (const listener of listeners) listener(toasts)
}

function dismiss(id: string) {
  toasts = toasts.map((t) => (t.id === id ? { ...t, open: false } : t))
  emit()
  // Give the close animation a moment before removing from the DOM.
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id)
    emit()
  }, 200)
}

/** Fire a toast from anywhere. Returns { id, dismiss }. */
export function toast(options: ToastOptions) {
  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
  const variant = options.variant ?? "info"
  const record: ToastRecord = {
    id,
    open: true,
    dismissible: true,
    ...options,
    variant,
    // An error must never auto-dismiss on a timer alone. Applied after the
    // spread so a caller-supplied duration can't defeat it.
    duration: variant === "error" ? Infinity : options.duration ?? DEFAULT_DURATION,
  }

  toasts = [...toasts, record].slice(-MAX_VISIBLE)
  emit()

  return { id, dismiss: () => dismiss(id) }
}

export function useToast() {
  const [state, setState] = React.useState<ToastRecord[]>(toasts)
  React.useEffect(() => {
    listeners.add(setState)
    return () => {
      listeners.delete(setState)
    }
  }, [])
  return { toasts: state, toast, dismiss }
}

// ── Primitives ───────────────────────────────────────────────────────────────

const ToastRadixProvider = ToastPrimitive.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 right-0 z-[100] m-0 flex w-full max-w-[420px] list-none flex-col gap-2 p-4 outline-none sm:top-4 sm:right-4",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = "ToastViewport"

const toastVariants = cva(
  [
    "group pointer-events-auto relative flex w-full items-start gap-3 rounded-xl border p-4",
    "shadow-[0_18px_50px_rgba(16,24,40,0.14)]",
    "data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-80",
    "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
    "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out]",
    "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
    "motion-reduce:transition-none motion-reduce:data-[state=open]:animate-none motion-reduce:data-[state=closed]:animate-none",
  ].join(" "),
  {
    variants: {
      variant: {
        info: "bg-[var(--orbit-info-bg)] border-[var(--orbit-info)]/30 text-foreground",
        success: "bg-[var(--orbit-success-bg)] border-[var(--orbit-success)]/30 text-foreground",
        warning: "bg-[var(--orbit-warning-bg)] border-[var(--orbit-warning)]/30 text-foreground",
        error: "bg-[var(--orbit-error-bg)] border-[var(--orbit-error)]/30 text-foreground",
      },
    },
    defaultVariants: { variant: "info" },
  }
)

const iconByVariant = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
} as const

const iconColorByVariant: Record<keyof typeof iconByVariant, string> = {
  info: "text-[var(--orbit-info)]",
  success: "text-[var(--orbit-success)]",
  warning: "text-[var(--orbit-warning)]",
  error: "text-[var(--orbit-error)]",
}

export interface ToastRootProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {}

const ToastRoot = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastRootProps>(
  ({ className, variant = "info", ...props }, ref) => (
    <ToastPrimitive.Root
      ref={ref}
      role={variant === "error" ? "alert" : "status"}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
)
ToastRoot.displayName = "ToastRoot"

const ToastIcon: React.FC<{ variant: keyof typeof iconByVariant }> = ({ variant }) => {
  const Icon = iconByVariant[variant]
  return <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", iconColorByVariant[variant])} aria-hidden />
}

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Title ref={ref} className={cn("text-sm font-semibold", className)} {...props} />
))
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Description ref={ref} className={cn("mt-1 text-xs text-muted-foreground", className)} {...props} />
))
ToastDescription.displayName = "ToastDescription"

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Action
    ref={ref}
    className={cn(
      "shrink-0 rounded-lg px-2 py-1 text-sm font-medium underline underline-offset-2",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = "ToastAction"

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Close
    ref={ref}
    aria-label="Dismiss"
    className={cn(
      "absolute top-2.5 right-2.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg text-muted-foreground",
      "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
    {...props}
  >
    <X className="h-4 w-4" aria-hidden />
  </ToastPrimitive.Close>
))
ToastClose.displayName = "ToastClose"

// ── Toaster ──────────────────────────────────────────────────────────────────
// Render once near the app root. Subscribes to the module-level toast store.

export function Toaster() {
  const { toasts: items } = useToast()

  return (
    <ToastRadixProvider>
      {items.map(({ id, open, variant = "info", title, description, action, duration }) => (
        <ToastRoot
          key={id}
          variant={variant}
          open={open}
          duration={duration === Infinity ? undefined : duration}
          onOpenChange={(next) => {
            if (!next) dismiss(id)
          }}
        >
          <ToastIcon variant={variant} />
          <div className="flex-1 pr-6">
            <ToastTitle>{title}</ToastTitle>
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action && (
            <ToastAction altText={action.label} onClick={action.onClick}>
              {action.label}
            </ToastAction>
          )}
          <ToastClose />
        </ToastRoot>
      ))}
      <ToastViewport />
    </ToastRadixProvider>
  )
}

/**
 * Back-compat convenience: a provider that just renders the Toaster alongside
 * children, so existing `<ToastProvider><App/></ToastProvider>` wiring keeps
 * working. The module-level `toast()` store is global, so this only needs to
 * mount the <Toaster/> once.
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

export {
  Toaster as OrbitToaster,
  ToastViewport,
  ToastRoot,
  ToastIcon,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
}
