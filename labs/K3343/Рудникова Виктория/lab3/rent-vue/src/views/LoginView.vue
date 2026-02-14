<template>
  <div class="auth-wrapper d-flex align-items-center py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <section class="card shadow-sm" aria-labelledby="login-title">
            <div class="card-body p-4">
              <h1 class="h4 mb-3" id="login-title">Вход</h1>
              <p class="text-muted small mb-4">
                Войдите в аккаунт, чтобы управлять объявлениями и бронированиями.
              </p>
              <form class="row g-3" @submit.prevent="handleSubmit">
                <div class="col-12">
                  <label for="loginEmail" class="form-label">Email</label>
                  <input
                    id="loginEmail"
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div class="col-12">
                  <label for="loginPassword" class="form-label">Пароль</label>
                  <input
                    id="loginPassword"
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    required
                  />
                </div>
                <div v-if="authStore.loginError" class="col-12">
                  <div class="alert alert-danger py-2 small mb-0">
                    {{ authStore.loginError }}
                  </div>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-primary w-100" :disabled="loading">
                    {{ loading ? 'Вход…' : 'Войти' }}
                  </button>
                </div>
              </form>
              <p class="small text-muted mt-3 mb-0">
                Нет аккаунта?
                <router-link to="/register">Зарегистрируйтесь</router-link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

defineOptions({ name: 'LoginView' })

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const form = reactive({ email: '', password: '' })

async function handleSubmit() {
  loading.value = true
  try {
    const user = await authStore.login(form.email.trim(), form.password)
    if (user) router.push('/profile')
  } finally {
    loading.value = false
  }
}
</script>
