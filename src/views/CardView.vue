<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCardStore } from '@/stores/card'

import Container from '@/components/Container.vue'
import ProductCard from '@/components/ProductCard.vue'
import AppSkeletonLoader from '@/components/AppSkeletonLoader.vue'

const cardStore = useCardStore()
const { loading, productsWithCount, orderPlaced, cardItemsCount } =
  storeToRefs(cardStore)

onMounted(async () => {
  await cardStore.getAllProductsFromCard()
})
</script>

<template>
  <container v-if="!cardItemsCount">
    <p class="text-h5">Your card is empty</p>
  </container>
  <container v-else title="Card">
    <template #default>
      <v-col
        v-for="product in productsWithCount"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <app-skeleton-loader v-if="loading" />
        <product-card v-else :product="product">
          <template #actions>
            <v-btn
              icon="mdi-minus"
              size="small"
              variant="tonal"
              :disabled="product.count === 1"
              @click.prevent="cardStore.deleteByOne(product.id)"
            />
            <p>{{ product.count }}</p>
            <v-btn
              icon="mdi-plus"
              size="small"
              variant="tonal"
              @click.prevent="cardStore.addByOne(product.id)"
            />
            <v-spacer />
            <v-btn
              variant="plain"
              class="bg-red-accent-3"
              @click.prevent="cardStore.deleteFromCard(product.id)"
            >
              Delete
            </v-btn>
          </template>
        </product-card>
      </v-col>
    </template>
  </container>

  <v-btn
    v-if="cardItemsCount"
    class="position-fixed right-0 bottom-0 ma-5 bg-green-darken-2 text-white"
    variant="tonal"
    @click="cardStore.placeOrder()"
  >
    Place Order
  </v-btn>

  <v-alert
    v-if="orderPlaced"
    class="position-fixed right-0 bottom-0 ma-10"
    max-width="400px"
    text="Congratulations on your purchase!"
    type="success"
  ></v-alert>
</template>
