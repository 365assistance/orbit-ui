import type { Meta, StoryObj } from '@storybook/react-vite'
import { RowList, RowItem, RowAvatar, RowPrimary } from './row-list'
import { StatusChip } from './status-chip'

const meta = {
  title: 'Patterns/RowList',
  component: RowList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Airy borderless hover-row list for ENTITY LISTS (clients, single sends) — things you click into. Use FIXED column widths so chips line up down the list. For multi-column DATA GRIDS use Table instead. Locked as the entity-list style 2026-10-07.',
      },
    },
  },
} satisfies Meta<typeof RowList>

export default meta
type Story = StoryObj<typeof meta>

export const ClientsList: Story = {
  render: () => (
    <div style={{ maxWidth: 680 }}>
      <RowList>
        <RowItem columns="46px 1fr 120px 120px">
          <RowAvatar>TF</RowAvatar>
          <RowPrimary primary="Toyota Finance" secondary="Parent group" />
          <StatusChip variant="opted-in" />
          <StatusChip variant="live" />
        </RowItem>
        <RowItem columns="46px 1fr 120px 120px">
          <RowAvatar color="#2d6fb0">VG</RowAvatar>
          <RowPrimary primary="VW Group Australia" secondary="Parent group" />
          <StatusChip variant="opted-in" />
          <StatusChip variant="in-progress" />
        </RowItem>
        <RowItem columns="46px 1fr 120px 120px">
          <RowAvatar color="#7a5230">BM</RowAvatar>
          <RowPrimary primary="BMW Australia" secondary="Child group" />
          <StatusChip variant="opted-out" />
          <StatusChip variant="not-started" />
        </RowItem>
      </RowList>
    </div>
  ),
}
