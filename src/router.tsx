import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import ProductList from "./views/ProductList";
import Cart from "./views/Cart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <ProductList /> },
      { path: "checkout", element: <Checkout /> },
      { path: "cart", element: <Cart /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
]);
