import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e7f3ff',
          100: '#cfe3ff',
          200: '#9ec7ff',
          300: '#6ea9ff',
          400: '#4590f1',
          500: '#0078d4',
          600: '#0066c0',
          700: '#0052a3',
          800: '#004080',
          900: '#03305f'
        }
      },
      boxShadow: {
        soft: '0 24px 80px rgba(0, 0, 0, 0.16)'
      },
      fontFamily: {
        sans: ['Segoe UI', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      }
    }
  },
  plugins: [typography],
};

export default config;
