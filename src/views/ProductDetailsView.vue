<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'

import ProductDetails from '@/components/ProductDetails.vue'

const productsStore = useProductsStore()
const { product, loading } = storeToRefs(productsStore)

const route = useRoute()

const productId = computed<string>(() => route.params.productId)

onMounted(async () => {
  await productsStore.getProductById(productId.value)
})
</script>

<template>
  <product-details :loading="loading" :product="product" />
</template>
