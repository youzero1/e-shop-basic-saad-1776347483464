'use client';

import Link from 'next/link';
import { ShoppingCart, Zap, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

export default function Navbar() {
  const { totalItems } = useCart();
  const { config } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-50 ${config.navBg} backdrop-blur-md border-b ${config.border} shadow-sm transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className={`flex items-center gap-2 font-extrabold text-xl ${config.primaryText}`}>
            <span className={`${config.primary} text-white p-1.5 rounded-lg`}>
              <Zap className="w-4 h-4" />
            </span>
            ShopZap
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {['/', '/products', '/about'].map((href, i) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium ${config.textMuted} hover:${config.primaryText} transition-colors`}
              >
                {['Home', 'Products', 'About'][i]}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeSwitcher />

            <Link
              href="/cart"
              className={`relative flex items-center gap-2 ${config.primary} ${config.primaryHover} text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className={`md:hidden p-2 rounded-lg ${config.textMuted} hover:${config.bg} transition-colors`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className={`md:hidden border-t ${config.border} ${config.surface} px-4 py-4 flex flex-col gap-3 transition-colors duration-300`}>
          {['/', '/products', '/about'].map((href, i) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium ${config.text} hover:${config.primaryText} transition-colors py-1`}
              onClick={() => setMobileOpen(false)}
            >
              {['Home', 'Products', 'About'][i]}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
