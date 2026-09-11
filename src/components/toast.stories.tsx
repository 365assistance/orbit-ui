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
          'Wrap your app in <ToastProvider> once, then call useToast().toast({...}) anywhere. Variants: default, success, warning, destructive.',
      },
    },
  },
} satisfies Meta<typeof ToastProvider>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  const { toast } = useToast()
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button onClick={() => toast({ title: 'Saved', description: 'Tenant updated.', variant: 'success' })}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast({ title: 'Heads up', description: 'Renewal is due soon.', variant: 'warning' })}>
        Warning
      </Button>
      <Button variant="destructive" onClick={() => toast({ title: 'Error', description: 'Could not save.', variant: 'destructive' })}>
        Error
      </Button>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
}
