/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}",
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [
    require('flowbite/plugin'),
  ],
}

