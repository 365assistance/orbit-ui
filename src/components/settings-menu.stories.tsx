import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { UserCircle2, ShieldCheck, Users2, Building2, DollarSign, Workflow } from 'lucide-react'
import { SettingsMenu, type SettingsMenuSection } from './settings-menu'

const sections: SettingsMenuSection[] = [
  { label: 'Personal settings', items: [
    { key: 'general', title: 'General settings', description: 'Language, time zone and personal preferences', icon: UserCircle2 },
  ] },
  { label: 'Admin settings', items: [
    { key: 'system', title: 'System', description: 'Configuration, security, automation', icon: ShieldCheck },
    { key: 'users', title: 'User management', description: 'Users, roles, groups and access', icon: Users2 },
    { key: 'tenants', title: 'Tenants', description: 'Tenant accounts, branding, configuration', icon: Building2 },
  ] },
  { label: 'Workspace settings', items: [
    { key: 'finance', title: 'Finance settings', description: 'Chart of accounts, tax codes, billing rules', icon: DollarSign },
    { key: 'workflow', title: 'Workflow settings', description: 'Flow types, node library, object types', icon: Workflow },
  ] },
]

const meta = {
  title: 'Navigation/SettingsMenu',
  component: SettingsMenu,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SettingsMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <SettingsMenu sections={sections} searchable={false} onSelect={(k) => console.log(k)} />,
}

export const ActiveOnSettingsPage: Story = {
  name: 'Active (on a settings page) — purple cog',
  render: () => <SettingsMenu sections={sections} searchable={false} active onSelect={(k) => console.log(k)} />,
}

export const WithSignOut: Story = {
  render: () => (
    <SettingsMenu
      sections={sections}
      searchable={false}
      active
      onSelect={(k) => console.log(k)}
      onSignOut={() => console.log('sign out')}
    />
  ),
}
