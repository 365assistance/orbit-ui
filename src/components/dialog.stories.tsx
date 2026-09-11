import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from './dialog'
import { Button } from './button'

const meta = {
  title: 'Primitives/Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="pill">Cancel membership</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel your membership?</DialogTitle>
          <DialogDescription>
            You'll keep cover until the end of the current billing period.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <DialogClose asChild>
            <Button variant="outline">Keep membership</Button>
          </DialogClose>
          <Button variant="destructive">Cancel membership</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
