import type { Meta, StoryObj } from '@storybook/react-vite'
import { TableToolbar } from './table-toolbar'
import { Button } from './button'

const meta = {
  title: 'Patterns/TableToolbar',
  component: TableToolbar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The canonical header row above a data-grid Table. Same structure for every list: title (+ optional count) left, optional primary action right. Standardised 2026-10-07 so Plans / Promotions / Audiences stop each having a different header. Action copy is sentence case ("Create audience"), omitted for read-only lists.',
      },
    },
  },
} satisfies Meta<typeof TableToolbar>

export default meta
type Story = StoryObj<typeof meta>

export const WithAction: Story = {
  render: () => (
    <div style={{ maxWidth: 820 }}>
      <TableToolbar
        title="Audiences targeting TFA"
        count={33}
        countLabel="audiences"
        action={<Button>+ Create audience</Button>}
      />
    </div>
  ),
}

export const ReadOnlyList: Story = {
  name: 'Read-only (no action)',
  render: () => (
    <div style={{ maxWidth: 820 }}>
      <TableToolbar title="Renewal plans" count={6} countLabel="plans" />
    </div>
  ),
}
