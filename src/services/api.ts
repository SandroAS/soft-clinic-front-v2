import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // ajuste para seu back-end
  timeout: 5000,
})

export default api

/**
 * Exemplo de uso:
 * import api from '@/services/api'
 * api.get('/users').then(res => console.log(res.data))
 */