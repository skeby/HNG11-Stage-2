import { createBrowserRouter } from "react-router-dom"
import MainLayout from "./pages/MainLayout"
import Cart from "./views/Cart"
import Checkout from "./views/Checkout"
import Favorites from "./views/Favorites"
import AllProducts from "./views/AllProducts"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <AllProducts /> },
      { path: "checkout", element: <Checkout /> },
      { path: "cart", element: <Cart /> },
      { path: "favorites", element: <Favorites /> },
    ],
  },
])
