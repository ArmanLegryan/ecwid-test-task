import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'

import type { Category, CategoriesResponse } from '@/types/categories'
import { CATEGORIES_URL } from '@/helpers/constants'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const category = ref<Category>({})

  const loading = ref<boolean>(false)

  const getCategoryById = async (
    categoryId: string,
  ): Promise<void> => {
    loading.value = true

    try {
      const res = await api.get<CategoriesResponse>(
        `${CATEGORIES_URL}/${categoryId}`,
      )
      category.value = res.data
    } catch (error) {
      console.error('Error fetching category:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const getAllCategories = async (): Promise<void> => {
    loading.value = true

    try {
      const res = await api.get<CategoriesResponse>(CATEGORIES_URL)
      categories.value = res.data.items
    } catch (error) {
      console.error('Error fetching categories:', error)
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
