/** @type {import('tailwindcss').Config} */

const { addDynamicIconSelectors } = require('@iconify/tailwind');

export default {
  content: ['./src/**/*.{html,js,hbs,json}'],
  darkMode: 'selector',
  theme: {
    extend: {},
    // container: {
    //   // you can configure the container to be centered
    //   center: true,
    //   padding: '1rem',
    // },
  },
  plugins: [addDynamicIconSelectors()],
};
