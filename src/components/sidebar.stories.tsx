import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Briefcase, Workflow, FolderTree, Receipt, Users2, Package, BookOpen } from 'lucide-react'
import { Sidebar } from './sidebar'

const meta = {
  title: 'Shell/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

const brand = (
  <span style={{ fontSize: 18, fontWeight: 800 }}>Orbit<span style={{ color: 'var(--primary, #92248E)' }}>365</span></span>
)

const sections = [
  { label: 'Workflow', items: [
    { key: 'cases', label: 'Cases', icon: Briefcase },
    { key: 'flows', label: 'Flows', icon: Workflow },
  ] },
  { label: 'Finance', items: [
    { key: 'ar', label: 'Accounts Receivable', icon: Receipt, children: [
      { key: 'invoices', label: 'Invoices' },
      { key: 'billing-advices', label: 'Billing Advices' },
    ] },
    { key: 'contacts', label: 'Contacts', icon: Users2, children: [
      { key: 'all-contacts', label: 'All Contacts' },
      { key: 'clients', label: 'Clients' },
      { key: 'suppliers', label: 'Suppliers' },
    ] },
    { key: 'products', label: 'Products', icon: Package },
    { key: 'gl', label: 'General Ledger', icon: BookOpen, children: [
      { key: 'chart-of-accounts', label: 'Chart of Accounts' },
    ] },
  ] },
]

function Frame({ children }: { children: React.ReactNode }) {
  return <div style={{ height: 560, display: 'flex' }}>{children}</div>
}

export const Default: Story = {
  render: () => {
    const [active, setActive] = React.useState('cases')
    return (
      <Frame>
        <Sidebar brand={brand} sections={sections} activeKey={active} onNavigate={setActive} />
      </Frame>
    )
  },
}

export const NestedGroups: Story = {
  name: 'Nested sub-items',
  render: () => {
    const [active, setActive] = React.useState('invoices')
    return (
      <Frame>
        <Sidebar brand={brand} sections={sections} activeKey={active} onNavigate={setActive} />
      </Frame>
    )
  },
}

export const Collapsible: Story = {
  render: () => {
    const [active, setActive] = React.useState('cases')
    const [collapsed, setCollapsed] = React.useState(false)
    return (
      <Frame>
        <Sidebar
          brand={brand}
          brandCollapsed={<span style={{ fontWeight: 800, color: 'var(--primary, #92248E)' }}>O</span>}
          sections={sections}
          activeKey={active}
          onNavigate={setActive}
          collapsible
          collapsed={collapsed}
          onToggleCollapsed={setCollapsed}
        />
      </Frame>
    )
  },
}
