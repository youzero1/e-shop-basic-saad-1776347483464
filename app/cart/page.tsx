'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const discount = couponApplied ? totalPrice * 0.1 : 0;
  const shipping = totalPrice > 50 ? 0 : 9.99;
  const finalTotal = totalPrice - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'SAVE10') {
      setCouponApplied(true);
    }
  };

  const handleCheckout = () => {
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="bg-green-100 p-6 rounded-full">
          <ShoppingBag className="w-12 h-12 text-green-600" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">Order Placed!</h2>
        <p className="text-gray-500 text-center max-w-sm">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="bg-gray-100 p-6 rounded-full">
          <ShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500">Looks like you haven't added anything yet.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          Shop Now <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-4"
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex flex-col flex-1 gap-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-blue-600 font-medium">{item.product.category}</p>
                    <h3 className="font-semibold text-gray-800 text-sm leading-snug">{item.product.name}</h3>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="font-bold text-gray-900">${item.product.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-semibold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    = ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="self-start text-sm text-red-500 hover:underline font-medium mt-2"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

          {/* Coupon */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Coupon code"
                value={coupon}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoupon(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={couponApplied}
              />
            </div>
            <button
              onClick={applyCoupon}
              disabled={couponApplied}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Apply
            </button>
          </div>
          {couponApplied && (
            <p className="text-green-600 text-xs font-medium mb-3">🎉 Coupon SAVE10 applied! 10% off.</p>
          )}
          {!couponApplied && coupon && (
            <p className="text-gray-400 text-xs mb-3">Try code: SAVE10</p>
          )}

          {/* Totals */}
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount (10%)</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            Checkout <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            href="/products"
            className="mt-3 block text-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
