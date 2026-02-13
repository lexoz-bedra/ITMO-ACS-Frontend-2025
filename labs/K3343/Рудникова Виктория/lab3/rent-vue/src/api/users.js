import instance from './instance.js'


class UsersApi {
  constructor(axiosInstance) {
    this.api = axiosInstance
  }

  /** Найти по email */
  getByEmail(email) {
    return this.api.get('/users', {
      params: { email },
    })
  }

  /** Создать пользователя */
  create(userData) {
    return this.api.post('/users', userData, {
      headers: { 'Content-Type': 'application/json' },
    })
  }

  /** Получить пользователя по id */
  getById(id) {
    return this.api.get(`/users/${id}`)
  }
}

export default new UsersApi(instance)
