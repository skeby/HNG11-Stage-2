import { useQuery } from "@tanstack/react-query"
import { apiCall } from "../services"
import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios"

interface QueryData {
  queryKey: unknown[]
  path: string
  enabled?: boolean
  refetchOnMount?: boolean
  extraHeaders?: Partial<RawAxiosRequestHeaders>
  params?: AxiosRequestConfig<any>["params"]
  showLoader?: boolean
}

const useAppQuery = (queryData: QueryData) => {
  const {
    queryKey,
    path,
    enabled,
    refetchOnMount,
    extraHeaders,
    params,
    showLoader,
  } = queryData
  return useQuery({
    queryKey,
    queryFn: () => apiCall({}, path, "get", extraHeaders, params, showLoader),
    enabled: enabled,
    refetchOnMount: refetchOnMount ?? false,
  })
}

export { useAppQuery }
