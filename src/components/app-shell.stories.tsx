import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Briefcase, Workflow, Receipt, Users2, Package, BookOpen,
  LifeBuoy, UserCircle2, Bell, ShieldCheck, Building2, Sparkles, DollarSign,
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
      { key: 'notifications', title: 'Notifications', description: 'Manage email and in-app notifications', icon: Bell },
    ],
  },
  {
    label: 'Admin settings',
    items: [
      { key: 'system', title: 'System', description: 'Configuration, security, automation', icon: ShieldCheck },
      { key: 'users', title: 'User management', description: 'Users, roles, groups and access', icon: Users2 },
      { key: 'tenants', title: 'Tenants', description: 'Tenant accounts, branding, configuration', icon: Building2 },
      { key: 'ai', title: 'AI settings', description: 'Configure Orbita, prompts and AI features', icon: Sparkles },
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
      <LifeBuoy className="h-[18px] w-[18px]" aria-hidden /> Help &amp; support
    </a>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px' }}>
      <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent, #F6E9F6)', color: 'var(--primary, #92248E)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 13 }}>SF</span>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>Sofia Frugone</span>
        <span style={{ fontSize: 12, color: 'var(--ink-muted, #707885)' }}>Admin</span>
      </div>
    </div>
  </div>
)

export const FinanceNav: Story = {
  args: { sidebar: null, children: null },
  render: () => (
    <AppShell
      sidebar={
        <Sidebar brand={brand} sections={sections} activeKey="ar" footer={footer} />
      }
      topBar={
        <TopBar
          title="Invoices"
          actions={<SettingsMenu sections={settingsSections} />}
        />
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
  ),
}
