import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { FormSection } from './form-section'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'

const meta = {
  title: 'Patterns/FormSection',
  component: FormSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The canonical collapsible config/form section (client config Branding + Templates tabs). RULES: title-case bold field labels (never UPPERCASE); per-section Save (primary) + Cancel (outline) footer, disabled until dirty; use summary and headerAccessory consistently across sibling sections or not at all. Standardised 2026-10-07 to stop Branding and Templates drifting apart.',
      },
    },
  },
} satisfies Meta<typeof FormSection>

export default meta
type Story = StoryObj<typeof meta>

const Footer = ({ dirty }: { dirty: boolean }) => (
  <>
    <Button variant="outline" disabled={!dirty} style={{ opacity: dirty ? 1 : 0.5 }}>Cancel</Button>
    <Button disabled={!dirty} style={{ background: 'var(--primary)', color: '#fff', border: 'none', opacity: dirty ? 1 : 0.5 }}>Save</Button>
  </>
)

export const ConfigTab: Story = {
  name: 'Config tab (consistent sections)',
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState<Record<string, boolean>>({ identity: true })
      const toggle = (k: string) => setOpen((o) => ({ ...o, [k]: !o[k] }))
      return (
        <div style={{ display: 'grid', gap: 12, maxWidth: 680 }}>
          <FormSection title="Identity" open={!!open.identity} onToggle={() => toggle('identity')} footer={<Footer dirty />}>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'grid', gap: 6 }}>
                <Label style={{ fontWeight: 700 }}>Client display name</Label>
                <Input defaultValue="Toyota Finance Australia" />
              </div>
              <div style={{ display: 'grid', gap: 6 }}>
                <Label style={{ fontWeight: 700 }}>Support email</Label>
                <Input defaultValue="support@tfa.com.au" />
              </div>
            </div>
          </FormSection>

          <FormSection title="Sending identity" open={!!open.sending} onToggle={() => toggle('sending')} footer={<Footer dirty={false} />}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ display: 'grid', gap: 6 }}>
                <Label style={{ fontWeight: 700 }}>Sender</Label>
                <Input defaultValue="Toyota Support <support@...>" />
              </div>
              <div style={{ display: 'grid', gap: 6 }}>
                <Label style={{ fontWeight: 700 }}>Unsubscribe group</Label>
                <Input defaultValue="Toyota" />
              </div>
            </div>
          </FormSection>
        </div>
      )
    }
    return <Demo />
  },
}
