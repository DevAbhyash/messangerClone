/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        chatTheme:
          'url("/src/chatTheme/5-beautiful-sky-theme-vector-8519.jpg")',
      },
    },
  },
  plugins: [],
};
