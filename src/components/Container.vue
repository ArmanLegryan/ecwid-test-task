<script setup>
defineProps({
  title: String,
})
</script>

<template>
  <v-container class="mb-5">
    <h2 class="mb-3">{{ title }}</h2>
    <v-row no-gutters>
      <slot name="default" />
    </v-row>
  </v-container>
</template>
