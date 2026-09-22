/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f6',
          100: '#ffe4ed',
          200: '#fccce0',
          300: '#f9a8c9',
          400: '#f475a8',
          500: '#e8608c',
          600: '#d5346d',
          700: '#b42354',
          800: '#952047',
          900: '#7d203f',
        },
        rosebg: '#FFF0F5',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
