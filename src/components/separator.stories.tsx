import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from './separator'

const meta = {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <p style={{ fontSize: 14, color: 'var(--ink-primary)' }}>Account</p>
      <Separator style={{ margin: '12px 0' }} />
      <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>Billing</p>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 24 }}>
      <span style={{ fontSize: 14 }}>Edit</span>
      <Separator orientation="vertical" />
      <span style={{ fontSize: 14 }}>Delete</span>
    </div>
  ),
}
