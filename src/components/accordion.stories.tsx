import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  CollapsibleSection,
} from './accordion'

const meta = {
  title: 'Primitives/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const MultiItem: Story = {
  name: 'Accordion (multi-item)',
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is covered by my membership?</AccordionTrigger>
          <AccordionContent>
            Your membership covers roadside assistance, towing, and emergency fuel delivery
            within the limits of your chosen plan.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How do I renew?</AccordionTrigger>
          <AccordionContent>
            Renewals happen automatically 30 days before expiry. You'll receive a reminder
            email with a link to update your payment details if needed.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I add a family member?</AccordionTrigger>
          <AccordionContent>
            Yes — family cover can be added from the Members section of your account at any time.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

export const Multiple: Story = {
  name: 'Accordion (multiple open)',
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <Accordion type="multiple" defaultValue={['a', 'b']}>
        <AccordionItem value="a">
          <AccordionTrigger>Section A</AccordionTrigger>
          <AccordionContent>Both A and B can be open at once in multiple mode.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="b">
          <AccordionTrigger>Section B</AccordionTrigger>
          <AccordionContent>Independent open/close state per item.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

export const Collapsible: Story = {
  name: 'CollapsibleSection',
  render: () => (
    <div style={{ display: 'grid', gap: 16, maxWidth: 560 }}>
      <CollapsibleSection title="Orbit authorization model" defaultOpen>
        These services and resources are part of Orbit's internal authorization model. They are
        separate from Auth0 Resource Servers. Built-in services and resources are system data and
        can't be edited or deleted.
      </CollapsibleSection>
      <CollapsibleSection title="Advanced settings">
        Optional configuration for power users. Collapsed by default to keep the form tidy.
      </CollapsibleSection>
    </div>
  ),
}
