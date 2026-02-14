<script setup>
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import BaseLayout from '@/layout/BaseLayout.vue'
import { useAuthStore } from '@/stores'

const route = useRoute()

onMounted(() => {
  useAuthStore().initFromStorage()
})

watch(
  () => route.name,
  (name) => {
    if (name === 'login' || name === 'register') {
      document.body.classList.add('theme-auth-page')
    } else {
      document.body.classList.remove('theme-auth-page')
    }
  },
  { immediate: true }
)
</script>

<template>
  <BaseLayout />
</template>

<style scoped>
</style>
