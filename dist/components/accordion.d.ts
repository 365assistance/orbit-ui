import * as React from "react";
import { Accordion as AccordionPrimitive } from "radix-ui";
declare function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>): React.JSX.Element;
declare function AccordionItem({ className, ...props }: React.ComponentProps<typeof AccordionPrimitive.Item>): React.JSX.Element;
declare function AccordionTrigger({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Trigger>): React.JSX.Element;
declare function AccordionContent({ className, children, ...props }: React.ComponentProps<typeof AccordionPrimitive.Content>): React.JSX.Element;
/**
 * CollapsibleSection — a single self-contained collapsible panel.
 *
 * A bordered, rounded container with a clickable header row (title + chevron)
 * and a collapsible body. Use for one-off info/notice sections where a full
 * multi-item Accordion is overkill. Built on the Accordion primitives
 * (single-item, collapsible).
 */
export interface CollapsibleSectionProps {
    title: React.ReactNode;
    defaultOpen?: boolean;
    children: React.ReactNode;
    className?: string;
}
declare function CollapsibleSection({ title, defaultOpen, children, className, }: CollapsibleSectionProps): React.JSX.Element;
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, CollapsibleSection, };
