import * as React from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
declare function Drawer(props: React.ComponentProps<typeof DialogPrimitive.Root>): React.JSX.Element;
declare function DrawerTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>): React.JSX.Element;
declare function DrawerClose(props: React.ComponentProps<typeof DialogPrimitive.Close>): React.JSX.Element;
declare function DrawerOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>): React.JSX.Element;
declare function DrawerContent({ className, children, showClose, width, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & {
    showClose?: boolean;
    /** Panel width. Defaults to the Plans-editor width. */
    width?: string;
}): React.JSX.Element;
declare function DrawerHeader({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
/** Scrollable body between the header and the footer. */
declare function DrawerBody({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function DrawerFooter({ className, ...props }: React.ComponentProps<"div">): React.JSX.Element;
declare function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>): React.JSX.Element;
declare function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>): React.JSX.Element;
export { Drawer, DrawerTrigger, DrawerClose, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, DrawerTitle, DrawerDescription, };
