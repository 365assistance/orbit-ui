import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, AlertTitle, AlertDescription } from './alert'

const meta = {
  title: 'Primitives/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive'] },
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert style={{ maxWidth: 480 }}>
      <AlertTitle>Membership renews soon</AlertTitle>
      <AlertDescription>Your cover renews on 12 Oct 2026. No action needed.</AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" style={{ maxWidth: 480 }}>
      <AlertTitle>Payment failed</AlertTitle>
      <AlertDescription>We couldn't process your card. Please update your payment details.</AlertDescription>
    </Alert>
  ),
}
