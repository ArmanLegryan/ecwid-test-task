import type { Product } from '@/types/products'

export interface CardItem {
  id: number
  count: number
}

export interface ProductWithCount extends Product {
  count: number
}
