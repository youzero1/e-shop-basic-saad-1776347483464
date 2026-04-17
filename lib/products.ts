import { createClient } from '@supabase/supabase-js';
import { Product } from '@/types';

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function fetchProducts(): Promise<Product[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase.from('products').select('*');
  if (error || !data) return [];

  return data.map((row: any) => ({
    id: String(row.id),
    name: row.name,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    description: row.description,
    category: row.category,
    image: row.image,
    rating: Number(row.rating),
    reviews: Number(row.reviews),
    badge: row.badge ?? undefined,
  }));
}

export async function fetchProductById(id: number | string): Promise<Product | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;

  return {
    id: String(data.id),
    name: data.name,
    price: Number(data.price),
    originalPrice: data.original_price ? Number(data.original_price) : undefined,
    description: data.description,
    category: data.category,
    image: data.image,
    rating: Number(data.rating),
    reviews: Number(data.reviews),
    badge: data.badge ?? undefined,
  };
}
