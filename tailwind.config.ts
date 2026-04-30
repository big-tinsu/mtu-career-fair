import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/react/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
        figtree: ['var(--font-figtree)'],
        inter: ['var(--font-inter)'],
      },
      colors: {
        primary: {
          DEFAULT: '#6F00FF',
          blue: '#6F00FF',
          red: '#FF1D45',
          grey: '#EEEEEE',
          black: '#040019',
          yellow: '#F59929',
          green: '#0CAC91',
          pink: '#EA157F',
          purple: '#6F00FF',
        },
        secondary: {
          purple: '#F4EBFF',
          DEFAULT: '#F0E5FF',
          blue: '#F0E5FF',
          grey: '#F5F5F5',
          yellow: '#F599291A',
          green: '#D8F3EF',
          pink: '#FCE3EF',
        },
        tertiary: {
          blue: '#08BFFF',
          grey: '#575757',
          pink: '#FFB8DB',
          green: '#14AE5C',
          purple: '#C192FF',
          yellow: '#FEA53914',
        },

        'neutral-green': '#34C759',
        grey: '#D9D9D9',
        'bg-grey': '#FAFAFA',
        'light-grey': '#949494',
        warning: '#FEA539',
        success: '#ECF9F7',
        dark: '#222222',
        'light-black': '#ea2E2E',
        'light-purple': '#6F00FF17',
        'light-pink': '#FFF2F4',
        'light-green': '#F2FFFD',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('@tailwindcss/forms'), heroui()],
} satisfies Config;
