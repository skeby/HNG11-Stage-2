import { useQuery } from "@tanstack/react-query"
import { apiCall } from "../services"

interface QueryData {
  queryKey: any[]
  path: string
  enabled?: boolean
  refetchOnMount?: boolean
  extraHeaders?: any
  params?: any
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
