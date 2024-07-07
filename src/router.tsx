import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductList from "./views/ProductList";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";
import Favorites from "./views/Favorites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <ProductList /> },
      { path: "checkout", element: <Checkout /> },
      { path: "cart", element: <Cart /> },
      { path: "favorites", element: <Favorites /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
