'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { fetchProductById } from '@/lib/products';

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || isNaN(id)) {
      setLoading(false);
      setError('Invalid product ID.');
      return;
    }

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(id);
        if (!data) {
          setError('Product not found.');
        }
        setProduct(data);
      } catch (err: any) {
        console.error('Failed to fetch product:', err);
        setError(err?.message ?? 'Could not load product.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return { product, loading, error };
}
