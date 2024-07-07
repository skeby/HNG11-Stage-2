import { createBrowserRouter } from "react-router-dom"
import MainLayout from "./pages/MainLayout"
import ProductList from "./views/ProductList"
import Cart from "./views/Cart"
import Checkout from "./views/Checkout"
import Favorites from "./views/Favorites"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <ProductList /> },
      { path: "checkout", element: <Checkout /> },
      { path: "cart", element: <Cart /> },
      { path: "favorites", element: <Favorites /> },
    ],
  },
])
