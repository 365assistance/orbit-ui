import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormField, FormFieldRow } from './form-field'
import { Input } from './input'

const meta = {
  title: 'Patterns/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The canonical label + control + help/error wrapper. One pattern for a single labelled form control, used by EntityDrawer and SetupWizard so every field reads identically. Compose FormField rather than hand-rolling label + input blocks.',
      },
    },
  },
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Tenant name', htmlFor: 'tenant-name', children: null },
  render: () => (
    <div style={{ width: 360 }}>
      <FormField label="Tenant name" htmlFor="tenant-name">
        <Input id="tenant-name" placeholder="Acme Pty Ltd" />
      </FormField>
    </div>
  ),
}

export const RequiredWithHelp: Story = {
  args: { label: 'ABN', htmlFor: 'abn', children: null },
  render: () => (
    <div style={{ width: 360 }}>
      <FormField
        label="ABN"
        htmlFor="abn"
        required
        help="The 11-digit Australian Business Number for this tenant."
      >
        <Input id="abn" placeholder="00 000 000 000" />
      </FormField>
    </div>
  ),
}

export const WithHint: Story = {
  args: { label: 'Subdomain', htmlFor: 'subdomain', children: null },
  render: () => (
    <div style={{ width: 360 }}>
      <FormField
        label="Subdomain"
        htmlFor="subdomain"
        hint="Lowercase letters and hyphens only."
      >
        <Input id="subdomain" placeholder="acme" />
      </FormField>
    </div>
  ),
}

export const WithError: Story = {
  args: { label: 'Email', htmlFor: 'email', children: null },
  render: () => (
    <div style={{ width: 360 }}>
      <FormField
        label="Email"
        htmlFor="email"
        required
        error="Enter a valid email address."
      >
        <Input id="email" defaultValue="not-an-email" aria-invalid />
      </FormField>
    </div>
  ),
}

export const TwoUpRow: Story = {
  args: { label: 'First name', children: null },
  render: () => (
    <div style={{ width: 520 }}>
      <FormFieldRow>
        <FormField label="First name" htmlFor="fn">
          <Input id="fn" placeholder="Jane" />
        </FormField>
        <FormField label="Last name" htmlFor="ln">
          <Input id="ln" placeholder="Doe" />
        </FormField>
      </FormFieldRow>
    </div>
  ),
}
