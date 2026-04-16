'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, ArrowLeft, Heart, Truck, RefreshCw, ShieldCheck, Database } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import { useProduct } from '@/hooks/useProduct';
import { useProducts } from '@/hooks/useProducts';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const productId = Number(params.id);
  const { product, loading, error } = useProduct(productId);
  const { products } = useProducts();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-3xl" />
          <div className="flex flex-col gap-4">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-10 bg-gray-200 rounded w-1/2" />
            <div className="h-24 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="bg-gray-100 p-4 rounded-full">
          <Database className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-2xl font-bold text-gray-800">Product not found</p>
        {error && <p className="text-gray-500 text-sm">{error}</p>}
        <Link href="/products" className="text-blue-600 hover:underline font-semibold">Back to Products</Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-8 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden shadow-sm">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {product.badge && (
            <span
              className={`absolute top-4 left-4 text-sm font-bold px-3 py-1.5 rounded-full ${
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
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">{product.category}</p>
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-200 fill-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-gray-800">{product.rating}</span>
            <span className="text-gray-400 text-sm">({product.reviews.toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
            {discount && (
              <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded-full">
                {discount}% off
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg"
              >
                −
              </button>
              <span className="px-4 py-2 text-gray-800 font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-base transition-all duration-200 ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button
              onClick={() => setWished(!wished)}
              className="p-3.5 border border-gray-200 rounded-2xl hover:border-red-300 hover:bg-red-50 transition-all"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  wished ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`}
              />
            </button>
          </div>

          <Link
            href="/cart"
            className="text-center text-blue-600 font-semibold text-sm hover:underline"
          >
            View Cart
          </Link>

          {/* Trust */}
          <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
            {[
              { icon: <Truck className="w-5 h-5 text-blue-600" />, label: 'Free Shipping', sub: 'Orders over $50' },
              { icon: <RefreshCw className="w-5 h-5 text-blue-600" />, label: '30-Day Returns', sub: 'No questions asked' },
              { icon: <ShieldCheck className="w-5 h-5 text-blue-600" />, label: 'Secure Payment', sub: 'SSL encrypted' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-1">
                <div className="bg-blue-50 p-2 rounded-full">{item.icon}</div>
                <p className="text-xs font-semibold text-gray-700">{item.label}</p>
                <p className="text-xs text-gray-400">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
