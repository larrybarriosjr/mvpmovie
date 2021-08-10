import axios from "axios"
import { API_KEY, BASE_URL } from "constants/env"

const instance = axios.create({ baseURL: BASE_URL })

instance.interceptors.request.use(config => {
  config.params = { api_key: API_KEY }
  return config
})

export const Axios = instance
