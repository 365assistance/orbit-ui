import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeroStatCard, HeroStatHeadline, StatCard } from './stat-card'

const meta = {
  title: 'Patterns/StatCard',
  component: StatCard,
  tags: ['autodocs'],
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const StatTiles: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 720 }}>
      <StatCard label="Live clients" value="12" />
      <StatCard label="Ready clients" value="4" />
      <StatCard label="Opted out" value="3" />
    </div>
  ),
}

export const Hero: Story = {
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <HeroStatCard eyebrow="Clients">
        <HeroStatHeadline>19 client groups</HeroStatHeadline>
      </HeroStatCard>
    </div>
  ),
}
