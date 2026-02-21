/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        secondary: '#1e293b',
        'accent-blue': '#3b82f6',
        'accent-green': '#10b981',
        'accent-cyan': '#06b6d4',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
