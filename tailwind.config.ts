import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d8eaff',
          200: '#b1d3ff',
          300: '#80b5ff',
          400: '#4f8eff',
          500: '#2567f2',
          600: '#1c51d5',
          700: '#1b4aa9',
          800: '#183d85',
          900: '#162f67'
        }
      },
      boxShadow: {
        soft: '0 24px 80px rgba(20, 54, 120, 0.12)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
