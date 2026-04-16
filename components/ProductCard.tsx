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

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full ${
                product.badge === 'Sale'
                  ? 'bg-red-500 text-white'
                  : product.badge === 'New'
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="absolute top-3 right-10 text-xs font-bold bg-orange-500 text-white px-2 py-1 rounded-full">
              -{discount}%
            </span>
          )}
          {/* Wishlist Button */}
          <button
            onClick={handleWish}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wished ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1 gap-2">
          <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">{product.category}</p>
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= Math.round(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-200 fill-gray-200'
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({product.reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-auto pt-1">
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
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
