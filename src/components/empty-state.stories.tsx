import type { Meta, StoryObj } from '@storybook/react-vite'
import { EmptyState } from './empty-state'
import { Button } from './button'
import { Inbox } from 'lucide-react'

const meta = {
  title: 'Primitives/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'No tenants yet',
    description: 'Add your first tenant to get started.',
    icon: <Inbox className="size-8" style={{ color: 'var(--ink-faint)' }} />,
    action: <Button variant="pill">Add tenant</Button>,
  },
}
