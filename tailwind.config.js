const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        ripple: {
          to: {
            transform: 'scale(4)',
            opacity: '0',
          },
        },
      },
      animation: {
        rippleAnime: 'ripple 3s cubic-bezier(0.075, 0.82, 0.165, 1)',
      },
      fontFamily: {
        sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
      },
      screens: {
        'mp': '380px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
