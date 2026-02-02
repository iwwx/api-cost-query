/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#faf9f7',
        'bg-secondary': '#f4f1ea',
        'text-primary': '#2c2416',
        'text-secondary': '#6e6a5f',
        'accent': '#cd9f68',
        'border': '#e8e4dc',
        'success': '#10a37f',
        'warning': '#f59e0b',
        'error': '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'default': '12px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(44, 36, 22, 0.08)',
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
