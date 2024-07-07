import { ProductCardProps } from "../components/ProductCard";
import product1 from "../assets/images/product-1.png";
import product2 from "../assets/images/product-2.png";
import product3 from "../assets/images/product-3.png";
import product5 from "../assets/images/product-5.png";
import product6 from "../assets/images/product-6.png";
import product7 from "../assets/images/product-7.png";
import product8 from "../assets/images/product-8.png";
import product9 from "../assets/images/product-9.png";
import product10 from "../assets/images/product-10.png";
import product11 from "../assets/images/product-11.png";
import product12 from "../assets/images/product-12.png";
import product13 from "../assets/images/product-13.png";
import { Stars } from "../types";
import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb";
import HomeIcon from "../assets/icons/home.svg?react";

export const sampleProducts: {
  imageSrc: string;
  stars: Stars;
  ratings: number;
  price: number;
  title: string;
  tags: {
    title: string;
    color: string;
  }[];
}[] = [
  {
    imageSrc: product1,
    stars: 2,
    ratings: 300,
    price: 178300,
    title: "Snake leather skin bag of different color",
    tags: [{ title: "HOT", color: "#EE5858" }],
  },
  {
    imageSrc: product2,
    stars: 3,
    ratings: 10,
    price: 9370,
    title: "Chic collection bag",
    tags: [],
  },
  {
    imageSrc: product3,
    stars: 4,
    ratings: 330,
    price: 2303877,
    title: "Brown Leather bag with Small purse",
    tags: [],
  },
  {
    imageSrc: product5,
    stars: 1,
    ratings: 2,
    price: 3029200,
    title: "Pink Leather bag",
    tags: [],
  },
  {
    imageSrc: product6,
    stars: 1,
    ratings: 22,
    price: 1000,
    title: "Red bag with Fluf",
    tags: [],
  },
  {
    imageSrc: product7,
    stars: 0,
    ratings: 500,
    price: 200000,
    title: "Red leather bag",
    tags: [{ title: "SALE", color: "#2DB224" }],
  },
  {
    imageSrc: product8,
    stars: 3,
    ratings: 393,
    price: 32902,
    title: "Red wooven bag",
    tags: [],
  },
  {
    imageSrc: product9,
    stars: 5,
    ratings: 12,
    price: 40000,
    title: "Violet Handbag",
    tags: [],
  },
  {
    imageSrc: product10,
    stars: 5,
    ratings: 19,
    price: 45000,
    title: "White flowered bag",
    tags: [{ title: "SALE", color: "#2DB224" }],
  },
  {
    imageSrc: product11,
    stars: 5,
    ratings: 93,
    price: 202380,
    title: "Black snake skin bag",
    tags: [],
  },
  {
    imageSrc: product12,
    stars: 2,
    ratings: 64,
    price: 9300,
    title: "Pink leather bag",
    tags: [],
  },
  {
    imageSrc: product13,
    stars: 5,
    ratings: 10,
    price: 7990,
    title: "Brown designer bag",
    tags: [],
  },
];

export const products: ProductCardProps[] = sampleProducts.map(
  (product, i) => ({
    ...product,
    id: i + 1,
    quantity: 1,
    stars: product.stars,
  })
);

export const breadCrumbItems: BreadcrumbItemType[] = [
  {
    path: "/",
    title: (
      <div className="flex items-center gap-x-2">
        <HomeIcon className="!size-5" />
        <span>Home</span>
      </div>
    ),
  },
  {
    path: "/cart",
    title: "Shopping Cart",
  },
  {
    path: "/checkout",
    title: "Checkout",
  },
];

export const cartTableHeaders = ["Products", "Price", "Quantity", "Sub-Total"];
