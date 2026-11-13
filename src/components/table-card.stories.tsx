import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Eye, Download } from 'lucide-react'
import { TableCard } from './table-card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './table'
import { SearchInput } from './search-input'
import { FilterSelect } from './filter-select'
import { Button } from './button'
import { Pill } from './pill'
import { Pagination } from './pagination'

const meta = {
  title: 'Patterns/TableCard',
  component: TableCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          [
            'TableCard joins the search/filter toolbar, the data table and the footer into ONE bordered card, so they read as a single surface. This is the "joined" layout (from the Figma table built on our UI kit) that replaces the older split layout of a separate FilterBar card floating above a separate table card.',
            '',
            'Compose it with the existing primitives:',
            '',
            '```tsx',
            '<TableCard',
            '  search={<SearchInput value={q} onChange={setQ} placeholder="Search…" />}',
            '  actions={<>',
            '    <FilterSelect value={status} onChange={setStatus} options={statusOptions} />',
            '    <Button variant="outline"><Download /> Export</Button>',
            '  </>}',
            '  footer={<Pagination page={page} pageSize={20} total={total} onPageChange={setPage} marginTop={0} />}',
            '>',
            '  <Table>{/* TableHeader + TableBody */}</Table>',
            '</TableCard>',
            '```',
            '',
            'Slots: `search` + `actions` form the toolbar row (omit both for a headerless table), `children` is the `<Table/>`, and `footer` is the count/pagination row (omit to drop it). The header band renders flush with the card border. Status chips use `<Pill appearance="outline" />`.',
          ].join('\n'),
      },
    },
  },
} satisfies Meta<typeof TableCard>

export default meta
type Story = StoryObj<typeof meta>

type Invoice = {
  number: string
  reference: string
  contact: string
  email: string
  issueDate: string
  dueDate: string
  terms: string
  source: { count: number; label: string } | null
  total: string
  outstanding: string
  outstandingSettled: boolean
  status: 'Authorised' | 'Overdue' | 'Paid' | 'Draft'
}

// Generic placeholder rows (no real companies/emails). Just enough variety to
// exercise every cell pattern: two-line cells, source pill vs "Manual", the
// four status variants, and settled vs outstanding amounts.
const INVOICES: Invoice[] = [
  {
    number: 'INV-0001', reference: 'Ref 0001',
    contact: 'Northwind Pty Ltd', email: 'accounts@example.com',
    issueDate: '15 Oct 2026', dueDate: '14 Nov 2026', terms: '30 day terms',
    source: { count: 127, label: 'Billing advices' },
    total: '$4,636.57', outstanding: '$4,636.57', outstandingSettled: false, status: 'Authorised',
  },
  {
    number: 'INV-0002', reference: 'Ref 0002',
    contact: 'Contoso Group', email: 'ap@example.com',
    issueDate: '12 Oct 2026', dueDate: '26 Oct 2026', terms: '14 day terms',
    source: { count: 54, label: 'Billing advices' },
    total: '$9,120.00', outstanding: '$9,120.00', outstandingSettled: false, status: 'Overdue',
  },
  {
    number: 'INV-0003', reference: 'Ref 0003',
    contact: 'Fabrikam Finance', email: 'finance@example.com',
    issueDate: '09 Oct 2026', dueDate: '08 Nov 2026', terms: '30 day terms',
    source: null,
    total: '$1,250.00', outstanding: '$0.00', outstandingSettled: true, status: 'Paid',
  },
  {
    number: 'INV-0004', reference: 'Ref 0004',
    contact: 'Adventure Works', email: 'billing@example.com',
    issueDate: '05 Oct 2026', dueDate: '19 Oct 2026', terms: '14 day terms',
    source: { count: 12, label: 'Billing advices' },
    total: '$780.40', outstanding: '$780.40', outstandingSettled: false, status: 'Draft',
  },
]

function statusVariant(status: Invoice['status']) {
  switch (status) {
    case 'Authorised': return 'brand' as const
    case 'Overdue': return 'danger' as const
    case 'Paid': return 'success' as const
    default: return 'neutral' as const
  }
}

/**
 * The joined table from the Figma: search + filters + Export in the toolbar,
 * the data table with two-line cells and outlined status pills, and a footer
 * with the count + pagination, all inside one bordered card.
 */
export const Invoices: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Full example exercising every cell pattern: two-line cells (invoice/reference, contact/email, due date/terms), the source pill vs plain "Manual", all four outlined status variants, and settled vs outstanding amounts. Placeholder data only.',
      },
    },
  },
  render: () => {
    const [q, setQ] = useState('')
    const [page, setPage] = useState(0)
    return (
      <div style={{ background: 'var(--surface-muted,#f7f7f9)', padding: 32, minHeight: 520 }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <TableCard
            search={
              <SearchInput
                ariaLabel="Search invoices"
                placeholder="Search invoice, contact or reference"
                value={q}
                onChange={setQ}
              />
            }
            actions={
              <>
                <FilterSelect
                  value="all-time"
                  onChange={() => {}}
                  options={[
                    { value: 'all-time', label: 'All time' },
                    { value: 'this-month', label: 'This month' },
                    { value: 'this-quarter', label: 'This quarter' },
                  ]}
                />
                <FilterSelect
                  value="all"
                  onChange={() => {}}
                  options={[
                    { value: 'all', label: 'All statuses' },
                    { value: 'authorised', label: 'Authorised' },
                    { value: 'overdue', label: 'Overdue' },
                    { value: 'paid', label: 'Paid' },
                    { value: 'draft', label: 'Draft' },
                  ]}
                />
                <Button variant="outline">
                  <Download className="h-4 w-4" aria-hidden />
                  Export
                </Button>
              </>
            }
            footer={
              <Pagination
                page={page}
                pageSize={6}
                total={INVOICES.length}
                onPageChange={setPage}
                label="invoices"
                alwaysShow
                marginTop={0}
              />
            }
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Issue date</TableHead>
                  <TableHead>Due date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Outstanding</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead aria-label="Actions" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {INVOICES.map((inv) => (
                  <TableRow key={inv.number}>
                    <TableCell>
                      <div style={{ fontWeight: 600, color: 'var(--ink-primary,#111827)' }}>{inv.number}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-muted,#6b7280)' }}>{inv.reference}</div>
                    </TableCell>
                    <TableCell>
                      <div style={{ fontWeight: 600 }}>{inv.contact}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-muted,#6b7280)' }}>{inv.email}</div>
                    </TableCell>
                    <TableCell>{inv.issueDate}</TableCell>
                    <TableCell>
                      <div>{inv.dueDate}</div>
                      <div style={{ fontSize: 13, color: 'var(--ink-muted,#6b7280)' }}>{inv.terms}</div>
                    </TableCell>
                    <TableCell>
                      {inv.source ? (
                        <>
                          <Pill variant="brand" appearance="outline">{inv.source.count} advices</Pill>
                          <div style={{ fontSize: 13, color: 'var(--ink-muted,#6b7280)', marginTop: 4 }}>{inv.source.label}</div>
                        </>
                      ) : (
                        <span style={{ color: 'var(--ink-muted,#6b7280)' }}>Manual</span>
                      )}
                    </TableCell>
                    <TableCell style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{inv.total}</TableCell>
                    <TableCell
                      style={{
                        fontWeight: 600,
                        fontVariantNumeric: 'tabular-nums',
                        color: 'var(--ink-primary,#111827)',
                      }}
                    >
                      {inv.outstanding}
                    </TableCell>
                    <TableCell>
                      <Pill variant={statusVariant(inv.status)} appearance="outline">{inv.status}</Pill>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" aria-label={`View ${inv.number}`}>
                        <Eye className="h-4 w-4" aria-hidden />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCard>
        </div>
      </div>
    )
  },
}

/** Minimal: just search + table + footer, no filters. */
export const SearchOnly: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The smallest useful shape: a single search field in the toolbar, the table, and a pagination footer. Drop the `actions` slot when a list has no filters or bulk actions.',
      },
    },
  },
  render: () => {
    const [q, setQ] = useState('')
    return (
      <div style={{ background: 'var(--surface-muted,#f7f7f9)', padding: 32 }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <TableCard
            search={<SearchInput ariaLabel="Search" placeholder="Search…" value={q} onChange={setQ} />}
            footer={<Pagination page={0} pageSize={6} total={INVOICES.length} onPageChange={() => {}} label="invoices" alwaysShow marginTop={0} />}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INVOICES.map((inv) => (
                  <TableRow key={inv.number}>
                    <TableCell style={{ fontWeight: 600, color: 'var(--ink-primary,#111827)' }}>{inv.number}</TableCell>
                    <TableCell>{inv.contact}</TableCell>
                    <TableCell><Pill variant={statusVariant(inv.status)} appearance="outline">{inv.status}</Pill></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableCard>
        </div>
      </div>
    )
  },
}
