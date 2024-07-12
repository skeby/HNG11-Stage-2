import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiCall } from "../services"

interface MutationData {
  mutationKey: any[]
  path: string
  onSuccess?: (data: any) => void
  onError?: (data?: any) => void
  method?: string
  extraHeaders?: any
  params?: any
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
    mutationFn: (data: any) => {
      return apiCall(data, path, method, extraHeaders, params, showLoader)
    },
    onSuccess: (data) => {
      if (data.status === "success") {
        queryClient.invalidateQueries({
          queryKey: mutationKey,
        })
        onSuccess && onSuccess(data)
      } else {
        if (onError) onError(data)
      }
    },
    onError: () => {
      if (onError) onError()
    },
  })
}

export { useAppMutation }
