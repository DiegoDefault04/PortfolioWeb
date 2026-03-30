/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cool-gray": {
          900: "#120618",
        },
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      keyframes: {
        typing: {
          from: { width: "100%" },
          "80%": { width: "0" },
          to: { width: "0" },
        },

        cursor: {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "black" },
        },

        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },

      animation: {
        typing: "typing 2.3s steps(16) infinite",
        cursor: "cursor 1s infinite",
        slide: "slide 5s infinite",
        blob: "blob 12s infinite",
      },
    },
  },
  plugins: [],
};
