<template>
  <div class="container py-4">
    <h1 class="mb-4">Поиск объявлений</h1>
    <p v-if="!listingsStore.loading && !listingsStore.error" class="text-muted mb-4">
      Главная страница RentEasy - здесь будет поиск недвижимости.
    </p>

    <div v-if="listingsStore.loading" class="text-muted">Загрузка объявлений...</div>
    <div v-else-if="listingsStore.error" class="alert alert-danger">
      {{ listingsStore.error }}
    </div>
    <ul v-else-if="listingsStore.hasListings" class="list-group list-group-flush">
      <li
        v-for="item in listingsStore.listings"
        :key="item.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>{{ item.title }}</span>
        <span class="badge bg-primary rounded-pill">{{ item.price }} ₽</span>
      </li>
    </ul>
    <p v-else class="text-muted">Объявлений пока нет.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useListingsStore } from '@/stores'

defineOptions({ name: 'HomeView' })

const listingsStore = useListingsStore()

onMounted(() => {
  listingsStore.fetchListings()
})
</script>
