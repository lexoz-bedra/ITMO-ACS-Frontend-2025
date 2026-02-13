import instance from './instance.js'

class ListingsApi {
  constructor(axiosInstance) {
    this.api = axiosInstance
  }

  /** Получить все объявления */
  getAll(params = {}) {
    return this.api.get('/listings', { params })
  }

  /** Получить объявление по id */
  getById(id) {
    return this.api.get(`/listings/${id}`)
  }
}

export default new ListingsApi(instance)
