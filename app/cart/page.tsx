'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const { config } = useTheme();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center flex flex-col items-center gap-6">
        <span className="text-8xl">🛒</span>
        <h1 className={['text-3xl font-extrabold', config.text].join(' ')}>Your cart is empty</h1>
        <p className={['text-sm', config.textMuted].join(' ')}>
          Looks like you haven't added anything yet.
        </p>
        <Link
          href="/products"
          className={[
            'inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200',
            config.primary,
            config.primaryHover,
          ].join(' ')}
        >
          <ShoppingBag className="w-4 h-4" /> Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className={['text-3xl font-extrabold', config.text].join(' ')}>Your Cart</h1>
          <p className={['text-sm mt-1', config.textMuted].join(' ')}>{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={clearCart}
          className={['text-sm font-medium hover:underline transition-colors', config.textMuted].join(' ')}
        >
          Clear all
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map(item => (
            <div
              key={item.id}
              className={[
                'flex gap-4 p-4 rounded-2xl border transition-colors',
                config.surface,
                config.border,
              ].join(' ')}
            >
              <div className={['relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0', config.bg].join(' ')}>
                {item.image ? (
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">🛍️</div>
                )}
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className={['text-xs font-semibold uppercase tracking-wider', config.primaryText].join(' ')}>
                      {item.category}
                    </span>
                    <h3 className={['text-sm font-bold', config.text].join(' ')}>{item.name}</h3>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className={['flex items-center border rounded-xl overflow-hidden', config.border].join(' ')}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={['px-3 py-1.5 text-sm font-bold transition-colors', config.textMuted].join(' ')}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className={['px-3 py-1.5 text-sm font-bold border-x', config.text, config.border].join(' ')}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className={['px-3 py-1.5 text-sm font-bold transition-colors', config.textMuted].join(' ')}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className={['text-base font-extrabold', config.text].join(' ')}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className={['h-fit sticky top-24 rounded-2xl border p-6 flex flex-col gap-4', config.surface, config.border].join(' ')}>
          <h2 className={['text-lg font-extrabold', config.text].join(' ')}>Order Summary</h2>
          <div className={['flex flex-col gap-2 text-sm border-b pb-4', config.border].join(' ')}>
            <div className="flex justify-between">
              <span className={config.textMuted}>Subtotal ({totalItems} items)</span>
              <span className={['font-semibold', config.text].join(' ')}>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className={config.textMuted}>Shipping</span>
              <span className="font-semibold text-emerald-500">
                {totalPrice >= 50 ? 'Free' : '$4.99'}
              </span>
            </div>
          </div>
          <div className="flex justify-between text-lg">
            <span className={['font-bold', config.text].join(' ')}>Total</span>
            <span className={['font-black', config.text].join(' ')}>
              ${(totalPrice + (totalPrice >= 50 ? 0 : 4.99)).toFixed(2)}
            </span>
          </div>
          <button
            className={[
              'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200',
              config.primary,
              config.primaryHover,
            ].join(' ')}
          >
            Checkout <ArrowRight className="w-4 h-4" />
          </button>
          <Link
            href="/products"
            className={['flex items-center justify-center gap-2 text-sm font-medium hover:underline', config.textMuted].join(' ')}
          >
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
