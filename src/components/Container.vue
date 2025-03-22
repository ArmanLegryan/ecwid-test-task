<script setup>
defineProps({
  title: String,
})
</script>

<template>
  <v-container>
    <h2>{{ title }}</h2>
    <v-row no-gutters>
      <slot name="default" />
    </v-row>
  </v-container>
</template>
