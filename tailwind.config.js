/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // This line enables dark mode
  theme: {
    extend: {
      colors: {
        'game-bg': '#1a202c',
        'card-bg': '#2d3748',
        'accent-purple': '#9f7aea',
        'accent-pink': '#ed64a6',
      },
      filter: ['grayscale'],
      contrast: {
        200: '2',
      },
    },
  },
  variants: {
    extend: {
      filter: ['hover', 'focus'],
    },
  },
  plugins: [],
}
