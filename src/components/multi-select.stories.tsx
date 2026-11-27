import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { MultiSelect } from './multi-select'

const meta = {
  title: 'Forms/MultiSelect',
  component: MultiSelect,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

const tenants = [
  { value: '365', label: '365 Assistance', description: 'Primary production tenant' },
  { value: 'orbit', label: 'Orbit365 Platform', description: 'Platform / internal tooling' },
  { value: 'reach', label: 'Reach', description: 'Reach member portal tenant' },
  { value: 'renewals', label: 'Renewals', description: 'Renewal portal tenant' },
  { value: 'sandbox', label: 'Sandbox', description: 'Non-production sandbox' },
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(['365'])
    return (
      <div style={{ width: 380 }}>
        <MultiSelect
          value={value}
          onChange={setValue}
          options={tenants}
          placeholder="Add tenants"
          searchPlaceholder="Search tenants…"
          aria-label="Tenant access"
        />
      </div>
    )
  },
}

export const Empty: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>([])
    return (
      <div style={{ width: 380 }}>
        <MultiSelect value={value} onChange={setValue} options={tenants} placeholder="Add tenants" />
      </div>
    )
  },
}
