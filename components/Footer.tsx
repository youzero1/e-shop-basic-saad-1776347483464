'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { config } = useTheme();

  return (
    <footer
      className={[
        'border-t mt-auto py-10 px-4 transition-colors duration-300',
        config.surface,
        config.border,
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link
          href="/"
          className={['flex items-center gap-2 font-extrabold text-lg', config.primaryText].join(' ')}
        >
          <span className={['p-1.5 rounded-lg text-white', config.primary].join(' ')}>
            <Zap className="w-4 h-4" />
          </span>
          ShopZap
        </Link>

        <nav className="flex flex-wrap items-center gap-6">
          {([['/', 'Home'], ['/products', 'Products'], ['/about', 'About'], ['/cart', 'Cart']] as const).map(
            ([href, label]) => (
              <Link
                key={href}
                href={href}
                className={['text-sm font-medium hover:underline transition-colors', config.textMuted].join(' ')}
              >
                {label}
              </Link>
            )
          )}
        </nav>

        <p className={['text-sm', config.textMuted].join(' ')}>
          © {new Date().getFullYear()} ShopZap. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
