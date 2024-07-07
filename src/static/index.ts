import { ProductCardProps } from "../components/ProductCard";
import product1 from "../assets/images/product-1.png";
import product2 from "../assets/images/product-2.png";
import product3 from "../assets/images/product-2.png";
import { Stars } from "../types";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";

export const sampleProducts = [
  {
    imageSrc: product1,
    stars: 4,
    ratings: 330,
    price: 10000,
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    tags: [{ title: "HOT", color: "#EE5858" }],
  },
  {
    imageSrc: product2,
    stars: 2,
    ratings: 330,
    price: 178300,
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    tags: [{ title: "SALE", color: "#2DB224" }],
  },
  {
    imageSrc: product3,
    stars: 5,
    ratings: 330,
    price: 9370,
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    tags: [{ title: "HOT", color: "#EE5858" }],
  },
  {
    imageSrc: product3,
    stars: 1,
    ratings: 330,
    price: 100,
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    tags: [{ title: "HOT", color: "#EE5858" }],
  },
  {
    imageSrc: product3,
    stars: 4,
    ratings: 330,
    price: 100,
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    tags: [{ title: "HOT", color: "#EE5858" }],
  },
  {
    imageSrc: product3,
    stars: 5,
    ratings: 330,
    price: 100,
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    tags: [{ title: "HOT", color: "#EE5858" }],
  },
  {
    imageSrc: product3,
    stars: 5,
    ratings: 330,
    price: 100,
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    tags: [{ title: "HOT", color: "#EE5858" }],
  },
  {
    imageSrc: product3,
    stars: 5,
    ratings: 330,
    price: 100,
    title: "TOZO T6 True Wireless Earbuds Bluetooth Headphon...",
    tags: [{ title: "HOT", color: "#EE5858" }],
  },
];

export const products: ProductCardProps[] = sampleProducts.map(
  (product, i) => ({
    ...product,
    id: i + 1,
    quantity: 1,
    stars: product.stars as Stars,
  })
);

export const breadCrumbItems: BreadcrumbItemType[] = [
  {
    path: "/",
    title: "Home",
    menu: {
      items: [
        {
          path: "/cart",
          title: "Cart",
        },
        {
          path: "/checkout",
          title: "Checkout",
        },
      ],
    },
  },
];

export const cartTableHeaders = ["Products", "Price", "Quantity", "Sub-Total"];
