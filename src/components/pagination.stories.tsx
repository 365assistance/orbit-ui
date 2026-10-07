import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Pagination } from './pagination'

const meta = {
  title: 'Patterns/Pagination',
  component: Pagination,
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const Demo = () => {
      const [page, setPage] = useState(0)
      return (
        <div style={{ maxWidth: 520 }}>
          <Pagination page={page} pageSize={10} total={48} onPageChange={setPage} label="clients" />
        </div>
      )
    }
    return <Demo />
  },
}
