import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion'

const meta = {
  title: 'Primitives/Accordion',
  component: Accordion,
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible style={{ maxWidth: 480 }}>
      <AccordionItem value="a">
        <AccordionTrigger>What does roadside cover include?</AccordionTrigger>
        <AccordionContent>Towing, battery, tyre change, lockout and fuel delivery.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Can I add a second vehicle?</AccordionTrigger>
        <AccordionContent>Yes, additional vehicles can be added from your account.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
