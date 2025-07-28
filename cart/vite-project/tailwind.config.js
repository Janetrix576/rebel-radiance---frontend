/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-purple': '#8a2be2',
        'electric-purple-light': '#b57edc',
        'electric-purple-dark': '#5a1e9e',
      }
    },
  },
  plugins: [],
}