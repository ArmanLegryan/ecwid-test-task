import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'
import { LocalStorageAPI } from '@/helpers/localStorageAPI'

import type { CardItem, ProductWithCount } from '@/types/card'
import type { Product, ProductsResponse } from '@/types/products'
import { PRODUCTS_URL } from '@/helpers/constants'

export const useCardStore = defineStore('card', () => {
  const loading = ref<boolean>(false)
  const cardProductsIdsAndCounts = ref<CardItem[]>([])
  const allProductsFromCard = ref<Product[]>([])

  const orderPlaced = ref(false)

  const cardItemsCount = computed<number>(() =>
    cardProductsIdsAndCounts.value?.reduce(
      (acc, it) => acc + it.count,
      0,
    ),
  )

  const productsWithCount = computed<ProductWithCount[]>(() => {
    return allProductsFromCard.value
      .map((product) => {
        const cardItem = cardProductsIdsAndCounts.value.find(
          (item) => item.id === product.id,
        )

        return {
          ...product,
          count: cardItem ? cardItem.count : 0,
        }
      })
      .filter((product) => product.count)
  })

  const loadCard = () => {
    const storedCard = LocalStorageAPI.getItem<CardItem[]>('card')
    if (storedCard) {
      cardProductsIdsAndCounts.value = storedCard
    }
  }

  const saveCard = () => {
    LocalStorageAPI.setItem('card', cardProductsIdsAndCounts.value)
  }

  const addByOne = (productId: number) => {
    const existingItem = cardProductsIdsAndCounts.value.find(
      (it) => it.id === productId,
    )

    existingItem
      ? (existingItem.count += 1)
      : cardProductsIdsAndCounts.value.push({
          id: productId,
          count: 1,
        })

    saveCard()
  }

  const deleteByOne = (productId: number) => {
    cardProductsIdsAndCounts.value = cardProductsIdsAndCounts.value
      .map((item) =>
        item.id === productId
          ? { ...item, count: item.count - 1 }
          : item,
      )
      .filter((item) => item.count > 0)

    saveCard()
  }

  const deleteFromCard = (productId: number) => {
    cardProductsIdsAndCounts.value =
      cardProductsIdsAndCounts.value.filter(
        (item) => item.id !== productId,
      )

    saveCard()
  }

  const getAllProductsFromCard = async (): Promise<void> => {
    const productIds = cardProductsIdsAndCounts.value.map(
      (it) => it.id,
    )

    loading.value = true

    try {
      const res = await api.get<ProductsResponse>(PRODUCTS_URL, {
        params: {
          productId: productIds,
        },
      })
      allProductsFromCard.value = res.data.items
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const placeOrder = () => {
    orderPlaced.value = true
    cardProductsIdsAndCounts.value = []

    saveCard()

    setTimeout(() => (orderPlaced.value = false), 5000)
  }

  return {
    loading,
    cardProductsIdsAndCounts,
    cardItemsCount,
    allProductsFromCard,
    productsWithCount,
    orderPlaced,

    addByOne,
    deleteByOne,
    deleteFromCard,

    placeOrder,

    loadCard,
    getAllProductsFromCard,
  }
})
