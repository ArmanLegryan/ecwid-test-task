import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'

import type { Category, CategoriesResponse } from '@/types/categories'

const CATEGORIES_URL = 'categories'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const category = ref<Category>({})

  const loading = ref<boolean>(false)
  const errorMessage = ref<string | null>(null)

  const getCategoryById = async (
    categoryId: string,
  ): Promise<void> => {
    // TODO --> use loader component
    loading.value = true
    // TODO --> use alert for error message
    errorMessage.value = null

    try {
      const res = await api.get<CategoriesResponse>(
        `${CATEGORIES_URL}/${categoryId}`,
      )
      category.value = res.data
    } catch (error) {
      console.error('Error fetching category:', error)
      errorMessage.value =
        'Failed to fetch category. Please try again later.'
      throw error
    } finally {
      loading.value = false
    }
  }

  const getAllCategories = async (): Promise<void> => {
    // TODO --> use loader component
    loading.value = true
    // TODO --> use alert for error message
    errorMessage.value = null

    try {
      const res = await api.get<CategoriesResponse>(CATEGORIES_URL)
      categories.value = res.data.items
    } catch (error) {
      console.error('Error fetching categories:', error)
      errorMessage.value =
        'Failed to fetch categories. Please try again later.'
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    category,

    getCategoryById,
    getAllCategories,
  }
})
