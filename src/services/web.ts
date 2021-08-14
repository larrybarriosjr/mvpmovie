import axios from "axios"
import { API_KEY_PROP, API_KEY_VALUE, API_VERSION_PROP, API_VERSION_VALUE, BASE_URL } from "constants/env"

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    [API_VERSION_PROP]: API_VERSION_VALUE,
    [API_KEY_PROP]: API_KEY_VALUE
  }
})
