// ---------------------------------------------------------------------------
// Drawer — the canonical side panel for EDITING A RECORD with a real form.
//
// Standard (Sofia 2026-10-07): a right-side drawer is the one pattern for
// record editing (Plans, Promotions, future client-config records). Keep Dialog
// for short confirmations / destructive prompts. This replaces the hand-rolled
// fixed-overlay drawer in PlansTab and the inline edit form in PromotionsTab.
//
// Built on the same Radix Dialog primitive as Dialog (Radix has no separate
// Drawer); the Content is anchored to the right edge, full height, sliding in
// from the side. Same tokenised backdrop/elevation, focus-trap, escape, and
// scroll-lock as Dialog.
// ---------------------------------------------------------------------------

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

function Drawer(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="drawer" {...props} />
}

function DrawerTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerClose(props: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="drawer-overlay"
      // Same canonical backdrop as Dialog.
      className={cn(
        "fixed inset-0 z-50 data-open:animate-in data-closed:animate-out data-open:fade-in-0 data-closed:fade-out-0",
        className
      )}
      style={{ background: "rgba(15,23,42,0.68)" }}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  showClose = true,
  width = "min(480px, 100%)",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showClose?: boolean
  /** Panel width. Defaults to the Plans-editor width. */
  width?: string
}) {
  return (
    <DialogPrimitive.Portal data-slot="drawer-portal">
      <DrawerOverlay />
      <DialogPrimitive.Content
        data-slot="drawer-content"
        className={cn(
          "fixed top-0 right-0 z-50 flex h-full flex-col gap-0 overflow-y-auto border-l p-7 duration-200 data-open:animate-in data-closed:animate-out data-open:slide-in-from-right data-closed:slide-out-to-right",
          className
        )}
        style={{
          width,
          background: "var(--card)",
          borderColor: "var(--border-default)",
          boxShadow: "var(--shadow-lg)",
        }}
        {...props}
      >
        {children}
        {showClose && (
          <DialogPrimitive.Close
            data-slot="drawer-close-button"
            className="absolute top-5 right-5 rounded-sm opacity-70 transition-opacity outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none"
            style={{ color: "var(--ink-muted)" }}
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-1.5 pr-8 text-left", className)}
      {...props}
    />
  )
}

/** Scrollable body between the header and the footer. */
function DrawerBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-body"
      className={cn("flex-1 py-5", className)}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "mt-auto flex flex-row justify-end gap-2 border-t pt-4",
        className
      )}
      style={{ borderColor: "var(--border-default)" }}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-lg font-semibold", className)}
      style={{ color: "var(--ink-primary)" }}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm", className)}
      style={{ color: "var(--ink-muted)" }}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
