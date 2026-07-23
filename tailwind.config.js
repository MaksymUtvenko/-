/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        night: '#0F172A',
        ink: '#1E293B',
        violet: '#8B5CF6',
        cyan: '#22D3EE',
        blush: '#F472B6',
      },
      boxShadow: {
        glow: '0 0 28px rgba(34, 211, 238, 0.28)',
        violet: '0 0 42px rgba(139, 92, 246, 0.32)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.28, transform: 'scale(0.9)' },
          '50%': { opacity: 1, transform: 'scale(1.35)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(18px, -28px, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        twinkle: 'twinkle 4.5s ease-in-out infinite',
        drift: 'drift 12s ease-in-out infinite alternate',
        shimmer: 'shimmer 6s linear infinite alternate',
      },
    },
  },
  plugins: [],
}
