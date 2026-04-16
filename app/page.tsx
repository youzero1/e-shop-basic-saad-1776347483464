'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

export default function HomePage() {
  const { products, loading } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-300 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
              Summer Sale — Up to 40% Off
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Shop the Best.<br />
              <span className="text-yellow-300">Live the Rest.</span>
            </h1>
            <p className="text-blue-100 text-lg mb-8 max-w-lg">
              Discover thousands of premium products with fast shipping, easy returns, and unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-full hover:bg-yellow-300 hover:text-blue-900 transition-all shadow-lg"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border-2 border-white/50 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <Image
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
                alt="Hero Product"
                fill
                className="object-cover rounded-3xl shadow-2xl"
                priority
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Quality Assured</p>
                  <p className="text-sm font-bold text-gray-800">100% Genuine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="bg-blue-50 p-3 rounded-full">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Free Shipping</h3>
              <p className="text-sm text-gray-500">On orders over $50</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-blue-50 p-3 rounded-full">
                <RefreshCw className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Easy Returns</h3>
              <p className="text-sm text-gray-500">30-day return policy</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-blue-50 p-3 rounded-full">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Secure Checkout</h3>
              <p className="text-sm text-gray-500">256-bit SSL encryption</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
            <p className="text-gray-500 mt-1">Handpicked just for you</p>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1 text-blue-600 font-semibold hover:gap-2 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-200" />
                <div className="p-4 flex flex-col gap-3">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-8 bg-gray-200 rounded-xl mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="sm:hidden mt-6 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white border-y border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah M.', text: 'Amazing quality and super fast delivery! Will definitely shop again.', rating: 5 },
              { name: 'James K.', text: 'The best online shopping experience I have had. Products are exactly as described.', rating: 5 },
              { name: 'Emily R.', text: 'Great prices and excellent customer service. Highly recommend ShopZap!', rating: 4 },
            ].map((review, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic">"{review.text}"</p>
                <p className="font-semibold text-gray-800 text-sm">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Start Shopping?</h2>
          <p className="text-blue-100 text-lg mb-8">Join thousands of happy customers and discover amazing deals today.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-full hover:bg-yellow-300 hover:text-blue-900 transition-all shadow-xl text-lg"
          >
            Browse All Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
