'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { fetchProducts } from '@/lib/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProducts();
        if (!cancelled) {
          setProducts(data);
          if (data.length === 0) {
            setError('no_products');
          }
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : 'Unknown error';
          console.error('[useProducts]', msg);
          setError(msg);
          setProducts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  return { products, loading, error };
}
