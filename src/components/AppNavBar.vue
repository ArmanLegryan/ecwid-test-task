<script setup lang="ts">
import { useCardStore } from '@/stores/card'
import { storeToRefs } from 'pinia'

const cardStore = useCardStore()
const { cardItemsCount } = storeToRefs(cardStore)
</script>

<template>
  <v-app-bar :elevation="5">
    <v-app-bar-title>
      <router-link to="/" class="font-weight-bold">Ecwid</router-link>
    </v-app-bar-title>

    <template v-slot:append>
      <router-link :to="{ name: 'Card' }" class="me-4">
        <v-badge
          v-if="cardItemsCount"
          :content="cardItemsCount"
          stacked
        >
          <v-icon icon="mdi-cart" size="large"></v-icon>
        </v-badge>
        <v-icon v-else icon="mdi-cart" size="large"></v-icon>
      </router-link>
    </template>
  </v-app-bar>
</template>
