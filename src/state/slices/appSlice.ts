import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Product } from "../../types"
export interface AppState {
  cart: Product[]
  favorites: Product[]
  searchQuery?: string
  isDataLoading: boolean
}

const initialState: AppState = {
  cart: [],
  favorites: [],
  searchQuery: "",
  isDataLoading: false,
}

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.cart = action.payload
    },
    setFavorites: (state, action: PayloadAction<Product[]>) => {
      state.favorites = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setIsDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload
    },
  },
})

export default appSlice.reducer
export const { setCart, setFavorites, setSearchQuery, setIsDataLoading } =
  appSlice.actions
