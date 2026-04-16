'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  ChevronRight,
  Truck,
  RefreshCw,
  ShieldCheck,
  Star,
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

const CATEGORIES = [
  { label: 'Electronics', emoji: '📱', color: 'bg-blue-50 hover:bg-blue-100 border-blue-100' },
  { label: 'Footwear', emoji: '👟', color: 'bg-rose-50 hover:bg-rose-100 border-rose-100' },
  { label: 'Clothing', emoji: '👕', color: 'bg-amber-50 hover:bg-amber-100 border-amber-100' },
  { label: 'Accessories', emoji: '⌚', color: 'bg-violet-50 hover:bg-violet-100 border-violet-100' },
  { label: 'Home', emoji: '🏠', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-100' },
  { label: 'All', emoji: '🛍️', color: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-100' },
];

const TESTIMONIALS = [
  { name: 'Sarah M.', text: 'Amazing quality and super fast delivery! Will definitely shop again.', rating: 5, avatar: 'SM', color: 'bg-pink-100 text-pink-700' },
  { name: 'James K.', text: "The best online shopping experience I've ever had. Products are exactly as described.", rating: 5, avatar: 'JK', color: 'bg-indigo-100 text-indigo-700' },
  { name: 'Emily R.', text: 'Great prices and excellent customer service. Highly recommend ShopZap!', rating: 4, avatar: 'ER', color: 'bg-emerald-100 text-emerald-700' },
];

export default function HomePage() {
  const { products, loading } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 text-white">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-violet-500 rounded-full opacity-20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-indigo-300 rounded-full opacity-20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600 rounded-full opacity-10 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-widest border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Summer Sale — Up to 40% Off
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-5 tracking-tight">
              Shop the Best.<br />
              <span className="text-amber-300">Live the Rest.</span>
            </h1>
            <p className="text-indigo-100 text-lg mb-8 max-w-md leading-relaxed">
              Discover premium products with fast shipping, easy returns, and unbeatable prices.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-7 py-3.5 rounded-full hover:bg-amber-300 hover:text-indigo-900 transition-all shadow-xl hover:shadow-2xl active:scale-95 text-sm"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 hover:border-white/50 transition-all text-sm"
              >
                Learn More
              </Link>
            </div>
            <div className="flex gap-8 mt-10">
              {([['10k+', 'Happy Customers'], ['500+', 'Products'], ['4.9★', 'Avg Rating']] as const).map(
                ([val, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-extrabold text-white">{val}</p>
                    <p className="text-xs text-indigo-200 mt-0.5">{label}</p>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative w-72 h-72 md:w-[400px] md:h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-indigo-400 rounded-3xl opacity-20 blur-2xl scale-105" />
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop"
                alt="Featured Product"
                fill
                className="object-cover rounded-3xl shadow-2xl relative z-10"
                priority
              />
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 z-20">
                <div className="bg-emerald-100 p-2.5 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Quality Assured</p>
                  <p className="text-sm font-bold text-gray-800">100% Genuine</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-amber-400 rounded-2xl shadow-lg px-3 py-2 z-20">
                <p className="text-xs font-bold text-amber-900">🔥 Trending</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            {[
              { icon: <Truck className="w-6 h-6 text-indigo-600" />, title: 'Free Shipping', sub: 'On all orders over $50', bg: 'bg-indigo-50' },
              { icon: <RefreshCw className="w-6 h-6 text-violet-600" />, title: 'Easy Returns', sub: '30-day no-hassle policy', bg: 'bg-violet-50' },
              { icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />, title: 'Secure Checkout', sub: '256-bit SSL encryption', bg: 'bg-emerald-50' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 py-4 sm:py-0 sm:px-6 first:pl-0 last:pr-0">
                <div className={`${item.bg} p-3 rounded-2xl flex-shrink-0`}>{item.icon}</div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">Handpicked for you</p>
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1.5 text-indigo-600 font-semibold text-sm hover:text-indigo-800 group transition-colors"
          >
            View All <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-100" />
                <div className="p-4 flex flex-col gap-3">
                  <div className="h-3 bg-gray-100 rounded-full w-1/3" />
                  <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-3 bg-gray-100 rounded-full w-1/2" />
                  <div className="h-10 bg-gray-100 rounded-xl mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
            <p className="font-bold text-gray-700 text-lg mb-2">No products yet</p>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              Run the seed SQL in your Supabase project to populate the products table.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}

        <div className="sm:hidden mt-6 text-center">
          <Link href="/products" className="inline-flex items-center gap-2 text-indigo-600 font-semibold text-sm">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">Browse by</p>
            <h2 className="text-3xl font-extrabold text-gray-900">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.label}
                href={cat.label === 'All' ? '/products' : `/products?category=${cat.label}`}
                className={`${cat.color} border rounded-2xl p-5 flex flex-col items-center gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-md group`}
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{cat.emoji}</span>
                <span className="text-sm font-semibold text-gray-700">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">Happy customers</p>
          <h2 className="text-3xl font-extrabold text-gray-900">What People Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 hover:shadow-md transition-shadow">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${s <= t.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-100 text-gray-100'}`}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-xs font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">Verified Buyer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Ready to Start Shopping?</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-xl mx-auto">
            Join thousands of happy customers and discover amazing deals today.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-full hover:bg-amber-300 hover:text-indigo-900 transition-all shadow-2xl text-base active:scale-95"
          >
            Browse All Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
