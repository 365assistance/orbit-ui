import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusChip } from './status-chip'

const meta = {
  title: 'Primitives/StatusChip',
  component: StatusChip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'One canonical status pill (outline + coloured dot) for every status across the admin. Client-config / go-live variants (ready, live, in-progress, not-started, opted-in, opted-out) added 2026-10-07 so the clients table, config rail and readiness checklist all use the same component.',
      },
    },
  },
} satisfies Meta<typeof StatusChip>

export default meta
type Story = StoryObj<typeof meta>

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>{children}</div>
)

export const ClientConfigGoLive: Story = {
  name: 'Client config / go-live',
  render: () => (
    <Row>
      <StatusChip variant="live" />
      <StatusChip variant="ready" />
      <StatusChip variant="in-progress" />
      <StatusChip variant="not-started" />
      <StatusChip variant="opted-in" />
      <StatusChip variant="opted-out" />
    </Row>
  ),
}

export const GenericLifecycle: Story = {
  render: () => (
    <Row>
      <StatusChip variant="completed" />
      <StatusChip variant="in-process" />
      <StatusChip variant="scheduled" />
      <StatusChip variant="draft" />
      <StatusChip variant="failed" />
    </Row>
  ),
}

export const CustomLabel: Story = {
  render: () => (
    <Row>
      <StatusChip variant="ready">Ready to go live</StatusChip>
      <StatusChip variant="in-progress">2 of 10 complete</StatusChip>
    </Row>
  ),
}
