<script setup>
import { onMounted } from 'vue'
import BaseLayout from '@/layout/BaseLayout.vue'
import { useAuthStore } from '@/stores'

onMounted(() => {
  useAuthStore().initFromStorage()
})
</script>

<template>
  <BaseLayout />
</template>

<style scoped>
</style>
