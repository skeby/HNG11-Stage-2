import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiCall } from "../services"
import { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios"
import { RequestBody } from "../types"

interface MutationData {
  mutationKey: unknown[]
  path: string
  onSuccess?: (data: RequestBody) => void
  onError?: () => void
  method?: string
  extraHeaders?: Partial<RawAxiosRequestHeaders>
  params?: AxiosRequestConfig<any>["params"]
  showLoader?: boolean
}

const useAppMutation = (mutationData: MutationData) => {
  const {
    mutationKey,
    path,
    onSuccess,
    onError,
    method = "post",
    extraHeaders,
    params,
    showLoader,
  } = mutationData ?? {}
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey,
    mutationFn: (data: RequestBody) => {
      return apiCall(data, path, method, extraHeaders, params, showLoader)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: mutationKey,
      })
      onSuccess && onSuccess(data)
    },
    onError: () => {
      if (onError) onError()
    },
  })
}

export { useAppMutation }
