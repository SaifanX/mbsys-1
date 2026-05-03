/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#EF4444",
        secondary: "#06B6D4",
        "background-dark": "#0B1120",
        "background-light": "#F8FAFC",
        "surface-dark": "#111827",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
      animation: {
        'fade-in-up': 'fade-in-up 1.2s cubic-bezier(0.2, 1, 0.3, 1) forwards',
        'fade-in-down': 'fade-in-down 1.2s cubic-bezier(0.2, 1, 0.3, 1) forwards',
        'modal-enter': 'modal-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 1s cubic-bezier(0.2, 1, 0.3, 1) forwards',
        'fade-in-backdrop': 'fade-in 0.6s ease-out forwards',
        'bounce-subtle': 'bounce-subtle 3s ease-in-out infinite',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translate3d(0, 20px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translate3d(0, -20px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'modal-enter': {
          '0%': { opacity: '0', transform: 'translate3d(0, 30px, 0) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
