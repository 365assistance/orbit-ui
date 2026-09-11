import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { DateTimePicker } from './date-time-picker'

const meta = {
  title: 'Primitives/DateTimePicker',
  component: DateTimePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DateTimePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return <DateTimePicker value={value} onChange={setValue} placeholder="Select date & time" ariaLabel="Renewal date" />
  },
}

export const DateOnly: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return <DateTimePicker value={value} onChange={setValue} dateOnly placeholder="Select date" ariaLabel="Promo date" />
  },
}
