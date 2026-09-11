import type { Meta, StoryObj } from '@storybook/react-vite'
import { ErrorState } from './error-state'
import { Button } from './button'

const meta = {
  title: 'Primitives/ErrorState',
  component: ErrorState,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['inline', 'page'] },
  },
} satisfies Meta<typeof ErrorState>

export default meta
type Story = StoryObj<typeof meta>

export const Inline: Story = {
  args: {
    variant: 'inline',
    title: "Couldn't load members",
    description: 'Something went wrong fetching this list.',
    action: <Button variant="outline">Retry</Button>,
  },
}

export const Page: Story = {
  args: {
    variant: 'page',
    title: 'This page is unavailable',
    description: 'The tenant may have been removed or you no longer have access.',
    action: <Button variant="pill">Back to tenants</Button>,
  },
}
