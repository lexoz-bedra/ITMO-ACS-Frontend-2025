<template>
  <div v-if="!authStore.isLoggedIn" class="container py-5 text-center">
    <p class="text-muted mb-3">Вы не авторизованы.</p>
    <router-link to="/login" class="btn btn-primary">Войти</router-link>
  </div>

  <div v-else>
    <header class="profile-header py-4 mb-4" role="banner">
      <div class="container">
        <div class="row align-items-center g-3">
          <div class="col-auto">
            <div class="avatar-circle">{{ avatarInitials }}</div>
          </div>
          <div class="col">
            <h1 class="h4 mb-1">{{ authStore.userName || 'Пользователь' }}</h1>
            <p class="mb-1 small">{{ authStore.userEmail }}</p>
            <span class="badge bg-light text-dark" style="font-size: 0.75rem">Арендатор и арендодатель</span>
          </div>
        </div>
      </div>
    </header>

    <main class="container mb-5" role="main">
      <div class="row g-4">
        <section class="col-lg-4" aria-labelledby="profile-sidebar-title">
          <div class="card shadow-sm mb-4">
            <div class="card-body">
              <h2 class="h5 mb-3" id="profile-sidebar-title">Профиль</h2>
              <dl class="row mb-0 small">
                <dt class="col-5 text-muted">Имя</dt>
                <dd class="col-7">{{ authStore.userName || '-' }}</dd>
                <dt class="col-5 text-muted">Email</dt>
                <dd class="col-7">{{ authStore.userEmail || '-' }}</dd>
                <dt class="col-5 text-muted">Телефон</dt>
                <dd class="col-7">{{ authStore.user?.phone || '-' }}</dd>
                <dt class="col-5 text-muted">Город</dt>
                <dd class="col-7">Санкт‑Петербург</dd>
              </dl>
            </div>
          </div>
          <div class="card shadow-sm">
            <div class="card-body">
              <h2 class="h6 mb-3">Быстрые действия</h2>
              <div class="d-grid gap-2">
                <router-link to="/" class="btn btn-outline-primary btn-sm">Найти новое жильё</router-link>
                <button type="button" class="btn btn-outline-secondary btn-sm" disabled>Добавить объявление</button>
              </div>
              <hr />
              <button type="button" class="btn btn-outline-danger btn-sm w-100" @click="handleLogout">
                Выйти из аккаунта
              </button>
            </div>
          </div>
        </section>

        <section class="col-lg-8" role="region" aria-labelledby="rentals-heading">
          <div class="card shadow-sm mb-4">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h2 class="h5 mb-0" id="rentals-heading">Моя аренда</h2>
                <span class="badge bg-success">1 активная аренда</span>
              </div>
              <article class="row g-3 align-items-center">
                <div class="col-md-4">
                  <img
                    src="/images/s_vidom_na_reku.jpeg"
                    class="img-fluid rounded"
                    alt="2‑к квартира с видом на реку"
                  />
                </div>
                <div class="col-md-8">
                  <h3 class="h6 mb-1">2‑к квартира с видом на реку</h3>
                  <p class="small text-muted mb-2">Санкт‑Петербург, Василеостровский район · до 30.06.2026</p>
                  <p class="fw-semibold mb-2">70 000 ₽ / месяц</p>
                  <p class="small mb-2">Оплачен текущий месяц. Следующий платёж до 5 числа.</p>
                  <router-link to="/" class="btn btn-outline-primary btn-sm">Открыть объявление</router-link>
                </div>
              </article>
            </div>
          </div>

          <div class="card shadow-sm mb-4" role="region" aria-labelledby="listings-heading">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h2 class="h5 mb-0" id="listings-heading">Мои объявления</h2>
                <span class="text-muted small">2 объекта</span>
              </div>
              <div class="row g-3">
                <div class="col-md-6">
                  <article class="border rounded p-3 h-100">
                    <h3 class="h6 mb-1">Студия у метро Владимирская</h3>
                    <p class="small text-muted mb-1">Санкт-Петербург, Центральный район</p>
                    <p class="fw-semibold mb-2">45 000 ₽ / месяц</p>
                    <span class="badge bg-success mb-2">Сдаётся</span>
                    <p class="small mb-2">Есть активные отклики от 3 пользователей.</p>
                    <router-link to="/" class="btn btn-outline-primary btn-sm">Открыть объявление</router-link>
                  </article>
                </div>
                <div class="col-md-6">
                  <article class="border rounded p-3 h-100">
                    <h3 class="h6 mb-1">Загородный дом с террасой</h3>
                    <p class="small text-muted mb-1">Ленинградская область, Всеволожский район</p>
                    <p class="fw-semibold mb-2">90 000 ₽ / месяц</p>
                    <span class="badge bg-secondary mb-2">Неактивно</span>
                    <p class="small mb-2">Объявление скрыто. Можно активировать позже.</p>
                    <button type="button" class="btn btn-outline-secondary btn-sm" disabled>Редактировать</button>
                  </article>
                </div>
              </div>
            </div>
          </div>

          <div class="card shadow-sm" role="region" aria-labelledby="history-heading">
            <div class="card-body">
              <h2 class="h5 mb-3" id="history-heading">История сообщений и сделок</h2>
              <ul class="list-group list-group-flush small">
                <li class="list-group-item px-0">
                  <div class="d-flex justify-content-between">
                    <span>Сообщение от <strong>Алексея</strong> по объявлению «Загородный дом с террасой»</span>
                    <span class="text-muted">10.02.2026</span>
                  </div>
                  <p class="mb-1">«Здравствуйте! Можно ли посмотреть дом в ближайшие выходные?»</p>
                </li>
                <li class="list-group-item px-0">
                  <div class="d-flex justify-content-between">
                    <span>Оформлена аренда по объявлению «2‑к квартира с видом на реку»</span>
                    <span class="text-muted">01.02.2026</span>
                  </div>
                  <p class="mb-1">Договор до 30.06.2026. Арендная плата - 70 000 ₽.</p>
                </li>
                <li class="list-group-item px-0 text-muted">
                  Здесь отображаются переписки и совершённые сделки.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

defineOptions({ name: 'ProfileView' })

const router = useRouter()
const authStore = useAuthStore()

const avatarInitials = computed(() => {
  const name = authStore.userName.trim()
  if (!name) return '?'
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
})

function handleLogout() {
  authStore.logout()
  router.push('/')
}
</script>
