<script setup lang="ts">
import type { Product } from '@/types/products'
import { useCardStore } from '@/stores/card'

const cardStore = useCardStore()

defineProps<{ product: Product; loading: boolean }>()
</script>

<template>
  <v-container>
    <div v-if="loading" class="d-flex flex-column align-center">
      <v-progress-circular
        :size="100"
        :width="10"
        color="deep-purple"
        indeterminate
      />
    </div>

    <div v-else>
      <p class="text-h4 mb-4 font-weight-bold">Product details</p>

      <v-row>
        <v-col
          cols="12"
          md="4"
          class="d-flex justify-center align-center h-100"
        >
          <v-img
            :src="product.originalImageUrl"
            alt="Product Image"
            max-width="400"
            cover
            class="rounded-lg"
          />
        </v-col>

        <v-col cols="12" md="8">
          <v-card class="pa-6 h-100">
            <v-card-title class="text-h5 font-weight-bold">
              {{ product.name }}
            </v-card-title>

            <v-card-subtitle
              class="mb-4 text-body-1"
              v-html="product.description"
            />

            <v-card-subtitle
              class="text-h6 font-weight-bold text-primary mb-4"
            >
              Price - ${{ product.price }}
            </v-card-subtitle>

            <v-card-actions
              class="position-absolute bottom-0 right-0 ma-4"
            >
              <v-spacer />
              <v-btn
                color="deep-purple"
                variant="tonal"
                class="text-h7 font-weight-bold"
                @click="cardStore.addByOne(product.id)"
              >
                <v-icon icon="mdi-cart-outline " class="me-2" />
                Add to Cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
