import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
  TableFilter,
  ActiveFilterChips,
  type FilterGroup,
  type FilterSelection,
} from './table-filter'

const meta = {
  title: 'Patterns/TableFilter',
  component: TableFilter,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'One "Filters" button that holds every table filter in a single popover, with a count of active filters, grouped checkbox sections, and Apply/Reset (Sofia 2026-11-26, Option 1). Pair with ActiveFilterChips to show applied filters as removable chips above the table. Replaces a row of separate FilterSelect dropdowns on data-dense tables.',
      },
    },
  },
} satisfies Meta<typeof TableFilter>

export default meta
type Story = StoryObj<typeof meta>

const groups: FilterGroup[] = [
  {
    id: 'status',
    label: 'Status',
    options: [
      { value: 'active', label: 'Active' },
      { value: 'pending', label: 'Pending' },
      { value: 'expired', label: 'Expired' },
    ],
  },
  {
    id: 'plan',
    label: 'Plan',
    options: [
      { value: 'premium', label: 'Premium' },
      { value: 'basic', label: 'Basic' },
    ],
  },
]

export const Default: Story = {
  args: { groups, value: {}, onChange: () => {} },
  render: () => {
    const [filters, setFilters] = React.useState<FilterSelection>({
      status: ['active', 'pending'],
      plan: ['premium'],
    })
    return (
      <div style={{ width: 760 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
          <TableFilter groups={groups} value={filters} onChange={setFilters} />
        </div>
        <ActiveFilterChips groups={groups} value={filters} onChange={setFilters} />
      </div>
    )
  },
}

export const Empty: Story = {
  args: { groups, value: {}, onChange: () => {} },
  render: () => {
    const [filters, setFilters] = React.useState<FilterSelection>({})
    return (
      <div style={{ width: 760, display: 'flex', justifyContent: 'flex-end' }}>
        <TableFilter groups={groups} value={filters} onChange={setFilters} />
      </div>
    )
  },
}

export const OnTableCard: Story = {
  args: { groups, value: {}, onChange: () => {} },
  render: () => {
    const [filters, setFilters] = React.useState<FilterSelection>({ status: ['active'] })
    return (
      <div
        style={{
          width: 820,
          border: '1px solid var(--border-default, #e2e4e9)',
          borderRadius: 14,
          overflow: 'hidden',
          background: 'var(--card, #fff)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderBottom: '1px solid var(--border-subtle, #eef1f5)' }}>
          <strong style={{ fontSize: 15 }}>Invoices</strong>
          <div style={{ flex: 1 }} />
          <TableFilter groups={groups} value={filters} onChange={setFilters} />
        </div>
        {Object.values(filters).some((a) => a?.length) && (
          <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--border-subtle, #eef1f5)' }}>
            <ActiveFilterChips groups={groups} value={filters} onChange={setFilters} />
          </div>
        )}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Invoice', 'Customer', 'Status', 'Amount'].map((h) => (
                <th key={h} style={{ textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--ink-muted)', background: 'var(--surface-alt, #f0f2f8)', padding: '11px 18px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['INV-1042', 'Acme Pty Ltd', 'Active', '$1,240'],
              ['INV-1044', 'Initech', 'Active', '$2,110'],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((c, i) => (
                  <td key={i} style={{ padding: '13px 18px', fontSize: 14, borderTop: '1px solid var(--border-subtle, #eef1f5)' }}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  },
}
