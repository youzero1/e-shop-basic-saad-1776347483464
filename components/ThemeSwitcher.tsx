'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme, THEMES, Theme } from '@/context/ThemeContext';
import { Palette } from 'lucide-react';

export default function ThemeSwitcher() {
  const { theme, setTheme, config } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={[
          'flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-semibold border transition-colors duration-200',
          config.surface,
          config.border,
          config.text,
        ].join(' ')}
        aria-label="Switch theme"
      >
        <Palette className="w-4 h-4" />
        <span className="hidden sm:inline">{THEMES[theme].emoji} {THEMES[theme].label}</span>
      </button>

      {open && (
        <div
          className={[
            'absolute right-0 top-full mt-2 w-44 rounded-2xl shadow-xl border overflow-hidden z-50',
            config.surface,
            config.border,
          ].join(' ')}
        >
          {(Object.keys(THEMES) as Theme[]).map(t => (
            <button
              key={t}
              onClick={() => { setTheme(t); setOpen(false); }}
              className={[
                'w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors text-left',
                t === theme
                  ? [config.primary, 'text-white'].join(' ')
                  : [config.text, 'hover:opacity-80'].join(' '),
              ].join(' ')}
            >
              <span className="text-base">{THEMES[t].emoji}</span>
              {THEMES[t].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
