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
