import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pencil, Trash2, Eye, Plus } from 'lucide-react'
import { RowActions } from './row-actions'

const meta = {
  title: 'Patterns/RowActions',
  component: RowActions,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The canonical per-row action menu. One neutral kebab (⋯) trigger; only destructive items carry colour (tone="danger"). Portalled, so it is never clipped by a card overflow:hidden. Use for table/list row actions.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RowActions>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RowActions
      label="Actions for Acme Corp"
      items={[
        { label: 'View details', icon: Eye, onSelect: () => {} },
        { label: 'Edit', icon: Pencil, onSelect: () => {} },
        { separator: true },
        { label: 'Delete', icon: Trash2, tone: 'danger', onSelect: () => {} },
      ]}
    />
  ),
}

export const WithDisabledItems: Story = {
  render: () => (
    <RowActions
      label="Actions for System service"
      items={[
        { label: 'Add resource', icon: Plus, onSelect: () => {} },
        { label: 'Edit service', icon: Pencil, disabled: true, onSelect: () => {} },
        { label: 'Delete service', icon: Trash2, tone: 'danger', disabled: true, onSelect: () => {} },
      ]}
    />
  ),
}

export const MinimalTwoItem: Story = {
  render: () => (
    <RowActions
      label="Actions for policy"
      items={[
        { label: 'Edit policy', icon: Pencil, onSelect: () => {} },
        { label: 'Delete policy', icon: Trash2, tone: 'danger', onSelect: () => {} },
      ]}
    />
  ),
}
