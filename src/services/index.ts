import axiosClient from "./axiosClient"
import { AxiosResponse } from "axios"
import { message } from "antd"

let hide: any

export const apiCall = async (
  body: any,
  path: string,
  method: string,
  extraHeaders?: any,
  params?: any,
  showLoader = true
) => {
  try {
    const client = await axiosClient()
    let res: AxiosResponse | null = null

    if (extraHeaders) {
      client.defaults.headers.common = {
        ...client.defaults.headers.common,
        ...extraHeaders,
      }
    }

    if (showLoader) hide = message.loading("Loading", 0)
    switch (method) {
      case "post":
        res = await client.post(path, body, { params })
        break
      case "get":
        res = await client.get(path, { params })
        break
      case "put":
        res = await client.put(path, body, { params })
        break
      case "delete":
        res = await client.delete(path, { params })
        break
      default:
        throw new Error(`Unsupported method: ${method}`)
    }

    if (!res) {
      throw new Error("Empty response from server")
    }

    const responseData: any = res.data
    if (responseData.status === "success") {
      message.destroy()
      if (method !== "get") {
        message.success(responseData.message)
      }
      return responseData
    } else {
      const errorMessage = responseData.message || "Something went wrong!"
      if (method !== "get") {
        message.error(errorMessage, 6)
      }
      return responseData
    }
  } catch (error: any) {
    const errorMessage = error.message ? error.message : "Something went wrong!"
    message.destroy()
    message.error(errorMessage, 6)
    return false
  } finally {
    hide && hide()
  }
}
