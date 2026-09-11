import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip'
import { Button } from './button'

const meta = {
  title: 'Primitives/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    // Give the trigger room so the tooltip isn't jammed against the canvas edge.
    (Story) => (
      <div style={{ padding: 80, display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    // Tooltip already wraps itself in a TooltipProvider internally, so no outer
    // provider is needed here (nesting providers can break hover/open state).
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>Sends a renewal reminder to this member.</TooltipContent>
    </Tooltip>
  ),
}
