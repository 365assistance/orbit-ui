import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from './breadcrumb'

const meta = {
  title: 'Primitives/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: 'Tenants', to: '/tenants' },
      { label: 'Acme Motors', to: '/tenants/acme' },
      { label: 'Members' },
    ],
  },
}

export const TwoLevels: Story = {
  args: {
    items: [
      { label: 'Home', to: '/' },
      { label: 'Settings' },
    ],
  },
}
