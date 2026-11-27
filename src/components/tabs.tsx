import * as React from "react"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

// Tabs variants:
//  - "segmented" (default): the pill/segmented control (muted track, active chip
//    with a background + shadow). Good for a small set of top-level destinations.
//  - "underline": a borderless tab bar with an active underline. Preferred for
//    in-card filters / sub-navigation (Sofia). Supports an optional count pill
//    per trigger via <TabsTrigger count={n}>.
type TabsVariant = "segmented" | "underline"

const TabsVariantContext = React.createContext<TabsVariant>("segmented")

function Tabs({
  className,
  variant = "segmented",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root> & { variant?: TabsVariant }) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root
        data-slot="tabs"
        data-variant={variant}
        className={cn("flex flex-col gap-4", className)}
        {...props}
      />
    </TabsVariantContext.Provider>
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const variant = React.useContext(TabsVariantContext)
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        variant === "underline"
          ? "inline-flex w-full items-center gap-6 border-b border-border text-muted-foreground"
          : "inline-flex h-9 w-fit items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  count,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & { count?: number }) {
  const variant = React.useContext(TabsVariantContext)

  if (variant === "underline") {
    return (
      <TabsPrimitive.Trigger
        data-slot="tabs-trigger"
        data-variant="underline"
        className={cn(
          "group/tab -mb-px inline-flex items-center gap-2 border-0 border-b-2 border-transparent bg-transparent pb-2.5 text-sm font-medium text-muted-foreground transition-colors",
          "cursor-pointer focus-visible:outline-none",
          "data-[state=active]:border-primary data-[state=active]:text-primary",
          className
        )}
        {...props}
      >
        {children}
        {count != null && (
          <span
            className={cn(
              "inline-flex h-5 min-w-5 items-center justify-center rounded-full border px-1.5 text-xs",
              "border-border text-muted-foreground",
              "group-data-[state=active]/tab:border-primary group-data-[state=active]/tab:text-primary"
            )}
          >
            {count}
          </span>
        )}
      </TabsPrimitive.Trigger>
    )
  }

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        className
      )}
      {...props}
    >
      {children}
      {count != null && (
        <span className="ml-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-muted px-1.5 text-xs">
          {count}
        </span>
      )}
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
