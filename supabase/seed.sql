-- Seed products table
insert into products (name, price, original_price, description, category, image, rating, reviews, badge)
values
  ('Premium Wireless Headphones', 79.99, 129.99, 'Immersive sound quality with active noise cancellation and 30-hour battery life. Perfect for work and travel.', 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', 4.8, 2341, 'Sale'),
  ('Minimalist Leather Watch', 149.99, null, 'Handcrafted genuine leather strap with a clean dial. Water-resistant to 50m. Timeless style meets modern precision.', 'Accessories', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', 4.7, 987, 'New'),
  ('Running Shoes Pro', 89.99, 119.99, 'Lightweight, breathable mesh upper with responsive cushioning. Designed for daily training and race day performance.', 'Footwear', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', 4.6, 3412, 'Sale'),
  ('Portable Bluetooth Speaker', 49.99, 69.99, '360° surround sound with IPX7 waterproof rating. 24-hour playtime and built-in speakerphone.', 'Electronics', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80', 4.5, 1876, null),
  ('Cotton Comfort Hoodie', 39.99, null, 'Ultra-soft 100% organic cotton blend. Relaxed fit with a kangaroo pocket and adjustable drawstring hood.', 'Clothing', 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80', 4.4, 654, 'New'),
  ('Smart Water Bottle', 29.99, 44.99, 'Tracks your hydration with LED reminders. Double-wall vacuum insulation keeps drinks cold 24h / hot 12h.', 'Lifestyle', 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80', 4.6, 1123, 'Sale'),
  ('Laptop Backpack', 59.99, null, 'Fits up to 15.6" laptops. Anti-theft hidden pocket, USB charging port, and ergonomic shoulder straps.', 'Accessories', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80', 4.7, 2209, null),
  ('Mechanical Keyboard', 119.99, 159.99, 'Tactile clicky switches with RGB backlighting. Compact TKL layout, PBT keycaps, and USB-C connection.', 'Electronics', 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80', 4.9, 445, 'Hot');
