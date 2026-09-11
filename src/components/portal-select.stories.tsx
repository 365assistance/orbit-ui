import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { PortalSelect } from './portal-select'

const meta = {
  title: 'Primitives/PortalSelect',
  component: PortalSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Custom on-brand dropdown. Portals its option list to <body> so it escapes overflow/stacking traps, and the open list stays fully styled (unlike a native select). Use when the open list must be on-brand or when a select is being clipped.',
      },
    },
  },
} satisfies Meta<typeof PortalSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('standard')
    return (
      <PortalSelect
        value={value}
        onChange={setValue}
        aria-label="Plan"
        options={[
          { value: 'basic', label: 'Basic' },
          { value: 'standard', label: 'Standard' },
          { value: 'premium', label: 'Premium' },
        ]}
      />
    )
  },
}
