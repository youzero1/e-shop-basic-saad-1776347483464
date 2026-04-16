import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Target, Users, Award, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">About ShopZap</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            We&apos;re on a mission to make premium products accessible to everyone, with unbeatable prices and a world-class shopping experience.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              ShopZap was founded in 2020 with a simple idea: make online shopping feel effortless and enjoyable.
              We started with a small catalog of electronics and have since grown into a full-featured marketplace.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Today, we serve over 500,000 happy customers worldwide, offering thousands of carefully curated
              products across multiple categories — all backed by our satisfaction guarantee.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Browse Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
              alt="Our team"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500K+', label: 'Happy Customers' },
              { value: '10K+', label: 'Products Listed' },
              { value: '50+', label: 'Countries Served' },
              { value: '4.8★', label: 'Average Rating' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl font-extrabold text-yellow-300">{stat.value}</p>
                <p className="text-blue-100 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Target className="w-7 h-7 text-blue-600" />, title: 'Quality First', desc: 'Every product is vetted for quality before it appears on our platform.' },
            { icon: <Users className="w-7 h-7 text-blue-600" />, title: 'Customer Focus', desc: 'Our customers are at the heart of every decision we make.' },
            { icon: <Award className="w-7 h-7 text-blue-600" />, title: 'Excellence', desc: 'We strive for excellence in service, product selection, and experience.' },
            { icon: <Globe className="w-7 h-7 text-blue-600" />, title: 'Global Reach', desc: 'Delivering to customers in over 50 countries with fast, reliable shipping.' },
          ].map((val, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-3">
              <div className="bg-blue-50 p-3 rounded-xl w-fit">{val.icon}</div>
              <h3 className="font-bold text-gray-800">{val.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
