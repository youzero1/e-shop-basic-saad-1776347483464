import { Product } from '@/types';

export const CATEGORIES = [
  'All',
  'Electronics',
  'Footwear',
  'Bags',
  'Accessories',
];

export const fallbackProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 79.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    rating: 4.5,
    reviews: 2341,
    badge: 'Sale',
    description:
      'Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions for all-day wear.',
  },
  {
    id: 2,
    name: 'Smart Watch Series X',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Electronics',
    rating: 4.7,
    reviews: 1892,
    badge: 'New',
    description:
      'Stay connected and track your fitness goals with the Smart Watch Series X. Features heart rate monitoring, GPS, sleep tracking, and a stunning always-on display.',
  },
  {
    id: 3,
    name: 'Running Shoes Pro',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    category: 'Footwear',
    rating: 4.6,
    reviews: 3210,
    badge: 'Sale',
    description:
      'Engineered for performance, these running shoes feature responsive cushioning, breathable mesh upper, and durable outsole for maximum comfort on any terrain.',
  },
  {
    id: 4,
    name: 'Leather Crossbody Bag',
    price: 59.99,
    originalPrice: undefined,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop',
    category: 'Bags',
    rating: 4.4,
    reviews: 876,
    badge: undefined,
    description:
      'Crafted from genuine leather, this stylish crossbody bag features multiple compartments, adjustable strap, and timeless design that complements any outfit.',
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    price: 49.99,
    originalPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    category: 'Electronics',
    rating: 4.3,
    reviews: 1567,
    badge: 'Sale',
    description:
      'Fill any room with rich, immersive sound. This portable Bluetooth speaker delivers 360-degree audio, IPX7 waterproof rating, and 24-hour playtime.',
  },
  {
    id: 6,
    name: 'Sunglasses UV400',
    price: 34.99,
    originalPrice: undefined,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    category: 'Accessories',
    rating: 4.2,
    reviews: 654,
    badge: 'New',
    description:
      'Protect your eyes in style with these UV400 sunglasses. Lightweight frame, polarized lenses, and classic design make these perfect for any outdoor activity.',
  },
  {
    id: 7,
    name: 'Laptop Backpack',
    price: 44.99,
    originalPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Bags',
    rating: 4.5,
    reviews: 2103,
    badge: 'Sale',
    description:
      'Carry your essentials in comfort with this spacious laptop backpack. Features padded laptop compartment, USB charging port, and ergonomic shoulder straps.',
  },
  {
    id: 8,
    name: 'Fitness Tracker Band',
    price: 29.99,
    originalPrice: 44.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=500&fit=crop',
    category: 'Electronics',
    rating: 4.1,
    reviews: 987,
    badge: 'Sale',
    description:
      'Monitor your health 24/7 with this sleek fitness tracker. Tracks steps, calories, sleep quality, and heart rate with a vibrant color display.',
  },
];
