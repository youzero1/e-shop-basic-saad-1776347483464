'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Heart, Shield, Users } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function AboutPage() {
  const { config } = useTheme();

  const values = [
    { icon: Heart, title: 'Customer First', desc: 'Everything we do is designed around making your shopping experience delightful.' },
    { icon: Shield, title: 'Quality Guaranteed', desc: 'Every product is curated and quality-checked before it reaches your door.' },
    { icon: Zap, title: 'Fast & Reliable', desc: 'Lightning-fast delivery and a support team that actually responds.' },
    { icon: Users, title: 'Community Driven', desc: 'Built by shoppers, for shoppers. Your feedback shapes what we carry.' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section
        className={[
          'bg-gradient-to-br py-24 px-4 text-center',
          config.heroBg,
        ].join(' ')}
      >
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl font-black text-white mb-4">About ShopZap</h1>
          <p className={['text-lg', config.heroSub].join(' ')}>
            We're on a mission to make premium products accessible to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <p className={['text-xs font-bold uppercase tracking-widest mb-2', config.primaryText].join(' ')}>What We Stand For</p>
          <h2 className={['text-3xl font-extrabold', config.text].join(' ')}>Our Values</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className={[
                'flex flex-col items-center text-center gap-4 p-6 rounded-2xl border transition-all hover:shadow-lg',
                config.surface,
                config.border,
              ].join(' ')}
            >
              <span className={['w-12 h-12 rounded-2xl flex items-center justify-center text-white', config.primary].join(' ')}>
                <Icon className="w-6 h-6" />
              </span>
              <h3 className={['text-base font-bold', config.text].join(' ')}>{title}</h3>
              <p className={['text-sm leading-relaxed', config.textMuted].join(' ')}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className={[
          'mx-4 mb-16 rounded-3xl bg-gradient-to-r py-16 px-8 text-center text-white',
          config.ctaBg,
        ].join(' ')}
      >
        <h2 className="text-3xl font-black mb-3">Ready to explore?</h2>
        <p className="text-white/80 mb-6 max-w-md mx-auto">Browse our curated collection of premium products.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
        >
          Shop Now <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}
