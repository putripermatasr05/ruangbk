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
        display: ['"Plus Jakarta Sans"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#FAF8FF',
          2: '#FFFFFF',
          soft: '#F4F0FF',
        },
        surface: {
          DEFAULT: 'rgba(255, 255, 255, 0.88)',
          2: '#F8F6FF',
          3: '#EDE9FE',
          dark: '#1E1B2E',
        },
        primary: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
          dark: '#6D28D9',
          glow: 'rgba(139, 92, 246, 0.25)',
        },
        accent: {
          DEFAULT: '#06B6D4',
          light: '#22D3EE',
          glow: 'rgba(6, 182, 212, 0.2)',
        },
        royal: {
          DEFAULT: '#A855F7',
          light: '#C084FC',
          glow: 'rgba(168, 85, 247, 0.2)',
        },
        pastel: {
          yellow: '#FEF8D8',
          yellowBtn: '#FACC15',
          purple: '#F3E8FF',
          mint: '#DCFCE7',
          peach: '#FFEDD5',
          rose: '#FCE7F3',
          sky: '#E0F2FE',
        },
      },
      backgroundImage: {
        'grad-primary': 'linear-gradient(135deg, #8B5CF6, #6366F1)',
        'grad-purple': 'linear-gradient(135deg, #A855F7, #6366F1)',
        'grad-pastel': 'linear-gradient(135deg, #FAF5FF, #F3E8FF, #FEF3C7)',
        'grad-aurora': 'linear-gradient(120deg, #F3E8FF 0%, #FCE7F3 50%, #FEF3C7 100%)',
        'grad-surface': 'linear-gradient(135deg, #FFFFFF, #F8F6FF)',
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
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(139,92,246,0.2)' },
          '50%': { transform: 'scale(1.03)', boxShadow: '0 0 0 20px rgba(139,92,246,0)' },
        },
      },
      boxShadow: {
        'glow-primary': '0 8px 25px rgba(139, 92, 246, 0.3)',
        'glow-accent': '0 8px 25px rgba(6, 182, 212, 0.25)',
        'dock': '0 12px 35px rgba(139, 92, 246, 0.16)',
        'card': '0 8px 24px rgba(139, 92, 246, 0.06)',
        'card-hover': '0 16px 36px rgba(139, 92, 246, 0.12)',
        'card-lg': '0 20px 50px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
