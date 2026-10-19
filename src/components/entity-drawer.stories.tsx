import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { EntityDrawer, EntityDrawerSection } from './entity-drawer'
import { FormField, FormFieldRow } from './form-field'
import { Button } from './button'
import { Input } from './input'

const meta = {
  title: 'Patterns/EntityDrawer',
  component: EntityDrawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The ONE public drawer: the canonical CREATE / EDIT shell for a single record — a right-side drawer with a sectioned single form and a Cancel / primary footer. Standardised 2026-10-20 (Sofia). Use for Create User, Edit Tenant, etc. Built on the internal Drawer primitive (Internal/Drawer), which you should not use directly. For genuinely multi-step setup flows, use SetupWizard instead.',
      },
    },
  },
} satisfies Meta<typeof EntityDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const CreateUser: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Add User</Button>
        <EntityDrawer
          open={open}
          onOpenChange={setOpen}
          title="New User"
          description="Create a user account. They will receive login instructions by email."
          submitLabel="Create User"
          onSubmit={() => setOpen(false)}
        >
          <EntityDrawerSection label="Basic">
            <FormField label="Full Name" htmlFor="sb-name" required>
              <Input id="sb-name" placeholder="Enter full name" />
            </FormField>
            <FormField
              label="Email Address"
              htmlFor="sb-email"
              required
              hint="Auth0 will email the user with login instructions"
            >
              <Input id="sb-email" type="email" placeholder="name@example.com" />
            </FormField>
          </EntityDrawerSection>

          <EntityDrawerSection label="Contact">
            <FormFieldRow>
              <FormField label="Mobile" htmlFor="sb-mobile">
                <Input id="sb-mobile" placeholder="+61…" />
              </FormField>
              <FormField label="Role" htmlFor="sb-role">
                <Input id="sb-role" placeholder="e.g. Agent" />
              </FormField>
            </FormFieldRow>
          </EntityDrawerSection>
        </EntityDrawer>
      </>
    )
  },
}

export const EditRecord: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>Edit record</Button>
        <EntityDrawer
          open={open}
          onOpenChange={setOpen}
          title="Edit User"
          description="Update this user's details."
          submitLabel="Save Changes"
          onSubmit={() => setOpen(false)}
        >
          <EntityDrawerSection label="Basic">
            <FormField label="Full Name" htmlFor="sb-name2" required>
              <Input id="sb-name2" defaultValue="Jordan Lee" />
            </FormField>
            <FormField label="Email Address" htmlFor="sb-email2" required>
              <Input id="sb-email2" type="email" defaultValue="jordan.lee@example.com" />
            </FormField>
          </EntityDrawerSection>
        </EntityDrawer>
      </>
    )
  },
}
