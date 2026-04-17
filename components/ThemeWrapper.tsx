'use client';

import { useTheme } from '@/context/ThemeContext';
import { ReactNode } from 'react';

export default function ThemeWrapper({ children }: { children: ReactNode }) {
  const { config } = useTheme();

  return (
    <div
      className={[
        'min-h-screen',
        'flex',
        'flex-col',
        config.bg,
        config.text,
        'transition-colors',
        'duration-300',
      ].join(' ')}
    >
      {children}
    </div>
  );
}
