'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { Product } from '@/types';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function mapProduct(p: any): Product {
  return {
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
  };
}

export default function ProductsPage() {
  const { config } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) { setLoading(false); return; }
    supabase
      .from('products')
      .select('*')
      .then(({ data }) => {
        if (data) setProducts(data.map(mapProduct));
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filtered = products
    .filter(p => {
      const matchCat = category === 'All' || p.category === category;
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className={['text-xs font-bold uppercase tracking-widest mb-1', config.primaryText].join(' ')}>
          Our Collection
        </p>
        <h1 className={['text-4xl font-extrabold', config.text].join(' ')}>All Products</h1>
      </div>

      {/* Filters */}
      <div className={['flex flex-col md:flex-row gap-4 mb-8 p-4 rounded-2xl border', config.surface, config.border].join(' ')}>
        {/* Search */}
        <div className="relative flex-1">
          <Search className={['absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4', config.textMuted].join(' ')} />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={[
              'w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm outline-none transition-colors',
              config.bg,
              config.border,
              config.text,
            ].join(' ')}
          />
        </div>

        {/* Category */}
        <div className="flex items-center gap-2 flex-wrap">
          <SlidersHorizontal className={['w-4 h-4', config.textMuted].join(' ')} />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={[
                'px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors',
                category === cat
                  ? ['text-white border-transparent', config.primary].join(' ')
                  : [config.textMuted, config.border].join(' '),
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className={[
            'px-3 py-2.5 rounded-xl border text-sm outline-none transition-colors',
            config.bg,
            config.border,
            config.text,
          ].join(' ')}
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={['rounded-2xl h-80 animate-pulse', config.skeleton].join(' ')} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className={['text-5xl mb-4'].join(' ')}>🔍</p>
          <p className={['text-xl font-bold mb-2', config.text].join(' ')}>No products found</p>
          <p className={['text-sm', config.textMuted].join(' ')}>
            {products.length === 0
              ? 'Add products to your Supabase database to see them here.'
              : 'Try adjusting your search or filters.'}
          </p>
        </div>
      ) : (
        <>
          <p className={['text-sm mb-4', config.textMuted].join(' ')}>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
