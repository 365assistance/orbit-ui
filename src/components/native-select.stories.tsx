import type { Meta, StoryObj } from '@storybook/react-vite'
import { NativeSelect } from './native-select'

const meta = {
  title: 'Primitives/NativeSelect',
  component: NativeSelect,
  tags: ['autodocs'],
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NativeSelect defaultValue="toyota">
      <option value="toyota">Toyota</option>
      <option value="vga">VGA</option>
      <option value="other">Other</option>
    </NativeSelect>
  ),
}
