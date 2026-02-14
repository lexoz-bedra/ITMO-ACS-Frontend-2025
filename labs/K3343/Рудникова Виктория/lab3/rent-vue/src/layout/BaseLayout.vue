<template>
  <div class="layout">
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
      role="navigation"
      aria-label="Основная навигация"
    >
      <div class="container">
        <router-link to="/" class="navbar-brand fw-semibold d-flex align-items-center gap-2">
          <svg class="icon-brand" viewBox="0 0 24 24" aria-hidden="true">
            <use href="#icon-home" />
          </svg>
          RentEasy
        </router-link>
        <div class="d-flex align-items-center gap-2 order-lg-3 ms-2 ms-lg-3">
          <button
            type="button"
            class="theme-toggle text-light p-0 border-0"
            :aria-label="theme.toggleLabel"
            :title="theme.toggleLabel"
            @click="theme.toggle"
          >
            <svg v-if="!theme.isDark" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#icon-sun" />
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#icon-moon" />
            </svg>
          </button>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarMain"
            aria-label="Открыть меню навигации"
            aria-expanded="false"
            aria-controls="navbarMain"
          >
            <span class="navbar-toggler-icon" />
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarMain">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link
                to="/"
                class="nav-link d-flex align-items-center gap-1"
                active-class="active"
                exact-active-class="active"
              >
                <svg class="icon-nav" viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#icon-search" />
                </svg>
                Поиск
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/profile"
                class="nav-link d-flex align-items-center gap-1"
                active-class="active"
              >
                <svg class="icon-nav" viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#icon-user" />
                </svg>
                Личный кабинет
              </router-link>
            </li>
          </ul>
          <div class="d-flex align-items-center gap-2">
            <template v-if="authStore.isLoggedIn">
              <span class="navbar-text text-white-50 small d-none d-md-inline me-2">
                {{ authStore.userEmail }}
              </span>
              <button type="button" class="btn btn-outline-light btn-sm" @click="handleLogout">
                Выйти
              </button>
            </template>
            <template v-else>
              <router-link to="/login" class="btn btn-outline-light btn-sm">Вход</router-link>
              <router-link to="/register" class="btn btn-primary btn-sm">Регистрация</router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import { useTheme } from '@/composables/useTheme'

defineOptions({ name: 'BaseLayout' })

const router = useRouter()
const authStore = useAuthStore()
const theme = useTheme()

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.icon-brand {
  width: 1.35rem;
  height: 1.35rem;
  flex-shrink: 0;
}

.icon-nav {
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
}

.nav-link .icon-nav,
.navbar-brand .icon-brand {
  fill: currentColor;
}

.main-content {
  padding-top: 4.5rem;
  min-height: 100vh;
}
</style>
