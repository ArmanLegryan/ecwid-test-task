<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Product } from '@/types/products'

defineProps<{ product: Product }>()
</script>

<template>
  <router-link
    :to="{
      name: 'ProductDetails',
      params: { productId: product.id },
    }"
    class="text-decoration-none"
  >
    <v-card class="ma-2" max-width="400" link>
      <v-img
        class="align-end text-white"
        height="400"
        :src="product.originalImageUrl"
        cover
      />
      <v-card-title class="text-grey-darken-2">
        {{ product.name }}
        <v-tooltip activator="parent" location="top">
          {{ product.name }}
        </v-tooltip>
      </v-card-title>

      <v-card-subtitle class="pt-4">
        Price - ${{ product.price }}
      </v-card-subtitle>

      <v-card-actions class="mt-4">
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </router-link>
</template>
