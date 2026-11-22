import * as React from "react";
/**
 * TableCard — one bordered panel that JOINS the search/filter toolbar, the
 * data table, and the footer into a single card (Sofia 2026-11-13, from the
 * Figma table that uses our UI kit).
 *
 * This is the "joined" alternative to the older layout where <FilterBar/> was a
 * separate bordered card floating ABOVE a separate table card. Here the toolbar,
 * table and footer share ONE border/radius/shadow so they read as a single
 * surface:
 *
 *   ┌─────────────────────────────────────────────┐
 *   │  [search]              [filters] [actions]   │  ← toolbar slot
 *   ├─────────────────────────────────────────────┤
 *   │  TABLE (header band + rows)                  │  ← children (<Table/>)
 *   ├─────────────────────────────────────────────┤
 *   │  Showing X of Y            < Page 1 of 1 >   │  ← footer slot
 *   └─────────────────────────────────────────────┘
 *
 * Compose it with the existing primitives — SearchInput + FilterSelect + Button
 * in the toolbar, <Table/> as children, <Pagination/> (or a count line) in the
 * footer:
 *
 *   <TableCard
 *     search={<SearchInput value={q} onChange={setQ} placeholder="Search…" />}
 *     actions={<>
 *       <FilterSelect ... />
 *       <Button variant="outline"><Download/> Export</Button>
 *     </>}
 *     footer={<Pagination page={p} pageSize={20} total={n} onPageChange={setP} />}
 *   >
 *     <Table>…</Table>
 *   </TableCard>
 *
 * RULES:
 *  - The table divider band and footer divider are drawn BY TableCard, so the
 *    <Table/> inside should not carry its own outer border/card.
 *  - Omit `search`/`actions` to drop the toolbar row entirely (headerless table).
 *  - Omit `footer` to drop the footer row.
 */
export interface TableCardProps {
    /** Left side of the toolbar — typically a <SearchInput/>. */
    search?: React.ReactNode;
    /** Right side of the toolbar — filters, export, refresh, etc. */
    actions?: React.ReactNode;
    /** The table. Render a <Table/> here; TableCard supplies the surrounding card. */
    children: React.ReactNode;
    /** Footer row — typically <Pagination/> or a "Showing X of Y" count line. */
    footer?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
export declare function TableCard({ search, actions, children, footer, className, style, }: TableCardProps): React.JSX.Element;
export default TableCard;
