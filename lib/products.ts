import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

// Map DB row (snake_case) → app type (camelCase)
function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as number,
    name: row.name as string,
    price: Number(row.price),
    originalPrice: row.original_price != null ? Number(row.original_price) : undefined,
    description: row.description as string,
    category: row.category as string,
    image: row.image as string,
    rating: Number(row.rating),
    reviews: row.reviews as number,
    badge: (row.badge as string | null) ?? undefined,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, price, original_price, description, category, image, rating, reviews, badge')
    .order('id', { ascending: true });

  if (error) {
    console.error('[fetchProducts] Supabase error:', error);
    throw new Error(error.message);
  }

  return (data ?? []).map(mapProduct);
}

export async function fetchProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('id, name, price, original_price, description, category, image, rating, reviews, badge')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error('[fetchProductById] Supabase error:', error);
    throw new Error(error.message);
  }

  return data ? mapProduct(data as Record<string, unknown>) : null;
}
