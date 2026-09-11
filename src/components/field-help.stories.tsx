import type { Meta, StoryObj } from '@storybook/react-vite'
import { FieldHelp } from './field-help'

const meta = {
  title: 'Primitives/FieldHelp',
  component: FieldHelp,
  tags: ['autodocs'],
} satisfies Meta<typeof FieldHelp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-primary)' }}>Registration plate</span>
      <FieldHelp label="Help: registration plate">
        Enter the plate exactly as it appears on the vehicle, no spaces.
      </FieldHelp>
    </div>
  ),
}
