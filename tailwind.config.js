/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#333C4B", 
        secondary: "#3D38ED",
        background: "#FFFFFF",
      },
    },
  },
  plugins: [],
}

