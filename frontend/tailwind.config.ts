// Tailwind CSS v4 uses CSS-first configuration via @theme in src/styles/globals.css.
// This file documents the brand design tokens for reference.

export const brandColors = {
  indigo: '#4C5FD5',
  cream: '#F5F0E6',
  grey: '#E5E7EB',
  sage: '#BFCBB2',
  dark: '#1A1A2E',
} as const;

export const fontFamilies = {
  serif: ['Lora', 'Georgia', 'serif'],
  sans: ['DM Sans', 'system-ui', 'sans-serif'],
} as const;

export default {
  theme: {
    extend: {
      colors: { brand: brandColors },
      fontFamily: fontFamilies,
    },
  },
};
