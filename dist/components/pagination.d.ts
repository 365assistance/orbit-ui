/**
 * Pagination — shared list-footer pagination control.
 *
 * The canonical "Showing X-Y of Z - Previous / Next" list footer. Zero-based
 * `page`. Renders nothing when there is only a single page unless `alwaysShow`
 * is set. `label` overrides the noun in the summary (e.g. "clients").
 */
export interface PaginationProps {
    /** Current page index (0-based). */
    page: number;
    /** Rows per page. */
    pageSize: number;
    /** Total number of rows across all pages (post-filter). */
    total: number;
    /** Called with the next 0-based page index. */
    onPageChange: (page: number) => void;
    /** Noun used in the "Showing X-Y of Z {label}" summary. Default "results". */
    label?: string;
    /** Render even when everything fits on one page. Default false. */
    alwaysShow?: boolean;
    /** Extra margin-top override; defaults to 14px. */
    marginTop?: number;
}
export declare function Pagination({ page, pageSize, total, onPageChange, label, alwaysShow, marginTop, }: PaginationProps): import("react").JSX.Element | null;
export default Pagination;
