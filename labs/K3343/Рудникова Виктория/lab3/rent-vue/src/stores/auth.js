import { defineStore } from 'pinia'
import { usersApi } from '@/api'

const STORAGE_KEY = 'renteasy_user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loginError: null,
    registerError: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    userName: (state) => state.user?.name ?? '',
    userEmail: (state) => state.user?.email ?? '',
  },

  actions: {
    initFromStorage() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const data = JSON.parse(raw)
          this.user = { name: data.name ?? '', email: data.email ?? '', phone: data.phone ?? '' }
        }
      } catch {
        this.user = null
      }
    },

    async login(email, password) {
      this.loginError = null
      try {
        const { data } = await usersApi.getByEmail(email)
        const users = Array.isArray(data) ? data : []
        const user = users.find((u) => u.email === email && u.password === password)
        if (!user) {
          this.loginError = 'Неверный email или пароль.'
          return null
        }
        const safe = { name: user.name ?? '', email: user.email ?? '', phone: user.phone ?? '' }
        this.user = safe
        localStorage.setItem(STORAGE_KEY, JSON.stringify(safe))
        return safe
      } catch (err) {
        this.loginError = 'Ошибка соединения с сервером.'
        throw err
      }
    },

    async register(userData) {
      this.registerError = null
      const { name, email, phone, password } = userData
      try {
        const { data: existing } = await usersApi.getByEmail(email)
        if (Array.isArray(existing) && existing.length > 0) {
          this.registerError = 'Пользователь с таким email уже зарегистрирован.'
          return null
        }
        const { data: user } = await usersApi.create({ name, email, phone: phone ?? '', password })
        if (!user?.id) throw new Error('Не удалось создать пользователя')
        const safe = { name: user.name ?? '', email: user.email ?? '', phone: user.phone ?? '' }
        this.user = safe
        localStorage.setItem(STORAGE_KEY, JSON.stringify(safe))
        return safe
      } catch (err) {
        if (this.registerError) return null
        this.registerError = 'Ошибка соединения с сервером.'
        throw err
      }
    },

    logout() {
      this.user = null
      this.loginError = null
      this.registerError = null
      try {
        localStorage.removeItem(STORAGE_KEY)
      } catch {}
    },
  },
})
