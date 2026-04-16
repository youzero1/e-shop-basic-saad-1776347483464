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

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProductById(id);
        if (!cancelled) {
          setProduct(data);
          if (!data) setError('Product not found.');
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : 'Could not load product.';
          console.error('[useProduct]', msg);
          setError(msg);
          setProduct(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [id]);

  return { product, loading, error };
}
