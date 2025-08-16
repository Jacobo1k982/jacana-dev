/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '4rem',
          '3xl': '5rem',
        },
      },
      screens: {
        '4k': '1980px',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff',
          },
          '50%': {
            boxShadow: '0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #00ffff',
          },
        },
        futuristicSlide: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
      },
      animation: {
        float: 'float 18s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.5s infinite ease-in-out',
        futuristicSlide: 'futuristicSlide 1s ease-out',
      },
      colors: {
        neon: {
          blue: '#00ffff',
          purple: '#9b00ff',
          pink: '#ff00f7',
        },
      },
      fontFamily: {
        futuristic: ['var(--font-orbitron)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
