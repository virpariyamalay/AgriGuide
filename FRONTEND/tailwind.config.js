export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dcf1e4',
          200: '#b8e3ca',
          300: '#8ecfac',
          400: '#5fb588',
          500: '#40916c',
          600: '#2d6a4f',
          700: '#264f3d',
          800: '#1f3d30',
          900: '#193228',
          950: '#0c1a14',
        },
        secondary: {
          50: '#f5f8f6',
          100: '#dfe8e3',
          200: '#c2d1c7',
          300: '#a2b5a7',
          400: '#7e9582',
          500: '#5f7463',
          600: '#4b5e4e',
          700: '#3c4a3d',
          800: '#2e3830',
          900: '#171c18',
        },
        accent: {
          50: '#fdf8f0',
          100: '#f9ecda',
          200: '#f3d9b4',
          300: '#eabb84',
          400: '#e1964c',
          500: '#d6782d',
          600: '#c4591f',
          700: '#a3391b',
          800: '#862e1c',
          900: '#712917',
        },
        neutral: {
          50: '#f8f8f6',
          100: '#f0f0ed',
          200: '#e2e2db',
          300: '#d0d0c5',
          400: '#b7b7a4',
          500: '#a3a38a',
          600: '#8a8a70',
          700: '#72725d',
          800: '#5f5f4f',
          900: '#434339',
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'grow': 'grow 5s ease-in-out infinite',
      },
      keyframes: {
        grow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        }
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        card: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}