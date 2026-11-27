import type { Meta, StoryObj } from '@storybook/react-vite'
import { Plus } from 'lucide-react'
import { PageHeader, PageContainer } from './page-header'
import { Button } from './button'

const meta = {
  title: 'Patterns/PageHeader',
  component: PageHeader,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const TitleOnly: Story = {
  render: () => <PageHeader title="Preferences" />,
}

export const WithSubtitle: Story = {
  render: () => <PageHeader title="System" subtitle="Manage permissions, policies, services and resources." />,
}

export const WithActions: Story = {
  render: () => (
    <PageHeader
      title="Services & Resources"
      subtitle="Manage Orbit authorization services and the resources within each service."
      actions={<Button><Plus className="size-4" aria-hidden /> Create service</Button>}
    />
  ),
}

export const InContainer: Story = {
  render: () => (
    <PageContainer width="contained">
      <PageHeader
        title="Invoices"
        subtitle="Accounts receivable invoices."
        actions={<Button><Plus className="size-4" aria-hidden /> New invoice</Button>}
      />
    </PageContainer>
  ),
}
