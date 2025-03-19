/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors if needed
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'shine': 'shine 1s forwards',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        shine: {
          '100%': {
            'left': '125%',
          },
        },
      },
      boxShadow: {
        'input': '0 2px 4px rgba(0,0,0,0.1)',
        'button': '0 10px 40px -10px rgba(249,115,22,0.5)',
      },
    },
  },
  plugins: [],
}