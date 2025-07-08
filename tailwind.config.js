/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          DEFAULT: '#059669',      // emerald-600
          light: '#6ee7b7',        // emerald-300
          dark: '#047857',         // emerald-800
        },
        secondary: {
          DEFAULT: '#14b8a6',      // teal-600
          light: '#5eead4',        // teal-300
          dark: '#0f766e',         // teal-800
        },
        accent: {
          DEFAULT: '#f59e42',      // orange-400 (example accent)
          light: '#fbbf24',        // yellow-400
          dark: '#ea580c',         // orange-700
        },
        // Utility colors
        muted: '#f3f4f6',          // gray-100
        border: '#e5e7eb',         // gray-200
        background: '#f9fafb',     // gray-50
        surface: '#ffffff',        // white
        danger: '#ef4444',         // red-500
        warning: '#f59e42',        // orange-400
        success: '#10b981',        // emerald-500
        info: '#3b82f6',           // blue-500
      },
    },
  },
  plugins: [],
}