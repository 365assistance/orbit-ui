import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pill } from './pill'

const meta = {
  title: 'Primitives/Pill',
  component: Pill,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'brand', 'success', 'warning', 'danger', 'ghost'],
    },
    appearance: {
      control: 'inline-radio',
      options: ['soft', 'outline'],
    },
  },
  args: { children: 'Pill' },
} satisfies Meta<typeof Pill>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Pill variant="neutral">Neutral</Pill>
      <Pill variant="brand">Brand</Pill>
      <Pill variant="success">Active</Pill>
      <Pill variant="warning">Grace period</Pill>
      <Pill variant="danger">Expired</Pill>
      <Pill variant="ghost">Ghost</Pill>
    </div>
  ),
}

/** Outlined appearance: coloured border + text, transparent fill (house style for status chips). */
export const Outlined: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Pill variant="brand" appearance="outline">Authorised</Pill>
      <Pill variant="danger" appearance="outline">Overdue</Pill>
      <Pill variant="success" appearance="outline">Paid</Pill>
      <Pill variant="neutral" appearance="outline">Draft</Pill>
    </div>
  ),
}
