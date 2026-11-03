import type { Meta, StoryObj } from '@storybook/react-vite'
import { Shield, ShieldCheck, Users, DollarSign, AlertTriangle, CheckCircle2 } from 'lucide-react'
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

/**
 * Icon-tile StatCard — the standard page stats row. A coloured rounded icon
 * tile on the left, label over a big bold value. Use this for the stats row
 * under a PageHeader (see the Page Structure standard). Colour must mean
 * something: brand for the headline metric, info/success/warning/danger for
 * semantic counts, neutral for plain context.
 */
export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 900 }}>
      <StatCard label="Total roles" value={2} icon={Shield} color="brand" />
      <StatCard label="Primary" value={0} icon={ShieldCheck} color="info" />
      <StatCard label="Custom" value={2} icon={Users} color="neutral" />
    </div>
  ),
}

/** Every icon-tile accent colour. */
export const IconColours: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 900 }}>
      <StatCard label="Brand" value={128} icon={Shield} color="brand" />
      <StatCard label="Info" value={42} icon={ShieldCheck} color="info" />
      <StatCard label="Success" value={97} icon={CheckCircle2} color="success" />
      <StatCard label="Warning" value={6} icon={AlertTriangle} color="warning" />
      <StatCard label="Danger" value={3} icon={AlertTriangle} color="danger" />
      <StatCard label="Revenue" value="$12.4k" icon={DollarSign} color="neutral" />
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
