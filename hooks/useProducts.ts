'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { fetchProducts } from '@/lib/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        if (data.length === 0) {
          setError('No products found. Please add products to your Supabase products table.');
        }
        setProducts(data);
      } catch (err: any) {
        console.error('Failed to fetch products:', err);
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

    load();
  }, []);

  return { products, loading, error };
}
