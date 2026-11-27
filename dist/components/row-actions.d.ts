import * as React from "react";
/**
 * RowActions — the canonical per-row action affordance for data tables/lists.
 *
 * Promoted from the live app (orbit-core-ui src/components/ui/row-actions.tsx).
 * One neutral kebab (⋯) trigger that opens a menu; only genuinely destructive
 * items carry colour (tone="danger"). Rendered through a Radix portal, so it is
 * never clipped by an ancestor's overflow:hidden.
 *
 * Usage:
 *   <RowActions
 *     label={`Actions for ${item.name}`}
 *     items={[
 *       { label: 'Edit', icon: Pencil, onSelect: () => edit(item) },
 *       { separator: true },
 *       { label: 'Delete', icon: Trash2, tone: 'danger', onSelect: () => del(item) },
 *     ]}
 *   />
 */
export type RowActionItem = {
    separator?: false;
    label: string;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    tone?: "default" | "danger";
    disabled?: boolean;
    onSelect: () => void;
} | {
    separator: true;
};
export interface RowActionsProps {
    /** Accessible label for the trigger, e.g. "Actions for Acme Corp". */
    label: string;
    items: RowActionItem[];
    className?: string;
}
export declare function RowActions({ label, items, className }: RowActionsProps): React.JSX.Element;
