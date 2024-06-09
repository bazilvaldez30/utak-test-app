import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
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
      backgroundImage: {
        hero: 'url("/images/hero-bg.png")',
        'custom-radial':
          'radial-gradient(101.52% 100% at 50.01% 0, rgba(13, 2, 24, 0) 70%, rgba(20, 14, 83, 0.4) 100%)',
      },
    },
  },
  plugins: [],
}
export default config
