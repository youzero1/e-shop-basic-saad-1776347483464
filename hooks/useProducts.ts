'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseAnonKey) {
          setError('Missing Supabase environment variables.');
          setProducts([]);
          return;
        }

        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        const { data, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true });

        if (fetchError) throw fetchError;

        if (data && data.length > 0) {
          const mapped: Product[] = data.map((item: any) => ({
            id: Number(item.id),
            name: item.name,
            price: Number(item.price),
            originalPrice: item.original_price ? Number(item.original_price) : undefined,
            image: item.image,
            category: item.category,
            rating: Number(item.rating),
            reviews: Number(item.reviews),
            badge: item.badge ?? undefined,
            description: item.description,
          }));
          setProducts(mapped);
        } else {
          setProducts([]);
          setError('No products found in the database. Please add products via the Supabase dashboard.');
        }
      } catch (err: any) {
        console.error('Failed to fetch products from Supabase:', err);
        setError(
          err?.message
            ? `Database error: ${err.message}`
            : 'Could not connect to the database. Check your Supabase environment variables.'
        );
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}
