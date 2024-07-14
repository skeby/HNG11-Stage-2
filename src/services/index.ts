import axiosClient from "./axiosClient"
import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios"
import { message } from "antd"
import { MessageType } from "antd/es/message/interface"
import { RequestBody } from "../types"

let hide: MessageType

export const apiCall = async (
  body: RequestBody,
  path: string,
  method: string,
  extraHeaders?: Partial<RawAxiosRequestHeaders>,
  params?: AxiosRequestConfig<any>["params"],
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

    const responseData: AxiosResponse<any, any>["data"] = res.data
    message.destroy()
    if (method !== "get" && responseData.message) {
      message.success(responseData.message)
    }
    return responseData
  } catch (error) {
    const errorMessage = (error as AxiosError).message
      ? (error as AxiosError).message
      : "Something went wrong!"
    message.destroy()
    message.error(errorMessage, 6)
    return false
  } finally {
    hide && hide()
  }
}
