'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <Zap className="w-6 h-6 fill-blue-600" />
            <span>ShopZap</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-500 hover:bg-gray-200 transition-colors">
              <Search className="w-4 h-4" />
              <span>Search...</span>
            </button>

            <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 text-sm font-medium text-gray-600">
          <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/products" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 transition-colors">Products</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-600 transition-colors">About</Link>
        </div>
      )}
    </nav>
  );
}
