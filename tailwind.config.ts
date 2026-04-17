import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // backgrounds
    'bg-gray-50', 'bg-gray-950', 'bg-rose-50', 'bg-emerald-50', 'bg-amber-50',
    'bg-white', 'bg-gray-900', 'bg-gray-800', 'bg-indigo-950',
    'bg-gray-100', 'bg-gray-800', 'bg-rose-100', 'bg-emerald-100', 'bg-amber-100',
    'bg-indigo-600', 'bg-indigo-500', 'bg-rose-500', 'bg-emerald-600', 'bg-amber-500',
    'bg-amber-400', 'bg-pink-400', 'bg-teal-400', 'bg-orange-400',
    // hovers
    'hover:bg-indigo-700', 'hover:bg-indigo-400', 'hover:bg-rose-600',
    'hover:bg-emerald-700', 'hover:bg-amber-600',
    // text
    'text-gray-900', 'text-gray-100', 'text-gray-500', 'text-gray-400',
    'text-indigo-600', 'text-indigo-400', 'text-rose-500', 'text-emerald-600', 'text-amber-600',
    'text-amber-300', 'text-indigo-100', 'text-pink-200', 'text-rose-100',
    'text-teal-200', 'text-emerald-100', 'text-yellow-200', 'text-amber-100',
    // borders
    'border-gray-100', 'border-gray-800', 'border-rose-100', 'border-emerald-100', 'border-amber-100',
    // nav backgrounds
    'bg-white/80', 'bg-gray-900/90',
    // gradients
    'from-indigo-700', 'via-indigo-600', 'to-violet-700',
    'from-gray-900', 'via-gray-800', 'to-indigo-950',
    'from-rose-600', 'via-rose-500', 'to-pink-600',
    'from-emerald-700', 'via-emerald-600', 'to-teal-700',
    'from-amber-600', 'via-orange-500', 'to-red-600',
    'from-indigo-600', 'to-violet-600',
    'from-rose-500', 'to-pink-500',
    'to-teal-600',
    'from-amber-500', 'to-red-500',
    // focus rings
    'focus:ring-indigo-500', 'focus:ring-indigo-400', 'focus:ring-rose-400',
    'focus:ring-emerald-500', 'focus:ring-amber-400',
    // misc
    'min-h-screen', 'flex', 'flex-col', 'transition-colors', 'duration-300',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',
        'card-hover': '0 10px 40px -10px rgb(0 0 0 / 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
