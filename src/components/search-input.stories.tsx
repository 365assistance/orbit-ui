import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SearchInput } from './search-input'

const meta = {
  title: 'Primitives/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return <SearchInput value={value} onChange={setValue} placeholder="Search tenants" />
  },
}

export const FullWidth: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ width: 480 }}>
        <SearchInput value={value} onChange={setValue} placeholder="Search members" width={0} />
      </div>
    )
  },
}
