<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'

import Container from '@/components/Container.vue'
import ProductCard from '@/components/ProductCard.vue'

const productsStore = useProductsStore()
const { products } = storeToRefs(productsStore)

onMounted(async () => {
  await productsStore.getAllProducts()
  console.log(products.value)
})
</script>

<template>
  <container title="Products">
    <template #default>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <product-card :product="product" />
      </v-col>
    </template>
  </container>
</template>
