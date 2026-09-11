import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Download, RefreshCw } from 'lucide-react'
import { FilterBar } from './filter-bar'
import { FilterSelect } from './filter-select'
import { SearchInput } from './search-input'
import { Button } from './button'

const meta = {
  title: 'Patterns/FilterBar',
  component: FilterBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The standard list toolbar: search on the left, filters + actions on the right, in a bordered panel. Compose FilterBar with SearchInput, FilterSelect and Button. Used across admin lists (Tenants, Members, etc.) so the search/filter row is identical everywhere.',
      },
    },
  },
} satisfies Meta<typeof FilterBar>

export default meta
type Story = StoryObj<typeof meta>

/** Mirrors the Orbit365 Tenants page toolbar. */
export const Default: Story = {
  render: () => {
    const [q, setQ] = useState('')
    const [status, setStatus] = useState('all')
    const [plan, setPlan] = useState('all')
    return (
      <FilterBar
        search={
          <SearchInput value={q} onChange={setQ} placeholder="Search tenants..." ariaLabel="Search tenants" />
        }
        actions={
          <>
            <FilterSelect
              value={status}
              onChange={setStatus}
              ariaLabel="Filter by status"
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'trial', label: 'Trial' },
                { value: 'suspended', label: 'Suspended' },
              ]}
            />
            <FilterSelect
              value={plan}
              onChange={setPlan}
              ariaLabel="Filter by plan"
              options={[
                { value: 'all', label: 'All Plans' },
                { value: 'enterprise', label: 'Enterprise' },
                { value: 'professional', label: 'Professional' },
                { value: 'basic', label: 'Basic' },
              ]}
            />
            <Button variant="outline">
              <Download className="size-4" aria-hidden />
              Export
            </Button>
            <Button variant="outline" size="icon" aria-label="Refresh">
              <RefreshCw className="size-4" aria-hidden />
            </Button>
          </>
        }
      />
    )
  },
}

/** Search only — no right-hand actions. */
export const SearchOnly: Story = {
  render: () => {
    const [q, setQ] = useState('')
    return (
      <FilterBar
        search={<SearchInput value={q} onChange={setQ} placeholder="Search..." ariaLabel="Search" />}
      />
    )
  },
}
