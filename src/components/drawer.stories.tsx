import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter,
  DrawerTitle, DrawerDescription, DrawerClose,
} from './drawer'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'

const meta = {
  title: 'Patterns/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The canonical side panel for EDITING A RECORD with a real form (Plans, Promotions, future client-config records). Standardised 2026-10-07: Drawer for record editing, Dialog for short confirmations/destructive prompts. No bespoke overlays or inline edit forms.',
      },
    },
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const EditPlan: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Edit plan</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Roadside Standard</DrawerTitle>
          <DrawerDescription>Edit this plan's details, pricing and visibility.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ display: 'grid', gap: 6 }}>
              <Label>Display name</Label>
              <Input defaultValue="Roadside Standard" />
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              <Label>Plan price</Label>
              <Input defaultValue="$89.00" />
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              <Label>Inclusions</Label>
              <Input placeholder="Add an inclusion..." />
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button>Save</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
