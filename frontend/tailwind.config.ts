// Tailwind CSS v4 uses CSS-first configuration via @theme in src/styles/globals.css.
// This file documents the brand design tokens for reference.

export const brandColors = {
  accent: '#1B6B4A',
  'accent-dark': '#0E3D2B',
  'accent-light': '#E8F5EE',
  warm: '#F6F1EB',
  bg: '#FDFCFA',
  text: '#1A1A1A',
  'text-muted': '#6B6560',
  border: '#E2DDD7',
} as const;

export const fontFamilies = {
  sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  serif: ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
} as const;

export default {
  theme: {
    extend: {
      colors: { brand: brandColors },
      fontFamily: fontFamilies,
    },
  },
};
