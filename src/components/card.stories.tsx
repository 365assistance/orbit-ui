import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'
import { Button } from './button'

const meta = {
  title: 'Primitives/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card style={{ maxWidth: 380 }}>
      <CardHeader>
        <CardTitle>Membership</CardTitle>
        <CardDescription>Standard cover, renews 12 Oct 2026.</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ color: 'var(--ink-muted)', fontSize: 14 }}>
          Roadside assistance, towing up to 100km, and battery replacement.
        </p>
      </CardContent>
      <CardFooter style={{ display: 'flex', gap: 8 }}>
        <Button variant="pill">Renew now</Button>
        <Button variant="outline">Compare plans</Button>
      </CardFooter>
    </Card>
  ),
}
