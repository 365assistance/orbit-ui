import type { Meta, StoryObj } from '@storybook/react-vite'
import * as React from 'react'
import { Modal } from './modal'
import { Button } from './button'

const meta = {
  title: 'Patterns/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'High-level action/standard modal. Promoted from the live Orbit app (action-modals, Sofia 2026-11-26). Built on the Dialog primitive. Controlled via open/onOpenChange, with title, optional description, size, footer action row, and optional header divider / grey footer bar.',
      },
    },
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

function Demo({
  size,
  headerDivider,
  footerBar,
  dismissible,
  label = 'Open modal',
}: {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  headerDivider?: boolean
  footerBar?: boolean
  dismissible?: boolean
  label?: string
}) {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>{label}</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        size={size}
        headerDivider={headerDivider}
        footerBar={footerBar}
        dismissible={dismissible}
        title="Create tenant"
        description="Add a new tenant to the portal. You can edit these details later."
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save</Button>
          </>
        }
      >
        <div style={{ display: 'grid', gap: 12 }}>
          <p className="text-body-sm">
            Modal body content goes here. The footer right-aligns its actions:
            primary on the right, cancel to its left.
          </p>
        </div>
      </Modal>
    </>
  )
}

export const Default: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    title: 'Create tenant',
  },
  render: () => <Demo />,
}

export const WithHeaderDividerAndFooterBar: Story = {
  args: { open: false, onOpenChange: () => {}, title: 'Create policy' },
  render: () => <Demo headerDivider label="Open (header divider + footer bar)" />,
}

export const FooterBarOnly: Story = {
  args: { open: false, onOpenChange: () => {}, title: 'Create tenant' },
  render: () => <Demo footerBar label="Open (grey footer bar)" />,
}

export const Large: Story = {
  args: { open: false, onOpenChange: () => {}, title: 'Create tenant' },
  render: () => <Demo size="lg" label="Open (large)" />,
}

export const NonDismissible: Story = {
  args: { open: false, onOpenChange: () => {}, title: 'Processing payment' },
  render: () => (
    <Demo dismissible={false} label="Open (non-dismissible, Esc/overlay off)" />
  ),
}
