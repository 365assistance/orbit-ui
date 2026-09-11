import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SegmentedControl } from './SegmentedControl'

const meta = {
  title: 'Primitives/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
} satisfies Meta<typeof SegmentedControl>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('active')
    return (
      <SegmentedControl
        value={value}
        onChange={setValue}
        ariaLabel="Member status filter"
        options={[
          { value: 'active', label: 'Active' },
          { value: 'grace', label: 'Grace' },
          { value: 'expired', label: 'Expired' },
        ]}
      />
    )
  },
}
