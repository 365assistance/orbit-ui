import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from './select'

const meta = {
  title: 'Deprecated/Select (use PortalSelect)',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'DEPRECATED (Sofia 2026-11-26). The plain Radix Select is being consolidated into PortalSelect (the single on-brand styled dropdown). Use PortalSelect instead, or NativeSelect only when native <select> form semantics are required. Kept until migrations land.',
      },
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger style={{ minWidth: 220 }}>
        <SelectValue placeholder="Choose a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="basic">Basic</SelectItem>
        <SelectItem value="standard">Standard</SelectItem>
        <SelectItem value="premium">Premium</SelectItem>
      </SelectContent>
    </Select>
  ),
}
