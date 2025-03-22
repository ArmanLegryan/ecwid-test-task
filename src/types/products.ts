export interface Product {
  id: number
  name: string
  price: number
  originalImageUrl: string
  description?: string
}

export interface ProductsResponse {
  items: Product[]
}
