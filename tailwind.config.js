/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    boxShadow: {
      custom: '0 10px 10px -10px rgba(128, 128, 128, 0.5)',
    },
    extend: {},
  },
  plugins: [],
}

