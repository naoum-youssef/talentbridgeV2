
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0088cc',
          50: '#e6f6ff',
          100: '#b3e0ff',
          // other shades as provided earlier
        },
        secondary: {
          DEFAULT: '#9932cc',
          // other shades as provided earlier
        },
        dashboard: {
          sidebar: '#2a3042',
          active: '#3a4156',
          light: '#f8fafd',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 5px 15px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}