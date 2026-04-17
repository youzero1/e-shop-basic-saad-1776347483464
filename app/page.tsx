'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Shield, Truck, RefreshCw, Star } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import ProductCard from '@/components/ProductCard';
import { createClient } from '@supabase/supabase-js';
import { Product } from '@/types';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default function HomePage() {
  const { config } = useTheme();
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) { setLoading(false); return; }
    supabase
      .from('products')
      .select('*')
      .limit(4)
      .then(({ data }) => {
        if (data) {
          setFeatured(
            data.map((p: any) => ({
              id: String(p.id),
              name: p.name,
              price: Number(p.price),
              originalPrice: p.original_price ? Number(p.original_price) : undefined,
              description: p.description,
              category: p.category,
              image: p.image,
              rating: Number(p.rating),
              reviews: Number(p.reviews),
              badge: p.badge ?? undefined,
            }))
          );
        }
        setLoading(false);
      });
  }, []);

  const features = [
    { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: Shield, title: 'Secure Payments', desc: '100% protected' },
    { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
    { icon: Star, title: 'Top Rated', desc: '50k+ happy customers' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className={[
          'relative overflow-hidden bg-gradient-to-br py-24 px-4 text-center',
          config.heroBg,
        ].join(' ')}
      >
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <span
            className={[
              'inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm',
              config.heroText,
            ].join(' ')}
          >
            <ShoppingBag className="w-4 h-4" />
            New Arrivals — Summer 2024
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
            Discover
            <span className={[' block', config.heroText].join('')}> Amazing Deals</span>
          </h1>
          <p className={['text-lg max-w-xl', config.heroSub].join(' ')}>
            Shop premium products at unbeatable prices. Quality guaranteed, delivery in 2–5 days.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-7 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white/10 text-white font-bold px-7 py-3.5 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className={['py-10 px-4 border-b', config.surface, config.border].join(' ')}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2">
              <span className={['w-10 h-10 rounded-xl flex items-center justify-center text-white', config.primary].join(' ')}>
                <Icon className="w-5 h-5" />
              </span>
              <span className={['text-sm font-bold', config.text].join(' ')}>{title}</span>
              <span className={['text-xs', config.textMuted].join(' ')}>{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className={['text-xs font-bold uppercase tracking-widest mb-1', config.primaryText].join(' ')}>
              Handpicked for You
            </p>
            <h2 className={['text-3xl font-extrabold', config.text].join(' ')}>Featured Products</h2>
          </div>
          <Link
            href="/products"
            className={['flex items-center gap-1 text-sm font-semibold', config.primaryText].join(' ')}
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={['rounded-2xl h-80 animate-pulse', config.skeleton].join(' ')} />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-20">
            <p className={['text-lg font-semibold', config.textMuted].join(' ')}>
              No products yet. Add some in your Supabase database!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section
        className={[
          'mx-4 mb-16 rounded-3xl bg-gradient-to-r py-16 px-8 text-center text-white overflow-hidden',
          config.ctaBg,
        ].join(' ')}
      >
        <h2 className="text-3xl font-black mb-3">Ready to start shopping?</h2>
        <p className="text-white/80 mb-6 max-w-md mx-auto">
          Browse our full catalog and find exactly what you need.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          Browse All Products <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
