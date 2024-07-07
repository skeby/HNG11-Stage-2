import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types";
import { products } from "../../static";

export interface AppState {
  displayedProducts: Product[];
  products: Product[];
  cart: Product[];
  favorites: Product[];
  searchQuery?: string;
  isDataLoading: boolean;
}

const initialState: AppState = {
  displayedProducts: [],
  products,
  cart: [],
  favorites: [],
  searchQuery: "",
  isDataLoading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setDisplayedProducts: (state, action: PayloadAction<Product[]>) => {
      state.displayedProducts = action.payload;
    },
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.cart = action.payload;
    },
    setFavorites: (state, action: PayloadAction<Product[]>) => {
      state.favorites = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setIsDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isDataLoading = action.payload;
    },
  },
});

export default appSlice.reducer;
export const {
  setProducts,
  setCart,
  setFavorites,
  setSearchQuery,
  setIsDataLoading,
  setDisplayedProducts,
} = appSlice.actions;
