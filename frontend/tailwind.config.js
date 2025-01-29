/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        loader: 'loader 3s linear infinite',
      },
      colors:{
        facebookBlue:'rgb(9, 101, 253)',

      },
      keyframes: {
        loader: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '800px 0' },
        },
      },
    },
  },
  plugins: [],
}