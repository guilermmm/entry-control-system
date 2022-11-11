import axios from 'axios'
import { getSavedToken } from './auth'

export const api = axios.create({
  // baseURL: 'https://entry-control-system-server-production.up.railway.app/',
  baseURL: 'http://localhost:3030/',
})

api.interceptors.request.use(
  config => {
    const token = getSavedToken()
    if (token) {
      if (!config.headers) config.headers = {}
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error),
)

export default api
