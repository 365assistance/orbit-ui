import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter,
  DrawerTitle, DrawerDescription, DrawerClose,
} from './drawer'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'

const meta = {
  // INTERNAL PRIMITIVE — not the component to reach for. Use EntityDrawer
  // (Patterns/EntityDrawer) for all create/edit record forms. Drawer is the
  // low-level slide-in panel that EntityDrawer is built on; it stays exported
  // only so EntityDrawer (and rare non-form side panels) can compose it.
  // Demoted from Patterns -> Internal and autodocs removed 2026-10-20 so the
  // team sees one drawer (EntityDrawer), not two.
  title: 'Internal/Drawer (primitive)',
  component: Drawer,
  parameters: {
    docs: {
      description: {
        component:
          'INTERNAL PRIMITIVE. Do not use directly for record editing — use EntityDrawer (Patterns/EntityDrawer) instead, which standardises the header, sectioned body, and Cancel + primary footer. Drawer is the low-level slide-in panel (overlay, focus-trap, Header/Body/Footer parts) that EntityDrawer is built on. Reach for it only for a non-standard side panel that is not a create/edit form.',
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
