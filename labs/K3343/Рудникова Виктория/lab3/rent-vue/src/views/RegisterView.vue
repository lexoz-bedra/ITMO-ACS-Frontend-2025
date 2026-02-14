<template>
  <div class="auth-wrapper d-flex align-items-center py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6">
          <section class="card shadow-sm" aria-labelledby="register-title">
            <div class="card-body p-4">
              <h1 class="h4 mb-3" id="register-title">Регистрация</h1>
              <p class="text-muted small mb-4">
                Создайте аккаунт, чтобы снимать и сдавать недвижимость.
              </p>
              <form class="row g-3" @submit.prevent="handleSubmit">
                <div class="col-12">
                  <label for="registerName" class="form-label">Имя и фамилия</label>
                  <input
                    id="registerName"
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    placeholder="Иван Иванов"
                    required
                  />
                </div>
                <div class="col-12">
                  <label for="registerEmail" class="form-label">Email</label>
                  <input
                    id="registerEmail"
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div class="col-12">
                  <label for="registerPhone" class="form-label">Телефон</label>
                  <input
                    id="registerPhone"
                    v-model="form.phone"
                    type="tel"
                    class="form-control"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div class="col-12 col-md-6">
                  <label for="registerPassword" class="form-label">Пароль</label>
                  <input
                    id="registerPassword"
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-12 col-md-6">
                  <label for="registerPasswordRepeat" class="form-label">Повторите пароль</label>
                  <input
                    id="registerPasswordRepeat"
                    v-model="form.passwordRepeat"
                    type="password"
                    class="form-control"
                    required
                  />
                </div>
                <div v-if="passwordMismatch" class="col-12">
                  <div class="alert alert-warning py-2 small mb-0">Пароли не совпадают.</div>
                </div>
                <div v-if="authStore.registerError" class="col-12">
                  <div class="alert alert-danger py-2 small mb-0">
                    {{ authStore.registerError }}
                  </div>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn btn-success w-100" :disabled="loading || passwordMismatch">
                    {{ loading ? 'Регистрация…' : 'Зарегистрироваться' }}
                  </button>
                </div>
              </form>
              <p class="small text-muted mt-3 mb-0">
                Уже есть аккаунт?
                <router-link to="/login">Войти</router-link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

defineOptions({ name: 'RegisterView' })

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  passwordRepeat: '',
})

const passwordMismatch = computed(
  () => form.password && form.passwordRepeat && form.password !== form.passwordRepeat
)

async function handleSubmit() {
  if (passwordMismatch.value) return
  loading.value = true
  try {
    const user = await authStore.register({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
    })
    if (user) router.push('/profile')
  } finally {
    loading.value = false
  }
}
</script>
