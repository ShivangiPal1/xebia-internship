/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        campus: {
          ink: "#18212f",
          mist: "#f4f7fb",
          teal: "#0f766e",
          coral: "#f9735b",
          gold: "#f5b942"
        }
      },
      boxShadow: {
        soft: "0 16px 40px rgba(24, 33, 47, 0.08)"
      }
    }
  },
  plugins: []
};
