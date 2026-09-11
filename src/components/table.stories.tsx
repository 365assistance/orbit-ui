import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './table'
import { Pill } from './pill'

const meta = {
  title: 'Primitives/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tenant</TableHead>
          <TableHead>Members</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Acme Motors</TableCell>
          <TableCell>1,204</TableCell>
          <TableCell><Pill variant="success">Active</Pill></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Beta Fleet</TableCell>
          <TableCell>318</TableCell>
          <TableCell><Pill variant="warning">Trial</Pill></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
