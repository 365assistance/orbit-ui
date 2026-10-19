import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { SetupWizard, type SetupWizardStep } from './setup-wizard'
import { FormField, FormFieldRow } from './form-field'
import { Button } from './button'
import { Input } from './input'

const meta = {
  title: 'Patterns/SetupWizard',
  component: SetupWizard,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The canonical MULTI-STEP SETUP shell: a modal with a vertical stepper down the left and the active step\u2019s form + actions on the right. Standardised 2026-10-20 (Sofia). Use for Create Tenant and other genuinely multi-step flows. For single-form create/edit of one record, use EntityDrawer instead.',
      },
    },
  },
} satisfies Meta<typeof SetupWizard>

export default meta
type Story = StoryObj<typeof meta>

const steps: SetupWizardStep[] = [
  { label: 'Tenant Info', description: 'Name and identifier' },
  { label: 'Plan', description: 'Choose a subscription' },
  { label: 'Admin User', description: 'First account' },
  { label: 'Review & Launch', description: 'Confirm and create' },
]

export const CreateTenant: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const [step, setStep] = useState(0)

    return (
      <div style={{ padding: 24 }}>
        <Button onClick={() => { setStep(0); setOpen(true) }}>Add Tenant</Button>
        <SetupWizard
          open={open}
          onOpenChange={setOpen}
          title="Tenant Setup"
          subtitle="Create a new organisation"
          steps={steps}
          activeStep={step}
          onStepChange={setStep}
          onNext={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          onFinish={() => setOpen(false)}
          finishLabel="Create Tenant"
          supportSlot={
            <a href="#" style={{ fontSize: 13, color: 'var(--primary)' }}>
              Call Support
            </a>
          }
        >
          {(active) => {
            if (active === 0) {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <FormField label="Display Name" htmlFor="w-name" required>
                    <Input id="w-name" placeholder="e.g. Acme Roadside" />
                  </FormField>
                  <FormField label="Slug" htmlFor="w-slug" required hint="Used in URLs and IDs">
                    <Input id="w-slug" placeholder="acme-roadside" />
                  </FormField>
                </div>
              )
            }
            if (active === 1) {
              return (
                <FormFieldRow>
                  <FormField label="Plan" htmlFor="w-plan"><Input id="w-plan" placeholder="Enterprise" /></FormField>
                  <FormField label="Seats" htmlFor="w-seats"><Input id="w-seats" type="number" placeholder="50" /></FormField>
                </FormFieldRow>
              )
            }
            if (active === 2) {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <FormField label="Admin Email" htmlFor="w-admin" required>
                    <Input id="w-admin" type="email" placeholder="admin@acme.com" />
                  </FormField>
                </div>
              )
            }
            return (
              <p style={{ fontSize: 14, color: 'var(--ink-muted)' }}>
                Review the details and launch the tenant.
              </p>
            )
          }}
        </SetupWizard>
      </div>
    )
  },
}
