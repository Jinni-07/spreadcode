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
        move_wave: {
          '0%': {
            transform: 'translateX(0) translateZ(0) scaleY(1)',
          },
          '50%': {
            transform: 'translateX(-25%) translateZ(0) scaleY(0.55)',
          },
          '100%': {
            transform: 'translateX(-50%) translateZ(0) scaleY(1)',
          },
        },
      },
      animation: {
        move_wave_10s: 'move_wave 10s linear infinite',
        move_wave_15s: 'move_wave 15s linear infinite',
      }
    },
  },
  plugins: [],
}
