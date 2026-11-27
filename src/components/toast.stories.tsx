import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toaster, toast } from './toast'
import { Button } from './button'

const meta = {
  title: 'Primitives/Toast',
  component: Toaster,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Canonical Orbit toast (Radix-based, top-right, swipe + hover-pause). Render <Toaster/> once near the app root, then call the module-level toast(opts) from anywhere. Variants: info | success | warning | error. Errors never auto-dismiss.',
      },
    },
  },
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

function Demo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <Button variant="outline" onClick={() => toast({ variant: 'info', title: 'Heads up', description: 'This is an info toast.' })}>Info</Button>
      <Button onClick={() => toast({ variant: 'success', title: 'Service created' })}>Success</Button>
      <Button variant="outline" onClick={() => toast({ variant: 'warning', title: 'Unsaved changes', description: 'Leaving will discard them.' })}>Warning</Button>
      <Button variant="destructive" onClick={() => toast({ variant: 'error', title: 'Something went wrong', description: 'This one stays until dismissed.' })}>Error</Button>
      <Button variant="ghost" onClick={() => toast({ variant: 'success', title: 'Saved', description: 'With an action.', action: { label: 'Undo', onClick: () => {} } })}>With action</Button>
    </div>
  )
}

export const Playground: Story = {
  render: () => (
    <>
      <Demo />
      <Toaster />
    </>
  ),
}
