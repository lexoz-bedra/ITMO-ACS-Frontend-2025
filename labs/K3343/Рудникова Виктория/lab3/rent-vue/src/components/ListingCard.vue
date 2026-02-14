<template>
  <div class="card h-100 shadow-sm">
    <div class="card-img-wrapper">
      <img
        v-if="listing.image && !imageError"
        :src="imageSrc"
        :alt="listing.title"
        class="card-img-top listing-img"
        @error="imageError = true"
      />
      <div v-else class="card-img-top listing-placeholder" aria-hidden="true">
        <span class="listing-placeholder-text">Нет фото</span>
      </div>
    </div>
    <div class="card-body">
      <h3 class="card-title h6">{{ listing.title }}</h3>
      <p class="card-text small text-muted mb-2">{{ listing.address }}</p>
      <p class="fw-semibold mb-0">{{ formatPrice(listing.price) }} / месяц</p>
      <div v-if="listing.rooms || listing.area" class="small text-muted mt-1">
        {{ listing.rooms ? `${listing.rooms} к.` : '' }}
        {{ listing.area ? `${listing.area} м²` : '' }}
        {{ listing.type ? ` · ${listing.type}` : '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineOptions({ name: 'ListingCard' })

const props = defineProps({
  listing: {
    type: Object,
    required: true,
  },
})

const imageError = ref(false)

const imageSrc = computed(() => {
  if (!props.listing?.image) return ''
  return `/images/${props.listing.image}`
})

function formatPrice(price) {
  if (price == null) return '—'
  return new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
}
</script>

<style scoped>
.listing-img {
  object-fit: cover;
  height: 200px;
  width: 100%;
}

.listing-placeholder {
  height: 200px;
  background: var(--body-bg-alt, #f5f5f7);
  display: flex;
  align-items: center;
  justify-content: center;
}

.listing-placeholder-text {
  font-size: 0.875rem;
  color: var(--text-muted, #6c757d);
}
</style>
