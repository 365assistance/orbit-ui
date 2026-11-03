import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ConfirmDestroyDialog } from './confirm-destroy-dialog'
import { Button } from './button'

/**
 * The standard confirmation modal for destructive actions (delete / remove /
 * revoke) across Orbit.
 *
 * Pattern (agreed 2026-11-03):
 * - Title: verb + lowercase noun + "?" ("Delete user?").
 * - No warning banner.
 * - One concise consequence line ending "This action cannot be undone."
 * - Buttons: Cancel (ghost) then destructive confirm.
 */
const meta = {
  title: 'Patterns/ConfirmDestroyDialog',
  component: ConfirmDestroyDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmDestroyDialog>

export default meta
type Story = StoryObj<typeof meta>

export const DeleteUser: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>Delete user</Button>
        <ConfirmDestroyDialog
          open={open}
          onOpenChange={setOpen}
          title="Delete user?"
          description="This will permanently delete Pending test, and this user will lose access immediately. This action cannot be undone."
          confirmLabel="Delete user"
          onConfirm={() => setOpen(false)}
        />
      </>
    )
  },
}

export const DeleteRole: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>Delete role</Button>
        <ConfirmDestroyDialog
          open={open}
          onOpenChange={setOpen}
          title="Delete role?"
          description="This will permanently delete Support Specialist. Any user assigned only this role will lose the policies it grants. This action cannot be undone."
          confirmLabel="Delete role"
          onConfirm={() => setOpen(false)}
        />
      </>
    )
  },
}

export const Loading: Story = {
  render: () => (
    <ConfirmDestroyDialog
      open
      onOpenChange={() => {}}
      title="Delete user?"
      description="This will permanently delete Pending test, and this user will lose access immediately. This action cannot be undone."
      confirmLabel="Delete user"
      onConfirm={() => {}}
      loading
    />
  ),
}
