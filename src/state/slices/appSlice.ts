import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types";
import { products } from "../../static";

export interface AppState {
  // TODO: Change Cart type to Product[]
  products: Product[];
  cart: Product[];
  favorites: Product[];
}

const initialState: AppState = {
  products,
  cart: [],
  favorites: [],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.cart = action.payload;
    },
    setFavorites: (state, action: PayloadAction<Product[]>) => {
      state.favorites = action.payload;
    },
  },
});

export default appSlice.reducer;
export const { setProducts, setCart, setFavorites } = appSlice.actions;
