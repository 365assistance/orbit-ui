import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
type TabsVariant = "segmented" | "underline";
declare function Tabs({ className, variant, ...props }: React.ComponentProps<typeof TabsPrimitive.Root> & {
    variant?: TabsVariant;
}): React.JSX.Element;
declare function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>): React.JSX.Element;
declare function TabsTrigger({ className, count, children, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger> & {
    count?: number;
}): React.JSX.Element;
declare function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>): React.JSX.Element;
export { Tabs, TabsList, TabsTrigger, TabsContent };
