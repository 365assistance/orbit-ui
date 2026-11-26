import type { Meta, StoryObj } from '@storybook/react-vite'
import { Info, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from './alert'

const meta = {
  title: 'Primitives/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'info', 'success', 'warning', 'destructive'] },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert style={{ maxWidth: 520 }}>
      <AlertTitle>Membership renews soon</AlertTitle>
      <AlertDescription>Your cover renews on 12 Oct 2026. No action needed.</AlertDescription>
    </Alert>
  ),
}

export const Info: Story = {
  render: () => (
    <Alert variant="info" style={{ maxWidth: 520 }}>
      <Info />
      <AlertTitle>Orbit authorization model</AlertTitle>
      <AlertDescription>
        These services and resources are part of Orbit's internal authorization model. They are separate from Auth0
        Resource Servers. Built-in services and resources are system data and can't be edited or deleted.
      </AlertDescription>
    </Alert>
  ),
}

export const Success: Story = {
  render: () => (
    <Alert variant="success" style={{ maxWidth: 520 }}>
      <CheckCircle2 />
      <AlertTitle>Service created</AlertTitle>
      <AlertDescription>The finance service and its resources are now available.</AlertDescription>
    </Alert>
  ),
}

export const Warning: Story = {
  render: () => (
    <Alert variant="warning" style={{ maxWidth: 520 }}>
      <AlertTriangle />
      <AlertTitle>Unsaved changes</AlertTitle>
      <AlertDescription>You have unsaved changes. Leaving this page will discard them.</AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" style={{ maxWidth: 520 }}>
      <XCircle />
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>We couldn't process your card. Please update your payment details.</AlertDescription>
    </Alert>
  ),
}

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 520 }}>
      <Alert variant="info"><Info /><AlertTitle>Info</AlertTitle><AlertDescription>Contextual information.</AlertDescription></Alert>
      <Alert variant="success"><CheckCircle2 /><AlertTitle>Success</AlertTitle><AlertDescription>Action completed.</AlertDescription></Alert>
      <Alert variant="warning"><AlertTriangle /><AlertTitle>Warning</AlertTitle><AlertDescription>Something needs attention.</AlertDescription></Alert>
      <Alert variant="destructive"><XCircle /><AlertTitle>Error</AlertTitle><AlertDescription>Something went wrong.</AlertDescription></Alert>
      <Alert><AlertTitle>Neutral</AlertTitle><AlertDescription>A quiet, borderless-feeling note.</AlertDescription></Alert>
    </div>
  ),
}
