/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // Tells Tailwind to scan your HTML and React files
  ],
  theme: {
    extend: {},  // You can customize the theme here
  },
  plugins: [],   // Add plugins here if needed
}
