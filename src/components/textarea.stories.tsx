import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Textarea } from './textarea'
import { Label } from './label'
import { FormField } from './form-field'

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Textarea placeholder="Describe this policy..." />
    </div>
  ),
}

export const WithLabel: Story = {
  render: () => (
    <div style={{ width: 420, display: 'grid', gap: 6 }}>
      <Label htmlFor="desc">Description</Label>
      <Textarea id="desc" placeholder="What does this policy allow?" />
    </div>
  ),
}

export const InFormField: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <FormField label="Description" htmlFor="d2" hint="Optional. Explain the intent of this policy.">
        <Textarea id="d2" rows={4} defaultValue={'Allows finance users to read and update\ninvoice records for their own tenant.'} />
      </FormField>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <Textarea disabled defaultValue="This field is read-only." />
    </div>
  ),
}
