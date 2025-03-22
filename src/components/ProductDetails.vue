<script setup lang="ts">
import type { Product } from '@/types/products.ts'

defineProps<{ product: Product }>()
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="4"
        class="d-flex justify-center align-center"
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
        <v-card class="pa-6">
          <v-card-title class="text-h4 font-weight-bold">
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

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="deep-purple"
              variant="tonal"
              class="text-h7 font-weight-bold"
              @click="addToCart"
            >
              <v-icon icon="mdi-cart-outline " class="me-2" />
              Add to Cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
