<template>
  <div>
    <header class="hero py-5 mb-4" role="banner">
      <div class="hero-overlay py-4">
        <div class="container">
          <div class="row align-items-center g-4">
            <div class="col-lg-6">
              <h1 class="display-5 fw-semibold mb-3">Найдите идеальное жильё для аренды</h1>
              <p class="lead mb-4">
                Квартиры, комнаты и дома в вашем городе. Удобный поиск по цене, типу и расположению.
              </p>
            </div>
            <div class="col-lg-6">
              <div class="card shadow-sm" role="region" aria-labelledby="search-title">
                <div class="card-body">
                  <h2 class="h5 mb-3" id="search-title">Поиск недвижимости</h2>
                  <form
                    class="row g-3"
                    role="search"
                    aria-label="Фильтры поиска объявлений"
                    @submit.prevent="handleSearch"
                  >
                    <div class="col-12 col-md-6">
                      <label for="location" class="form-label">Город / район</label>
                      <input
                        id="location"
                        v-model="filters.location"
                        type="text"
                        class="form-control"
                        placeholder="Санкт-Петербург, Центральный"
                      />
                    </div>
                    <div class="col-12 col-md-6">
                      <label for="type" class="form-label">Тип недвижимости</label>
                      <select id="type" v-model="filters.type" class="form-select">
                        <option value="">Любой тип</option>
                        <option value="квартира">Квартира</option>
                        <option value="комната">Комната</option>
                        <option value="дом">Дом</option>
                      </select>
                    </div>
                    <div class="col-6 col-md-3">
                      <label for="priceFrom" class="form-label">Цена от, ₽</label>
                      <input
                        id="priceFrom"
                        v-model.number="filters.priceFrom"
                        type="number"
                        class="form-control"
                        min="0"
                        step="1000"
                        placeholder="0"
                      />
                    </div>
                    <div class="col-6 col-md-3">
                      <label for="priceTo" class="form-label">Цена до, ₽</label>
                      <input
                        id="priceTo"
                        v-model.number="filters.priceTo"
                        type="number"
                        class="form-control"
                        min="0"
                        step="1000"
                        placeholder="0"
                      />
                    </div>
                    <div class="col-12 col-md-6">
                      <label for="dateFrom" class="form-label">Дата заезда</label>
                      <input
                        id="dateFrom"
                        v-model="filters.dateFrom"
                        type="date"
                        class="form-control"
                      />
                    </div>
                    <div class="col-12">
                      <button type="submit" class="btn btn-primary w-100">
                        Найти предложения
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="container mb-5" role="main">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2 class="h4 mb-0">Популярные предложения</h2>
        <span class="text-muted small">Сначала новые</span>
      </div>

      <div v-if="listingsStore.loading" class="text-muted py-4">Загрузка объявлений…</div>
      <div v-else-if="listingsStore.error" class="alert alert-danger">
        {{ listingsStore.error }}
      </div>
      <div v-else-if="listingsStore.hasListings" class="row g-4">
        <div v-for="item in listingsStore.listings" :key="item.id" class="col-12 col-md-6 col-lg-4">
          <ListingCard :listing="item" />
        </div>
      </div>
      <p v-else class="text-muted py-4">Объявлений пока нет.</p>
    </main>

    <footer class="border-top py-3 mt-auto">
      <div class="container text-muted small text-center">
        © 2026 RentEasy — сервис аренды недвижимости
      </div>
    </footer>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useListingsStore } from '@/stores'
import ListingCard from '@/components/ListingCard.vue'

defineOptions({ name: 'HomeView' })

const listingsStore = useListingsStore()

const filters = reactive({
  location: '',
  type: '',
  priceFrom: null,
  priceTo: null,
  dateFrom: '',
})

function buildParams() {
  const params = {}
  if (filters.location?.trim()) {
    params.address_like = filters.location.trim()
  }
  if (filters.type) {
    params.type = filters.type
  }
  if (filters.priceFrom != null && filters.priceFrom > 0) {
    params.price_gte = filters.priceFrom
  }
  if (filters.priceTo != null && filters.priceTo > 0) {
    params.price_lte = filters.priceTo
  }
  return params
}

function handleSearch() {
  listingsStore.fetchListings(buildParams())
}

onMounted(() => {
  listingsStore.fetchListings()
})
</script>
