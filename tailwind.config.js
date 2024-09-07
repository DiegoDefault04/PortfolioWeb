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
        'cool-gray': {
          900: '#120618',
          // otros tonos
        },
        // otros colores personalizados
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        typing: {
          'from': { width: '100%' },
          '90%': { width: '0' },
          'to': { width: '0' }
        },
        cursor: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: 'black' }
        },
      },
      animation: {
        typing: 'typing 5s steps(16) infinite',
        cursor: 'cursor 1s infinite',
        slide: 'slide 5s infinite'
      }
    },
  },
  plugins: [],
};
