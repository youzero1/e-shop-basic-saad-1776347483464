import { useState, useEffect } from 'react'
import { Product } from '@/types'
import { fallbackProducts } from '@/lib/products'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase env vars not set, using fallback products.')
        setLoading(false)
        return
      }

      try {
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(supabaseUrl, supabaseAnonKey)
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: true })

        if (error) throw error

        if (data && data.length > 0) {
          const mapped: Product[] = data.map((p: any) => ({
            id: Number(p.id),
            name: p.name,
            price: Number(p.price),
            originalPrice: p.original_price ? Number(p.original_price) : undefined,
            image: p.image,
            category: p.category,
            rating: Number(p.rating),
            reviews: Number(p.reviews),
            badge: p.badge ?? undefined,
            description: p.description,
          }))
          setProducts(mapped)
        }
      } catch (err) {
        console.error('Failed to fetch products from Supabase:', err)
        setError('Could not load products from database. Showing default catalogue.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return { products, loading, error }
}
