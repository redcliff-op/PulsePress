/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'background': '#161622',
        'textFieldBackground': '#283A4A',
        'sigYellow': '#FFA001'
      },
    },
  },
  plugins: [],
}