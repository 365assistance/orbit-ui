import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './input'

const meta = {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'Membership number' },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true, placeholder: 'Disabled' } }

export const WithValue: Story = {
  args: { defaultValue: 'RSA-2024-000123' },
}
