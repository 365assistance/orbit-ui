import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import {
  Briefcase, Workflow, Receipt, Users2, Package, BookOpen,
  LifeBuoy, UserCircle2, ShieldCheck, Building2, DollarSign, FolderTree,
} from 'lucide-react'
import { AppShell, TopBar } from './app-shell'
import { Sidebar } from './sidebar'
import { PageContainer, PageHeader } from './page-header'
import { SettingsMenu } from './settings-menu'
import { Button } from './button'

const meta = {
  title: 'Shell/AppShell',
  component: AppShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The canonical Orbit application frame: Sidebar + TopBar + scrolling #main, with PageHeader for the content and the SettingsMenu cog in the header. Prop-driven and decoupled (no routing/permissions deps). Promoted from the live app shell and the approved finance-nav design (Sofia 2026-11-26).',
      },
    },
  },
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

const brand = (
  <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.3px' }}>
    Orbit<span style={{ color: 'var(--primary, #92248E)' }}>365</span>
  </span>
)

const sections = [
  {
    label: 'Workflow',
    items: [
      { key: 'cases', label: 'Cases', icon: Briefcase },
      { key: 'flow-collections', label: 'Flow collections', icon: FolderTree },
      { key: 'flows', label: 'Flows', icon: Workflow },
    ],
  },
  {
    label: 'Finance',
    items: [
      { key: 'ar', label: 'Accounts receivable', icon: Receipt },
      { key: 'contacts', label: 'Contacts', icon: Users2 },
      { key: 'products', label: 'Products', icon: Package },
      { key: 'gl', label: 'General ledger', icon: BookOpen },
    ],
  },
]

const settingsSections = [
  {
    label: 'Personal settings',
    items: [
      { key: 'general', title: 'General settings', description: 'Language, time zone and personal preferences', icon: UserCircle2 },
    ],
  },
  {
    label: 'Admin settings',
    items: [
      { key: 'system', title: 'System', description: 'Configuration, security, automation', icon: ShieldCheck },
      { key: 'users', title: 'User management', description: 'Users, roles, groups and access', icon: Users2 },
      { key: 'tenants', title: 'Tenants', description: 'Tenant accounts, branding, configuration', icon: Building2 },
    ],
  },
  {
    label: 'Workspace settings',
    items: [
      { key: 'finance', title: 'Finance settings', description: 'Chart of accounts, tax codes, billing rules', icon: DollarSign },
      { key: 'workflow', title: 'Workflow settings', description: 'Flow types, node library, object types', icon: Workflow },
    ],
  },
]

const footer = (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <a href="#" onClick={(e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', borderRadius: 10, fontSize: 14, color: 'var(--ink-mid, #5b6470)', textDecoration: 'none' }}>
      <LifeBuoy className="h-[18px] w-[18px]" aria-hidden /> Help
    </a>
    <div style={{ height: 1, margin: '4px 8px', background: 'var(--border-default, #e2e4e9)' }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px' }}>
      <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent, #F6E9F6)', color: 'var(--primary, #92248E)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 13 }}>SF</span>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Sofia Frugone</span>
        <span style={{ fontSize: 12, color: 'var(--ink-muted, #707885)' }}>Admin</span>
      </div>
    </div>
  </div>
)

const brandCollapsed = (
  <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary, #92248E)' }}>O</span>
)

const footerCollapsed = (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '4px 0' }}>
    <LifeBuoy className="h-[18px] w-[18px]" aria-hidden style={{ color: 'var(--ink-mid, #5b6470)' }} />
    <div style={{ height: 1, width: 28, background: 'var(--border-default, #e2e4e9)' }} />
    <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--accent, #F6E9F6)', color: 'var(--primary, #92248E)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12 }}>SF</span>
  </div>
)

export const FinanceNav: Story = {
  args: { sidebar: null, children: null },
  render: function Render() {
    const [collapsed, setCollapsed] = React.useState(false)
    return (
    <AppShell
      sidebar={
        <Sidebar
          brand={brand}
          brandCollapsed={brandCollapsed}
          sections={sections}
          activeKey="ar"
          footer={footer}
          footerCollapsed={footerCollapsed}
          collapsible
          collapsed={collapsed}
          onToggleCollapsed={setCollapsed}
        />
      }
      topBar={
        <TopBar actions={<SettingsMenu sections={settingsSections} />} />
      }
    >
      <PageContainer>
        <PageHeader
          title="Invoices"
          subtitle="Manage accounts receivable invoices across all tenants."
          actions={<Button>New invoice</Button>}
        />
        <div style={{ height: 240, borderRadius: 14, border: '1px dashed var(--border-default, #e2e4e9)', display: 'grid', placeItems: 'center', color: 'var(--ink-muted, #707885)' }}>
          Page content (table, cards, etc.)
        </div>
      </PageContainer>
    </AppShell>
    )
  },
}
