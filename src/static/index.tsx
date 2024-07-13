import { BreadcrumbItemType } from "antd/es/breadcrumb/Breadcrumb"
import HomeIcon from "../assets/icons/home.svg?react"
import AmazonIcon from "../assets/icons/amazon.svg?react"
import CardIcon from "../assets/icons/card.svg?react"
import CashIcon from "../assets/icons/cash.svg?react"
import PaypalIcon from "../assets/icons/paypal.svg?react"
import VenmoIcon from "../assets/icons/venmo.svg?react"
import { IoLogoApple, IoLogoGooglePlaystore } from "react-icons/io5"

export const paths = {
  products: {
    get: "/products",
  },
  sales: {
    add: "/sales",
  },
  images: "/images",
}

export const validation = {
  required: "*This field is required",
  email: "*Please enter a valid email address",
}

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
]

export const cartTableHeaders = ["Products", "Price", "Quantity", "Sub-Total"]

export const paymentOptions = [
  {
    icon: <CashIcon />,
    title: "Cash on Delivery",
  },
  {
    icon: <VenmoIcon />,
    title: "Venmo",
  },
  {
    icon: <PaypalIcon />,
    title: "Paypal",
  },
  {
    icon: <AmazonIcon />,
    title: "Amazon Pay",
  },
  {
    icon: <CardIcon />,
    title: "Debit/Credit Card",
  },
]

export const footerSections = [
  {
    header: "Product",
    links: [
      {
        title: "Dresses",
        path: "/",
      },
      {
        title: "Handbag",
        path: "/",
      },
      {
        title: "Skincare",
        path: "/",
      },
      {
        title: "Lingerie",
        path: "/",
      },
      {
        title: "Scarves",
        path: "/",
      },
    ],
  },
  {
    header: "Company",
    links: [
      {
        title: "Company",
        path: "/",
      },
      {
        title: "Company",
        path: "/",
      },
      {
        title: "Company",
        path: "/",
      },
      {
        title: "Company",
        path: "/",
      },
      {
        title: "Company",
        path: "/",
      },
    ],
  },
]

export const footerAppStores = [
  {
    name: "Google Play",
    icon: <IoLogoGooglePlaystore size={32} />,
  },
  {
    name: "App Store",
    icon: <IoLogoApple size={32} />,
  },
]
