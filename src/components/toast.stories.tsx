import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToastProvider, useToast } from './toast'
import { Button } from './button'

const meta = {
  title: 'Primitives/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Lightweight toast notification system. Wrap in <ToastProvider>, then call toast(opts) from useToast(). Auto-dismisses after `duration` (default 5000ms); also manually dismissible.',
      },
    },
  },
} satisfies Meta<typeof ToastProvider>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const { toast } = useToast()
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: 'Saved',
            description: 'Your changes have been saved.',
          })
        }
      >
        Default
      </Button>
      <Button
        onClick={() =>
          toast({
            variant: 'success',
            title: 'Service created',
            description: 'The finance service and its resources are now available.',
          })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            variant: 'warning',
            title: 'Unsaved changes',
            description: 'Leaving this page will discard them.',
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          toast({
            variant: 'destructive',
            title: 'Payment failed',
            description: "We couldn't process your card. Please update your payment details.",
          })
        }
      >
        Destructive
      </Button>
    </div>
  )
}

export const Playground: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
}

export const TitleOnly: Story = {
  render: () => (
    <ToastProvider>
      <TitleOnlyDemo />
    </ToastProvider>
  ),
}

function TitleOnlyDemo() {
  const { toast } = useToast()
  return (
    <Button variant="secondary" onClick={() => toast({ title: 'Copied to clipboard' })}>
      Fire title-only toast
    </Button>
  )
}
