'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-sm ${
                  product.badge === 'Sale'
                    ? 'bg-rose-500 text-white'
                    : product.badge === 'New'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-violet-500 text-white'
                }`}
              >
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="text-xs font-bold bg-amber-400 text-amber-900 px-2.5 py-1 rounded-full shadow-sm">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={e => {
              e.preventDefault();
              setWishlisted(!wishlisted);
            }}
            aria-label="Wishlist"
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wishlisted ? 'fill-rose-500 text-rose-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{product.category}</span>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug flex-1">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(s => (
                <Star
                  key={s}
                  className={`w-3.5 h-3.5 ${
                    s <= Math.round(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {product.rating.toFixed(1)}
              <span className="text-gray-400 ml-1">({product.reviews.toLocaleString()})</span>
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={e => {
              e.preventDefault();
              addToCart(product);
              setAdded(true);
              setTimeout(() => setAdded(false), 1500);
            }}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              added
                ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-200'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 active:scale-95'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {added ? 'Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
