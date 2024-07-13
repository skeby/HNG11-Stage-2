import axios from "axios"
import { message } from "antd"
import { API_KEY, APP_ID, ORGANIZATION_ID } from "../config/env"

console.log("windows_host", window.location.hostname)
export const API_BASE_URL = "https://api.timbu.cloud"

const client = axios.create({
  baseURL: "/api",
  // baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
  timeout: 60000,
})

// Intercept all requests
client.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      organization_id: ORGANIZATION_ID,
      Appid: APP_ID,
      Apikey: API_KEY,
    }
    console.log(`${config.method?.toUpperCase()} - ${config.url}`)
    return config
  },
  (error) => Promise.reject(error)
)

// Intercept all responses
client.interceptors.response.use(
  async (response) => {
    console.log(`${response.status} - ${response.config.url}`)
    return response
  },
  (error) => {
    const status = error.response?.status
    if (status === 401) {
      message.error("Session expired. Please login to Timbu Cloud again.")
      return null
    } else if (status >= 400 && status < 500) {
      return Promise.reject({
        message: error.response?.data.message,
        data: { message: error.response?.data.message },
      })
    }

    if (error?.message === "Network Error") {
      return Promise.reject({
        message: "Something went wrong! Please try again.",
        data: {
          message: "Please check your internet connection and try again.",
        },
      })
    }

    return Promise.reject(error)
  }
)

export default async () => {
  return client
}
