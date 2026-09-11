import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from './select'

const meta = {
  title: 'Primitives/Select',
  component: Select,
  tags: ['autodocs'],
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
