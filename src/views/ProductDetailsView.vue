<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'

import ProductDetails from '@/components/ProductDetails.vue'

const productsStore = useProductsStore()
const { product } = storeToRefs(productsStore)

const route = useRoute()

const productId = computed<string>(() => route.params.productId)

onMounted(async () => {
  await productsStore.getProductById(productId.value)
})
</script>

<template>
  <div>
    <product-details :product="product" />
    <v-btn
      to="/"
      class="position-absolute right-0 bottom-0 ma-4"
      outlined
      color="primary"
    >
      <v-icon left icon="mdi-arrow-left" class="me-2" /> Back to
      Products
    </v-btn>
  </div>
</template>
