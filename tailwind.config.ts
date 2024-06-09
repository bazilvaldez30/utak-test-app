import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        custom: {
          1: '#A7252F',
          2: '#D9C02F',
          3: '#002366',
          4: '#4C3327',
          5: '#B29600',
          6: '#232B2B',
          7: '#E5E5E5',
          8: '#FBFBFA',
          9: '#BC434F',
          10: '#FAFAE9',
          11: '#838DA0',
          12: '#11131f',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      backgroundImage: {
        hero: 'url("/images/hero-bg.png")',
        'custom-radial':
          'radial-gradient(101.52% 100% at 50.01% 0, rgba(13, 2, 24, 0) 70%, rgba(20, 14, 83, 0.4) 100%)',
        'custom-card':
          'linear-gradient(to bottom, transparent, rgb(var(--background-end-rgb)), rgb(var(--background-start-rgb)))',
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
  
} satisfies Config

export default config
