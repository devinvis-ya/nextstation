import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Courier New"', 'monospace'],
      },
      colors: {
        tablo: '#ff8c00',
        tabloHi: '#ffd060',
      },
    },
  },
  plugins: [],
} satisfies Config;
