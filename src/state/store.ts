import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import appReducer, { AppState } from "./slices/appSlice"
import storage from "redux-persist/lib/storage"
import {
  persistStore,
  persistReducer,
  createMigrate,
  MigrationManifest,
} from "redux-persist"

export interface PersistedAppState extends AppState {}

const migrations: MigrationManifest = {
  // Migration to clear state when version changes
  2: () => {
    return {
      _persist: {
        version: 2, // Set the version to the new version
        rehydrated: true, // Set rehydrated to true to indicate the state has been migrated
      },
    }
  },
  // Add more migrations as needed
}

const appPersistConfig = {
  key: "app",
  version: 2,
  storage: storage,
  whitelist: ["favorites", "cart"],
  migrate: createMigrate(migrations, { debug: false }),
}

export const store = configureStore({
  reducer: {
    app: persistReducer<PersistedAppState>(appPersistConfig, appReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector
