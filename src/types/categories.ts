export interface Category {
  id: number
  name: string
  originalImage: {
    url: string
  }
}

export interface CategoriesResponse {
  items: Category[]
}
