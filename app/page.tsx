'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, RefreshCw, ShieldCheck, Star, Sparkles } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const { products, loading, error } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <div className="bg-gray-50">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-700 text-white">
        {/* blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-500 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-300 rounded-full opacity-20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5" /> Summer Sale — Up to 40% Off
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-5">
              Shop the Best.<br />
              <span className="text-amber-300">Live the Rest.</span>
            </h1>
            <p className="text-indigo-100 text-lg mb-8 max-w-md">
              Discover premium products with fast shipping, easy returns, and unbeatable prices.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-6 py-3 rounded-full hover:bg-amber-300 hover:text-indigo-900 transition-all shadow-lg"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop"
                alt="Featured Product"
                fill
                className="object-cover rounded-3xl shadow-2xl"
                priority
              />
              {/* floating badge */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3">
                <div className="bg-emerald-100 p-2 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Quality Assured</p>
                  <p className="text-sm font-bold text-gray-800">100% Genuine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Feature Bar ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: <Truck className="w-6 h-6 text-indigo-600" />, title: 'Free Shipping', sub: 'On all orders over $50' },
              { icon: <RefreshCw className="w-6 h-6 text-indigo-600" />, title: 'Easy Returns', sub: '30-day no-hassle policy' },
              { icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />, title: 'Secure Checkout', sub: '256-bit SSL encryption' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="bg-indigo-50 p-3 rounded-2xl flex-shrink-0">{f.icon}</div>
                <div>
                  <p className="font-semibold text-gray-900">{f.title}</p>
                  <p className="text-sm text-gray-500">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-1">Handpicked for you</p>
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1.5 text-indigo-600 font-semibold text-sm hover:gap-3 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 flex flex-col gap-3">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-9 bg-gray-200 rounded-xl mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : error === 'no_products' || featured.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-4">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
            <p className="font-semibold text-gray-700 text-lg mb-1">No products yet</p>
            <p className="text-gray-400 text-sm max-w-sm mx-auto">
              Run the seed SQL in your Supabase project to populate the products table.
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p className="font-semibold text-red-600">Failed to load products</p>
            <p className="text-red-400 text-sm mt-1">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="sm:hidden mt-6 text-center">
          <Link href="/products" className="inline-flex items-center gap-2 text-indigo-600 font-semibold">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-1">Browse by</p>
            <h2 className="text-3xl font-extrabold text-gray-900">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Electronics', emoji: '📱', color: 'bg-blue-50 hover:bg-blue-100' },
              { label: 'Footwear', emoji: '👟', color: 'bg-rose-50 hover:bg-rose-100' },
              { label: 'Clothing', emoji: '👕', color: 'bg-amber-50 hover:bg-amber-100' },
              { label: 'Accessories', emoji: '⌚', color: 'bg-violet-50 hover:bg-violet-100' },
              { label: 'Home', emoji: '🏠', color: 'bg-emerald-50 hover:bg-emerald-100' },
              { label: 'All', emoji: '🛍️', color: 'bg-indigo-50 hover:bg-indigo-100' },
            ].map((cat) => (
              <Link
                key={cat.label}
                href={cat.label === 'All' ? '/products' : `/products?category=${cat.label}`}
                className={`${cat.color} rounded-2xl p-5 flex flex-col items-center gap-2 transition-all hover:-translate-y-1 hover:shadow-md`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm font-semibold text-gray-700">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest mb-1">Happy customers</p>
          <h2 className="text-3xl font-extrabold text-gray-900">What People Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Sarah M.', text: 'Amazing quality and super fast delivery! Will definitely shop again.', rating: 5, avatar: 'SM' },
            { name: 'James K.', text: 'The best online shopping experience I\'ve ever had. Products are exactly as described.', rating: 5, avatar: 'JK' },
            { name: 'Emily R.', text: 'Great prices and excellent customer service. Highly recommend ShopZap!', rating: 4, avatar: 'ER' },
          ].map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= r.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex-1">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                  {r.avatar}
                </div>
                <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Start Shopping?</h2>
          <p className="text-indigo-100 text-lg mb-8">Join thousands of happy customers and discover amazing deals today.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-full hover:bg-amber-300 hover:text-indigo-900 transition-all shadow-xl text-lg"
          >
            Browse All Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
