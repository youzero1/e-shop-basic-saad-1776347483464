'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingCart, ArrowLeft, Heart, Truck, RefreshCw, ShieldCheck } from 'lucide-react';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-3xl" />
          <div className="flex flex-col gap-4 pt-4">
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-10 bg-gray-200 rounded w-1/2" />
            <div className="h-20 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
          <ShoppingCart className="w-8 h-8 text-gray-300" />
        </div>
        <p className="text-xl font-bold text-gray-800">Product not found</p>
        {error && <p className="text-gray-400 text-sm text-center max-w-xs">{error}</p>}
        <Link
          href="/products"
          className="mt-2 inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
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
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ── Image Panel ── */}
          <div className="relative">
            <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
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
                  className={`absolute top-4 left-4 text-sm font-bold px-3 py-1.5 rounded-full shadow ${
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
                <span className="absolute top-4 right-4 bg-amber-400 text-amber-900 text-sm font-bold px-3 py-1.5 rounded-full shadow">
                  -{discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* ── Details Panel ── */}
          <div className="flex flex-col gap-5">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                {product.category}
              </span>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-1 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-gray-900">{product.rating.toFixed(1)}</span>
              <span className="text-gray-400 text-sm">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {discount && (
                <span className="bg-rose-100 text-rose-600 text-sm font-bold px-2.5 py-1 rounded-full">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700">Quantity</span>
              <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors font-bold text-lg"
                >
                  −
                </button>
                <span className="w-10 text-center text-gray-900 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-base transition-all duration-200 ${
                  added
                    ? 'bg-emerald-500 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                onClick={() => setWished(!wished)}
                aria-label="Wishlist"
                className={`p-3.5 rounded-2xl border-2 transition-all ${
                  wished
                    ? 'border-rose-300 bg-rose-50'
                    : 'border-gray-200 hover:border-rose-300 hover:bg-rose-50'
                }`}
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    wished ? 'fill-rose-500 text-rose-500' : 'text-gray-400'
                  }`}
                />
              </button>
            </div>

            <Link
              href="/cart"
              className="text-center text-indigo-600 font-semibold text-sm hover:underline"
            >
              View Cart →
            </Link>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-5">
              {[
                { icon: <Truck className="w-5 h-5 text-indigo-600" />, label: 'Free Shipping', sub: 'Orders over $50' },
                { icon: <RefreshCw className="w-5 h-5 text-indigo-600" />, label: '30-Day Returns', sub: 'No questions asked' },
                { icon: <ShieldCheck className="w-5 h-5 text-indigo-600" />, label: 'Secure Payment', sub: 'SSL encrypted' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1.5">
                  <div className="bg-indigo-50 p-2.5 rounded-xl">{item.icon}</div>
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
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
