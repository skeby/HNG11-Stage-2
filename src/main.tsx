import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { Provider } from "react-redux"
import { persistor, store } from "./state/store.ts"
import { PersistGate } from "redux-persist/integration/react"
import { ConfigProvider, message } from "antd"
import { themeConfig } from "./config/antd.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClientOptions = {
  defaultOptions: {
    queries: {
      // staleTime: 0,
      refetchOnWindowFocus: true,
    },
  },
}
export const queryClient = new QueryClient(queryClientOptions)

message.config({
  maxCount: 2,
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={themeConfig}>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
            <ReactQueryDevtools />
          </PersistGate>
        </QueryClientProvider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)
