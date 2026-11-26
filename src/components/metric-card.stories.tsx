import type { Meta, StoryObj } from '@storybook/react-vite'
import { MetricCard } from './metric-card'

const meta = {
  title: 'Patterns/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The canonical dashboard KPI tile (Sofia 2026-11-26, audit Option B). Minimal and number-first: the number is the hero, a small grey label sits beneath, and an optional change line can be shown or hidden per use. No icon, no trend graph, tokens only.',
      },
    },
  },
} satisfies Meta<typeof MetricCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Active members',
    value: '12,480',
    change: { value: '+3.2%', context: 'vs last month', direction: 'up' },
  },
}

export const NoChangeLine: Story = {
  args: { label: 'Open invoices', value: '317' },
}

export const NegativeChange: Story = {
  args: {
    label: 'Overdue amount',
    value: '$84.2k',
    change: { value: '+$5.1k', context: 'vs last month', direction: 'down' },
  },
}

export const Grid: Story = {
  args: { label: 'Active members', value: '12,480' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, maxWidth: 1000 }}>
      <MetricCard label="Active members" value="12,480" change={{ value: '+3.2%', context: 'vs last month', direction: 'up' }} />
      <MetricCard label="Open invoices" value="317" change={{ value: '-1.4%', context: 'vs last month', direction: 'down' }} />
      <MetricCard label="Avg handle time" value="4m 12s" change={{ value: '-6s', context: 'vs last week', direction: 'up' }} />
      <MetricCard label="Overdue amount" value="$84.2k" />
    </div>
  ),
}
