import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { FilterSelect } from './filter-select'

const meta = {
  title: 'Primitives/FilterSelect',
  component: FilterSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Compact pill dropdown used in the FilterBar (e.g. "All Status", "All Plans"). Same height (h-8) as the default Button so it lines up in a toolbar. Styled Radix DropdownMenu, on-brand menu.',
      },
    },
  },
} satisfies Meta<typeof FilterSelect>

export default meta
type Story = StoryObj<typeof meta>

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'pending', label: 'Pending' },
  { value: 'expired', label: 'Expired' },
]

export const Default: Story = {
  args: {
    value: 'all',
    options: statusOptions,
    onChange: () => {},
    ariaLabel: 'Filter by status',
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value)
    return (
      <FilterSelect
        {...args}
        value={value}
        onChange={setValue}
      />
    )
  },
}

export const InAToolbar: Story = {
  args: { value: 'all', options: statusOptions, onChange: () => {} },
  render: () => {
    const [status, setStatus] = React.useState('active')
    const [plan, setPlan] = React.useState('all')
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <FilterSelect
          value={status}
          onChange={setStatus}
          options={statusOptions}
          ariaLabel="Filter by status"
        />
        <FilterSelect
          value={plan}
          onChange={setPlan}
          options={[
            { value: 'all', label: 'All Plans' },
            { value: 'basic', label: 'Basic' },
            { value: 'premium', label: 'Premium' },
          ]}
          ariaLabel="Filter by plan"
        />
      </div>
    )
  },
}
