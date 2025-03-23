<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { useCategoriesStore } from '@/stores/categories'
import { useCardStore } from '@/stores/card'

import Container from '@/components/Container.vue'
import ProductCard from '@/components/ProductCard.vue'
import AppSkeletonLoader from '@/components/AppSkeletonLoader.vue'

const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()
const cardStore = useCardStore()

const { products, loading: productsLoader } =
  storeToRefs(productsStore)
const { categories, loading: categoriesLoader } =
  storeToRefs(categoriesStore)

onMounted(async () => {
  await productsStore.getAllProducts()
  await categoriesStore.getAllCategories()
})
</script>

<template>
  <div class="main">
    <container title="Categories">
      <template #default>
        <v-col
          v-for="category in categories"
          :key="category.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <app-skeleton-loader v-if="categoriesLoader" />
          <router-link
            v-else
            :to="{
              name: 'Categories',
              params: { categoryId: category.id },
            }"
          >
            {{ category.name }}
          </router-link>
        </v-col>
      </template>
    </container>

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
          <app-skeleton-loader v-if="productsLoader" />
          <product-card v-else :product="product">
            <template #actions>
              <v-spacer />
              <v-btn
                variant="tonal"
                color="orange"
                @click.prevent="cardStore.addByOne(product.id)"
              >
                <v-icon
                  color="orange"
                  icon="mdi-cart-outline"
                  class="me-2"
                />
                Buy
              </v-btn>
            </template>
          </product-card>
        </v-col>
      </template>
    </container>
  </div>
</template>
