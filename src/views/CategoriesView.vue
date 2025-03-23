<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useCategoriesStore } from '@/stores/categories'
import { useProductsStore } from '@/stores/products'
import { useCardStore } from '@/stores/card'

import ProductCard from '@/components/ProductCard.vue'
import AppSkeletonLoader from '@/components/AppSkeletonLoader.vue'

const route = useRoute()

const categoriesStore = useCategoriesStore()
const { category, loading: categoryLoader } =
  storeToRefs(categoriesStore)

const productsStore = useProductsStore()
const { productsByCategory, loading: productsLoader } =
  storeToRefs(productsStore)

const cardStore = useCardStore()

const categoryId = computed(() => route.params.categoryId)

onMounted(async () => {
  await categoriesStore.getCategoryById(categoryId.value)
  await productsStore.getProductsByCategory(category.value.productIds)
})
</script>

<template>
  <v-container>
    <p class="text-h5 mb-4 font-weight-bold">Category details</p>

    <app-skeleton-loader v-if="categoryLoader" />
    <div v-else class="mb-9">
      <p>{{ category.name }}</p>
    </div>

    <p class="text-h5 mb-4 font-weight-bold">
      Products by {{ category.name || '-' }}
    </p>

    <v-row>
      <v-col
        v-for="product in productsByCategory"
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
    </v-row>
  </v-container>
</template>
