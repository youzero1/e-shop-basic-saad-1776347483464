'use client';

import { useTheme, THEMES, Theme } from '@/context/ThemeContext';
import { Palette } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Switch theme"
        className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-600 hover:text-indigo-600 hover:border-indigo-300 transition-all text-xs font-semibold shadow-sm"
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">{THEMES[theme].emoji} {THEMES[theme].label}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 py-1">
          <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Choose Theme</p>
          {(Object.keys(THEMES) as Theme[]).map(t => (
            <button
              key={t}
              onClick={() => { setTheme(t); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium transition-colors ${
                theme === t
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-base">{THEMES[t].emoji}</span>
              <span>{THEMES[t].label}</span>
              {theme === t && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
