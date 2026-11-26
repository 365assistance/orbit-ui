import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './badge'

const meta = {
  title: 'Deprecated/Badge (use Pill)',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'DEPRECATED (Sofia 2026-11-26). Badge is being retired in favour of Pill with appearance="outline" as the single labelled-chip component. Do not use Badge in new code. Kept until orbit-core-ui (~5 files) migrates to Pill.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
    },
  },
  args: { children: 'Badge' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
      <Badge variant="default">Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Expired</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  ),
}
