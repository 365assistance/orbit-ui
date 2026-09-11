import type { Preview } from '@storybook/react-vite'

// Loads Tailwind v4 + tw-animate-css + Orbit tokens so every story renders
// with the real Orbit365 styling (same as the renewal-portal app).
import './storybook.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'orbit-surface',
      values: [
        { name: 'orbit-surface', value: '#f8f9fb' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#1a0a1a' },
      ],
    },
    a11y: { test: 'todo' },
  },
}

export default preview
