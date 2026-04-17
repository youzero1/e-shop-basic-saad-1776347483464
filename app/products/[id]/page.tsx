'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Heart, Star, Shield, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { createClient } from '@supabase/supabase-js';
import { Product } from '@/types';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { config } = useTheme();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (!id) return;
    const supabase = getSupabase();
    if (!supabase) { setLoading(false); return; }
    supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setProduct({
            id: String(data.id),
            name: data.name,
            price: Number(data.price),
            originalPrice: data.original_price ? Number(data.original_price) : undefined,
            description: data.description,
            category: data.category,
            image: data.image,
            rating: Number(data.rating),
            reviews: Number(data.reviews),
            badge: data.badge ?? undefined,
          });
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div className={['rounded-3xl aspect-square animate-pulse', config.skeleton].join(' ')} />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={['rounded-xl h-8 animate-pulse', config.skeleton].join(' ')} style={{ width: `${70 - i * 10}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-24 text-center">
        <p className="text-6xl mb-4">😕</p>
        <h1 className={['text-2xl font-bold mb-2', config.text].join(' ')}>Product not found</h1>
        <Link href="/products" className={['text-sm font-semibold underline', config.primaryText].join(' ')}>
          Back to Products
        </Link>
      </div>
    );
  }

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <button
        onClick={() => router.back()}
        className={['flex items-center gap-2 text-sm font-medium mb-8 hover:opacity-75 transition-opacity', config.textMuted].join(' ')}
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className={['relative aspect-square rounded-3xl overflow-hidden border', config.bg, config.border].join(' ')}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl">🛍️</div>
          )}
          {product.badge && (
            <span
              className={[
                'absolute top-4 left-4 text-sm font-bold px-3 py-1.5 rounded-full text-white shadow',
                product.badge === 'Sale' ? 'bg-red-500' : product.badge === 'New' ? 'bg-emerald-500' : 'bg-violet-500',
              ].join(' ')}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          <div>
            <span className={['text-xs font-bold uppercase tracking-widest', config.primaryText].join(' ')}>
              {product.category}
            </span>
            <h1 className={['text-3xl font-black mt-1', config.text].join(' ')}>{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(s => (
                <Star
                  key={s}
                  className={[
                    'w-4 h-4',
                    s <= Math.round(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-gray-200 text-gray-200',
                  ].join(' ')}
                />
              ))}
            </div>
            <span className={['text-sm', config.textMuted].join(' ')}>
              {product.rating.toFixed(1)} · {product.reviews.toLocaleString()} reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className={['text-4xl font-black', config.text].join(' ')}>${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className={['text-lg line-through', config.textMuted].join(' ')}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {discount && (
              <span className="text-sm font-bold bg-amber-400 text-amber-900 px-2.5 py-1 rounded-full">
                Save {discount}%
              </span>
            )}
          </div>

          {/* Description */}
          <p className={['text-sm leading-relaxed', config.textMuted].join(' ')}>{product.description}</p>

          {/* Qty + Add to Cart */}
          <div className={['flex items-center gap-3 p-4 rounded-2xl border', config.surface, config.border].join(' ')}>
            <div className={['flex items-center border rounded-xl overflow-hidden', config.border].join(' ')}>
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className={['px-4 py-2.5 text-lg font-bold transition-colors', config.textMuted].join(' ')}
              >
                −
              </button>
              <span className={['px-4 py-2.5 text-sm font-bold border-x', config.text, config.border].join(' ')}>
                {qty}
              </span>
              <button
                onClick={() => setQty(q => q + 1)}
                className={['px-4 py-2.5 text-lg font-bold transition-colors', config.textMuted].join(' ')}
              >
                +
              </button>
            </div>

            <button
              onClick={() => {
                for (let i = 0; i < qty; i++) addToCart(product);
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
              }}
              className={[
                'flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200',
                added ? 'bg-emerald-500' : [config.primary, config.primaryHover].join(' '),
              ].join(' ')}
            >
              <ShoppingCart className="w-4 h-4" />
              {added ? `Added ${qty > 1 ? qty + 'x ' : ''}to Cart!` : 'Add to Cart'}
            </button>

            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={[
                'p-3 rounded-xl border transition-colors',
                config.border,
                config.surface,
              ].join(' ')}
              aria-label="Wishlist"
            >
              <Heart
                className={['w-5 h-5', wishlisted ? 'fill-red-500 text-red-500' : config.textMuted].join(' ')}
              />
            </button>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Truck, label: 'Free Delivery' },
              { icon: Shield, label: 'Secure Pay' },
              { icon: RefreshCw, label: '30-day Return' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className={['flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center', config.surface, config.border].join(' ')}
              >
                <Icon className={['w-5 h-5', config.primaryText].join(' ')} />
                <span className={['text-xs font-medium', config.textMuted].join(' ')}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
