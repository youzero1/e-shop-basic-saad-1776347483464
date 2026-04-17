'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import { Product } from '@/types';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { config } = useTheme();
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  const cardClasses = [
    'rounded-2xl overflow-hidden flex flex-col h-full border',
    'shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300',
    config.surface,
    config.border,
  ].join(' ');

  const addBtnClasses = [
    'w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-white',
    added ? 'bg-emerald-500' : [config.primary, config.primaryHover].join(' '),
  ].join(' ');

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <div className={cardClasses}>
        {/* Image */}
        <div className={['relative aspect-square overflow-hidden', config.bg].join(' ')}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">
              🛍️
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span
                className={[
                  'text-xs font-bold px-2.5 py-1 rounded-full shadow-sm text-white',
                  product.badge === 'Sale'
                    ? 'bg-red-500'
                    : product.badge === 'New'
                    ? 'bg-emerald-500'
                    : 'bg-violet-500',
                ].join(' ')}
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
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Heart
              className={[
                'w-4 h-4 transition-colors',
                wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400',
              ].join(' ')}
            />
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          <span className={['text-xs font-semibold uppercase tracking-wider', config.primaryText].join(' ')}>
            {product.category}
          </span>
          <h3 className={['text-sm font-semibold line-clamp-2 leading-snug flex-1', config.text].join(' ')}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(s => (
                <Star
                  key={s}
                  className={[
                    'w-3.5 h-3.5',
                    s <= Math.round(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-gray-200 text-gray-200',
                  ].join(' ')}
                />
              ))}
            </div>
            <span className={['text-xs', config.textMuted].join(' ')}>
              {product.rating.toFixed(1)}
              <span className="ml-1 opacity-60">({product.reviews.toLocaleString()})</span>
            </span>
          </div>

          {/* Price */}
          <div className={['flex items-center justify-between mt-auto pt-2 border-t', config.border].join(' ')}>
            <div className="flex items-baseline gap-1.5">
              <span className={['text-xl font-extrabold', config.text].join(' ')}>
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className={['text-xs line-through', config.textMuted].join(' ')}>
                  ${product.originalPrice.toFixed(2)}
                </span>
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
            className={addBtnClasses}
          >
            <ShoppingCart className="w-4 h-4" />
            {added ? 'Added to Cart!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
