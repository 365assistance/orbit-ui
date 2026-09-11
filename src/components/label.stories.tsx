import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './label'
import { Input } from './input'

const meta = {
  title: 'Primitives/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 6, maxWidth: 280 }}>
      <Label htmlFor="mem">Membership number</Label>
      <Input id="mem" placeholder="RSA-2024-000123" />
    </div>
  ),
}
