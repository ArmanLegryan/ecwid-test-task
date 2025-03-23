import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { CardItem } from '@/types/card'
import type { Product } from '@/types/products'
import { useProductsStore } from '@/stores/products'

export const useCardStore = defineStore('card', () => {
  const cardProductsIdsAndCounts = ref<CardItem[]>([])
  const allProductsFromCard = ref<Product[]>([])

  const orderPlaced = ref(false)

  const cardItemsCount = computed<number>(() =>
    cardProductsIdsAndCounts.value?.reduce(
      (acc, it) => acc + it.count,
      0,
    ),
  )

  const productsWithCount = computed(() => {
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
    const storedCard = localStorage.getItem('card')
    if (storedCard) {
      cardProductsIdsAndCounts.value = JSON.parse(storedCard)
    }
  }

  const saveCard = () => {
    localStorage.setItem(
      'card',
      JSON.stringify(cardProductsIdsAndCounts.value),
    )
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
    const productsStore = useProductsStore()

    const productIds = cardProductsIdsAndCounts.value.map(
      (it) => it.id,
    )
    await productsStore.fetchProductsByIds(
      productIds,
      allProductsFromCard,
    )
  }

  const placeOrder = () => {
    orderPlaced.value = true
    cardProductsIdsAndCounts.value = []

    saveCard()

    setTimeout(() => (orderPlaced.value = false), 5000)
  }

  return {
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
