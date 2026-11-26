import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Checkbox } from './checkbox'
import { Label } from './label'

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Checkbox defaultChecked />,
}

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Checkbox /> <span style={{ fontSize: 13 }}>Unchecked</span>
      </label>
      <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Checkbox defaultChecked /> <span style={{ fontSize: 13 }}>Checked</span>
      </label>
      <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Checkbox checked="indeterminate" /> <span style={{ fontSize: 13 }}>Indeterminate</span>
      </label>
      <label style={{ display: 'flex', gap: 8, alignItems: 'center', opacity: 0.6 }}>
        <Checkbox disabled /> <span style={{ fontSize: 13 }}>Disabled</span>
      </label>
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(true)
    return (
      <label style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
        <Checkbox checked={checked} onCheckedChange={(v) => setChecked(Boolean(v))} id="agree" />
        <Label htmlFor="agree" style={{ cursor: 'pointer' }}>Allow this action</Label>
      </label>
    )
  },
}

export const ActionList: Story = {
  name: 'Action picker (Create / Read / Update / Delete)',
  render: () => {
    const actions = ['Create', 'Read', 'Update', 'Delete']
    const [sel, setSel] = React.useState<string[]>(['Read', 'Update'])
    const toggle = (a: string) =>
      setSel((s) => (s.includes(a) ? s.filter((x) => x !== a) : [...s, a]))
    return (
      <div style={{ display: 'grid', gap: 10 }}>
        {actions.map((a) => (
          <label key={a} style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' }}>
            <Checkbox checked={sel.includes(a)} onCheckedChange={() => toggle(a)} />
            <span style={{ fontSize: 13 }}>{a}</span>
          </label>
        ))}
      </div>
    )
  },
}
