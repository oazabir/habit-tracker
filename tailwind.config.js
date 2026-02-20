/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7f0',
          100: '#dcebdc',
          200: '#bbd7bb',
          300: '#8fb88f',
          400: '#5a9a5a',
          500: '#3a5a40',  // Main primary dark green
          600: '#2d4a33',
          700: '#243a29',
          800: '#1e2f22',
          900: '#1a261d',
        },
        accent: {
          50: '#f8faf5',
          100: '#e8f3e8',  // Light sage green for cards
          200: '#d4e8d4',
          300: '#b5d6b5',
          400: '#8fbc8f',
          500: '#6a9f6a',
          600: '#4d8150',
          700: '#3d6740',
          800: '#345438',
          900: '#2d4630',
        },
        surface: {
          DEFAULT: '#F8F5F0',  // Warm off-white background
          card: '#ffffff',
          muted: '#E8E4DE',
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#4a4a4a',
          muted: '#6b6b6b',
          light: '#9a9a9a',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
}
