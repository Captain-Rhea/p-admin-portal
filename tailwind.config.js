/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './assets/**/*.css',
    './store/**/*.ts',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans Thai', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', '1.5'],
        sm: ['13px', '1.5'],
        base: ['14px', '1.6'],
        lg: ['16px', '1.6'],
        xl: ['18px', '1.6'],
        '2xl': ['20px', '1.6'],
        '3xl': ['24px', '1.6'],
        '4xl': ['32px', '1.6'],
        '5xl': ['40px', '1.6'],
        '6xl': ['48px', '1.6'],
      },
    },
  },
  plugins: [],
};
