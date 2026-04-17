'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { config } = useTheme();

  return (
    <footer className={`${config.surface} border-t ${config.border} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className={`flex items-center gap-2 font-extrabold text-xl ${config.primaryText} mb-3`}>
              <span className={`${config.primary} text-white p-1.5 rounded-lg`}>
                <Zap className="w-4 h-4" />
              </span>
              ShopZap
            </Link>
            <p className={`text-sm ${config.textMuted} max-w-xs leading-relaxed`}>
              Discover premium products with fast shipping, easy returns, and unbeatable prices.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className={`text-xs font-bold ${config.text} uppercase tracking-widest mb-4`}>Shop</p>
            <ul className="space-y-2">
              {[['All Products', '/products'], ['New Arrivals', '/products'], ['Sale', '/products']].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className={`text-sm ${config.textMuted} hover:${config.primaryText} transition-colors`}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={`text-xs font-bold ${config.text} uppercase tracking-widest mb-4`}>Company</p>
            <ul className="space-y-2">
              {[['About Us', '/about'], ['Contact', '/about'], ['Privacy', '/about']].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className={`text-sm ${config.textMuted} hover:${config.primaryText} transition-colors`}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`border-t ${config.border} mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3`}>
          <p className={`text-xs ${config.textMuted}`}>© 2024 ShopZap. All rights reserved.</p>
          <p className={`text-xs ${config.textMuted}`}>Made with ❤️ for great shopping</p>
        </div>
      </div>
    </footer>
  );
}
