/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#0a0f1e',
          2: '#0f1729',
        },
        surface: {
          DEFAULT: '#141e33',
          2: '#1a2540',
          3: '#1f2d4a',
        },
        primary: {
          DEFAULT: '#6366f1',
          light: '#818cf8',
          dark: '#4f52c5',
          glow: 'rgba(99,102,241,0.25)',
        },
        accent: {
          DEFAULT: '#06b6d4',
          light: '#22d3ee',
          glow: 'rgba(6,182,212,0.2)',
        },
        royal: {
          DEFAULT: '#a855f7',
          light: '#c084fc',
          glow: 'rgba(168,85,247,0.2)',
        },
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #6366f1, #06b6d4)',
        'grad-purple': 'linear-gradient(135deg, #a855f7, #6366f1)',
        'grad-surface': 'linear-gradient(135deg, #141e33, #1a2540)',
      },
      animation: {
        'orb-float': 'orbFloat 8s ease-in-out infinite',
        'pulse-dot': 'pulseDot 1.5s ease-in-out infinite',
        'float-card': 'floatCard 4s ease-in-out infinite',
        'central-pulse': 'centralPulse 3s ease-in-out infinite',
      },
      keyframes: {
        orbFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, -30px) scale(1.05)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
        floatCard: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        centralPulse: {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(99,102,241,0.2)' },
          '50%': { transform: 'scale(1.03)', boxShadow: '0 0 0 20px rgba(99,102,241,0)' },
        },
      },
      boxShadow: {
        'glow-primary': '0 0 30px rgba(99,102,241,0.25)',
        'glow-accent': '0 0 30px rgba(6,182,212,0.2)',
        'card': '0 8px 24px rgba(0,0,0,0.4)',
        'card-lg': '0 20px 60px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
