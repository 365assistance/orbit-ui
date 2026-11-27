// ---------------------------------------------------------------------------
// Accordion — vertically stacked, collapsible sections (Radix Accordion wrapper).
//
// Thin shadcn-style wrappers over the unified `radix-ui` Accordion primitive:
// Accordion (Root), AccordionItem, AccordionTrigger, AccordionContent. The
// trigger shows a chevron that rotates 180° when open; the content animates its
// height via the tw-animate-css accordion utilities (graceful if absent).
//
// CollapsibleSection is a convenience wrapper: a single self-contained bordered
// panel with a clickable header + collapsible body, for one-off info/notice
// blocks. Built on the Accordion primitives internally (single-item).
//
// Tokens over hex: border-border dividers, muted chevron, foreground text.
// ---------------------------------------------------------------------------

import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex" data-slot="accordion-header">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-2 py-3 text-left text-sm font-medium text-foreground outline-none transition-all",
          "hover:underline focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm text-muted-foreground",
        "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up",
        className
      )}
      {...props}
    >
      <div className={cn("pb-3 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

/**
 * CollapsibleSection — a single self-contained collapsible panel.
 *
 * A bordered, rounded container with a clickable header row (title + chevron)
 * and a collapsible body. Use for one-off info/notice sections where a full
 * multi-item Accordion is overkill. Built on the Accordion primitives
 * (single-item, collapsible).
 */
export interface CollapsibleSectionProps {
  title: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
  className?: string
}

function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
  className,
}: CollapsibleSectionProps) {
  return (
    <AccordionPrimitive.Root
      type="single"
      collapsible
      defaultValue={defaultOpen ? "section" : undefined}
      data-slot="collapsible-section"
      className={cn(
        "rounded-lg border border-border bg-card text-card-foreground",
        className
      )}
    >
      <AccordionPrimitive.Item value="section" className="border-none">
        <AccordionPrimitive.Header className="flex">
          <AccordionPrimitive.Trigger
            data-slot="collapsible-section-trigger"
            className={cn(
              "group flex flex-1 items-center justify-between gap-2 px-4 py-3 text-left text-sm font-medium text-foreground outline-none transition-all",
              "hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring",
              "data-[state=open]:border-b data-[state=open]:border-border rounded-lg data-[state=open]:rounded-b-none"
            )}
          >
            {title}
            <ChevronDown
              className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
        <AccordionPrimitive.Content
          data-slot="collapsible-section-content"
          className={cn(
            "overflow-hidden text-sm text-muted-foreground",
            "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
          )}
        >
          <div className="px-4 py-3">{children}</div>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  )
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  CollapsibleSection,
}
