import { defineStore } from 'pinia'
import { listingsApi } from '@/api'

export const useListingsStore = defineStore('listings', {
  state: () => ({
    listings: [],
    currentListing: null,
    loading: false,
    error: null,
  }),

  getters: {
    hasListings: (state) => state.listings.length > 0,
  },

  actions: {
    async fetchListings(params = {}) {
      this.loading = true
      this.error = null
      try {
        const { data } = await listingsApi.getAll(params)
        this.listings = Array.isArray(data) ? data : []
        return data
      } catch (err) {
        this.error = err.message || 'Ошибка загрузки объявлений'
        this.listings = []
        throw err
      } finally {
        this.loading = false
      }
    },

    async fetchListingById(id) {
      this.loading = true
      this.error = null
      this.currentListing = null
      try {
        const { data } = await listingsApi.getById(id)
        this.currentListing = data
        return data
      } catch (err) {
        this.error = err.message || 'Ошибка загрузки объявления'
        throw err
      } finally {
        this.loading = false
      }
    },

    clearCurrentListing() {
      this.currentListing = null
    },
  },
})
