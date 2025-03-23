<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useCardStore } from '@/stores/card'

import AppNavBar from '@/components/AppNavBar.vue'

const cardStore = useCardStore()

onMounted(async () => {
  cardStore.loadCard()
})
</script>

<template>
  <v-app>
    <app-nav-bar />
    <div class="mt-15 pt-5">
      <RouterView />
    </div>
  </v-app>
</template>
