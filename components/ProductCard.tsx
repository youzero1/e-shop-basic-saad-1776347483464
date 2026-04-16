'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWish = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWished(!wished);
  };

  const discount =
    product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
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
            onClick={handleWish}
            aria-label="Wishlist"
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wished ? 'fill-rose-500 text-rose-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
            {product.category}
          </span>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug flex-1">
            {product.name}
          </h3>

          {/* Stars */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${
                    star <= Math.round(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              {product.rating.toFixed(1)}{' '}
              <span className="text-gray-400">({product.reviews.toLocaleString()})</span>
            </span>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between mt-1 gap-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              added
                ? 'bg-emerald-500 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
