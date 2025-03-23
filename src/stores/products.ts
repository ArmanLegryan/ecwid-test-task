import { type Ref, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'

import type { Product, ProductsResponse } from '@/types/products'

const PRODUCTS_URL = 'products'

export const useProductsStore = defineStore('products', () => {
  const loading = ref<boolean>(false)

  const products = ref<Product[]>([])
  const product = ref<Product>({})
  const productsByCategory = ref<Product[]>([])

  const getAllProducts = async (): Promise<void> => {
    loading.value = true

    try {
      const res = await api.get<ProductsResponse>(PRODUCTS_URL)
      products.value = res.data.items
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const getProductById = async (productId: string): Promise<void> => {
    loading.value = true

    try {
      const res = await api.get<Product>(
        `${PRODUCTS_URL}/${productId}`,
      )
      product.value = res.data
    } catch (error) {
      console.error('Error fetching product:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const fetchProductsByIds = async (
    productIds: string[],
    stateToUpdate: Ref<any>,
  ): Promise<void> => {
    const ids = productIds.join(',')

    loading.value = true

    try {
      const res = await api.get<ProductsResponse>(PRODUCTS_URL, {
        params: {
          productId: ids,
        },
      })
      stateToUpdate.value = res.data.items
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const getProductsByCategory = async (
    productIds: string[],
  ): Promise<void> => {
    await fetchProductsByIds(productIds, productsByCategory)
  }

  return {
    products,
    product,
    loading,
    productsByCategory,

    getAllProducts,
    getProductById,

    getProductsByCategory,
    fetchProductsByIds,
  }
})
