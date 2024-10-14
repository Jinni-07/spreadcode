/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html"],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1010px',
      xl: '1440px',
    },
    extend: {
      keyframes: {
        wave10s: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
        wave15s: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
      },
      animation: {
        wave10s: 'wave10s 10s linear infinite',
        wave15s: 'wave15s 15s linear infinite',
      },
    },
  },
  plugins: [],
}
