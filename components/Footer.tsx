'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-extrabold text-lg text-indigo-600 mb-3">
              <span className="bg-indigo-600 text-white p-1.5 rounded-lg">
                <Zap className="w-4 h-4" />
              </span>
              ShopZap
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Premium products at unbeatable prices. Fast shipping, easy returns.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">All Products</Link></li>
              <li><Link href="/products?category=Electronics" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=Clothing" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Clothing</Link></li>
              <li><Link href="/products?category=Footwear" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Footwear</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">About Us</Link></li>
              <li><Link href="/" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Home</Link></li>
              <li><Link href="/cart" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Support</h3>
            <ul className="space-y-2">
              <li><span className="text-sm text-gray-500">Free shipping over $50</span></li>
              <li><span className="text-sm text-gray-500">30-day returns</span></li>
              <li><span className="text-sm text-gray-500">SSL secure checkout</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} ShopZap. All rights reserved.</p>
          <p className="text-xs text-gray-400">Built with Next.js &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
