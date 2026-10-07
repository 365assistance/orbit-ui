import type { Meta, StoryObj } from '@storybook/react-vite'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './table'
import { StatusChip } from './status-chip'

const meta = {
  title: 'Primitives/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The crisp data-grid: grey header band, aligned columns, soft row hover, numeric columns left-aligned with tabular-nums. Locked as the DATA-GRID style 2026-10-07 (Plans / Promotions / Audiences / members / transactions). For entity lists use RowList instead.',
      },
    },
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

/** The locked client-config data-grid pattern (Plans tab). */
export const DataGridPlans: Story = {
  name: 'Data grid — Plans',
  render: () => (
    <div style={{ maxWidth: 820 }}>
      <Table>
        <colgroup>
          <col style={{ width: '26%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '18%' }} />
          <col style={{ width: '18%' }} />
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHead>Plan name</TableHead>
            <TableHead>Membership type</TableHead>
            <TableHead>Plan price</TableHead>
            <TableHead>Visibility</TableHead>
            <TableHead>Stripe status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell style={{ fontWeight: 700 }}>Roadside Standard</TableCell>
            <TableCell style={{ color: 'var(--ink-faint,#8b8798)' }}>RSA-STD</TableCell>
            <TableCell><b>$89.00</b>/yr</TableCell>
            <TableCell><StatusChip variant="completed">Shown</StatusChip></TableCell>
            <TableCell><StatusChip variant="completed">In sync</StatusChip></TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: 700 }}>Roadside Premium</TableCell>
            <TableCell style={{ color: 'var(--ink-faint,#8b8798)' }}>RSA-PREM</TableCell>
            <TableCell><b>$149.00</b>/yr</TableCell>
            <TableCell><StatusChip variant="completed">Shown</StatusChip></TableCell>
            <TableCell><StatusChip variant="in-progress">Needs sync</StatusChip></TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: 700 }}>Roadside Basic</TableCell>
            <TableCell style={{ color: 'var(--ink-faint,#8b8798)' }}>RSA-BAS</TableCell>
            <TableCell><b>$59.00</b>/yr</TableCell>
            <TableCell><StatusChip variant="not-started">Hidden</StatusChip></TableCell>
            <TableCell><StatusChip variant="not-started">Not synced</StatusChip></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}

/** Promotions tab — note the Usage column is left-aligned with tabular-nums. */
export const DataGridPromotions: Story = {
  name: 'Data grid — Promotions',
  render: () => (
    <div style={{ maxWidth: 820 }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Valid</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell style={{ fontWeight: 700 }}>WELCOME25</TableCell>
            <TableCell>25% off</TableCell>
            <TableCell style={{ color: 'var(--ink-faint,#8b8798)' }}>to 31 Dec 2026</TableCell>
            <TableCell style={{ fontVariantNumeric: 'tabular-nums' }}>142 / 500</TableCell>
            <TableCell><StatusChip variant="completed">Active</StatusChip></TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: 700 }}>LOYAL10</TableCell>
            <TableCell>$10 off</TableCell>
            <TableCell style={{ color: 'var(--ink-faint,#8b8798)' }}>No expiry</TableCell>
            <TableCell style={{ fontVariantNumeric: 'tabular-nums' }}>38 / &infin;</TableCell>
            <TableCell><StatusChip variant="completed">Active</StatusChip></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}
