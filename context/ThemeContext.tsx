'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'rose' | 'emerald' | 'amber';

interface ThemeConfig {
  label: string;
  emoji: string;
  bg: string;
  surface: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryHover: string;
  primaryText: string;
  accent: string;
  ring: string;
  navBg: string;
  skeleton: string;
  heroBg: string;
  heroText: string;
  heroSub: string;
  ctaBg: string;
}

export const THEMES: Record<Theme, ThemeConfig> = {
  light: {
    label: 'Light',
    emoji: '☀️',
    bg: 'bg-gray-50',
    surface: 'bg-white',
    border: 'border-gray-100',
    text: 'text-gray-900',
    textMuted: 'text-gray-500',
    primary: 'bg-indigo-600',
    primaryHover: 'hover:bg-indigo-700',
    primaryText: 'text-indigo-600',
    accent: 'bg-amber-400',
    ring: 'focus:ring-indigo-500',
    navBg: 'bg-white/80',
    skeleton: 'bg-gray-100',
    heroBg: 'from-indigo-700 via-indigo-600 to-violet-700',
    heroText: 'text-amber-300',
    heroSub: 'text-indigo-100',
    ctaBg: 'from-indigo-600 via-indigo-600 to-violet-600',
  },
  dark: {
    label: 'Dark',
    emoji: '🌙',
    bg: 'bg-gray-950',
    surface: 'bg-gray-900',
    border: 'border-gray-800',
    text: 'text-gray-100',
    textMuted: 'text-gray-400',
    primary: 'bg-indigo-500',
    primaryHover: 'hover:bg-indigo-400',
    primaryText: 'text-indigo-400',
    accent: 'bg-amber-400',
    ring: 'focus:ring-indigo-400',
    navBg: 'bg-gray-900/90',
    skeleton: 'bg-gray-800',
    heroBg: 'from-gray-900 via-gray-800 to-indigo-950',
    heroText: 'text-indigo-400',
    heroSub: 'text-gray-400',
    ctaBg: 'from-gray-900 via-gray-800 to-indigo-950',
  },
  rose: {
    label: 'Rose',
    emoji: '🌸',
    bg: 'bg-rose-50',
    surface: 'bg-white',
    border: 'border-rose-100',
    text: 'text-gray-900',
    textMuted: 'text-gray-500',
    primary: 'bg-rose-500',
    primaryHover: 'hover:bg-rose-600',
    primaryText: 'text-rose-500',
    accent: 'bg-pink-400',
    ring: 'focus:ring-rose-400',
    navBg: 'bg-white/80',
    skeleton: 'bg-rose-100',
    heroBg: 'from-rose-600 via-rose-500 to-pink-600',
    heroText: 'text-pink-200',
    heroSub: 'text-rose-100',
    ctaBg: 'from-rose-500 via-rose-500 to-pink-500',
  },
  emerald: {
    label: 'Emerald',
    emoji: '🌿',
    bg: 'bg-emerald-50',
    surface: 'bg-white',
    border: 'border-emerald-100',
    text: 'text-gray-900',
    textMuted: 'text-gray-500',
    primary: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    primaryText: 'text-emerald-600',
    accent: 'bg-teal-400',
    ring: 'focus:ring-emerald-500',
    navBg: 'bg-white/80',
    skeleton: 'bg-emerald-100',
    heroBg: 'from-emerald-700 via-emerald-600 to-teal-700',
    heroText: 'text-teal-200',
    heroSub: 'text-emerald-100',
    ctaBg: 'from-emerald-600 via-emerald-600 to-teal-600',
  },
  amber: {
    label: 'Amber',
    emoji: '🔥',
    bg: 'bg-amber-50',
    surface: 'bg-white',
    border: 'border-amber-100',
    text: 'text-gray-900',
    textMuted: 'text-gray-500',
    primary: 'bg-amber-500',
    primaryHover: 'hover:bg-amber-600',
    primaryText: 'text-amber-600',
    accent: 'bg-orange-400',
    ring: 'focus:ring-amber-400',
    navBg: 'bg-white/80',
    skeleton: 'bg-amber-100',
    heroBg: 'from-amber-600 via-orange-500 to-red-600',
    heroText: 'text-yellow-200',
    heroSub: 'text-amber-100',
    ctaBg: 'from-amber-500 via-orange-500 to-red-500',
  },
};

interface ThemeContextType {
  theme: Theme;
  config: ThemeConfig;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('shopzap-theme') as Theme | null;
      if (stored && THEMES[stored]) setThemeState(stored);
    } catch {}
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try { localStorage.setItem('shopzap-theme', t); } catch {}
  };

  return (
    <ThemeContext.Provider value={{ theme, config: THEMES[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
