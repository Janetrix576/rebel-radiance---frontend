/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'electric-purple': '#B026FF',
        'electric-blue': '#00F0FF',
        'dark-bg': '#0D0C1D',
        'light-gray': '#9CA3AF',
        'dark-gray': '#1F2937',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulseGlow: {
          'from': { boxShadow: '0 0 20px rgba(176, 38, 255, 0.4), 0 0 40px rgba(0, 240, 255, 0.3)' },
          'to': { boxShadow: '0 0 30px rgba(176, 38, 255, 0.6), 0 0 60px rgba(0, 240, 255, 0.4)' },
        },
      },
      animation: {
        gradientShift: 'gradientShift 8s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite alternate',
      },
      boxShadow: {
        'glow-effect': '0 0 30px rgba(176, 38, 255, 0.3), 0 0 60px rgba(0, 240, 255, 0.2)',
        'card-hover': '0 10px 30px rgba(0, 240, 255, 0.2)',
      },
      textShadow: {
        'glow': '0 0 15px rgba(176, 38, 255, 0.4)',
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        { 'text-shadow': (value) => ({ textShadow: value }) },
        { values: theme('textShadow') }
      );
    },
  ],
};