import { IoStar } from "react-icons/io5"
import Image from "./Image"
import { IoIosStarOutline } from "react-icons/io"
import HeartIcon from "./HeartIcon"
import { LuEye } from "react-icons/lu"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../state/store"
import { setCart, setFavorites } from "../state/slices/appSlice"
import useMessage from "antd/es/message/useMessage"
import { Product } from "../types"
import { Skeleton } from "antd"
import CartIcon from "../assets/icons/cart.svg?react"
import { motion } from "framer-motion"

export interface ProductCardProps extends Product {}

const ProductCard = (props: ProductCardProps) => {
  const [message, contextHolder] = useMessage()
  const { imageSrc, stars, ratings, price, title, tags } = props
  const [previewVisible, setPreviewVisible] = useState(false)
  const dispatch = useAppDispatch()
  const { cart, favorites, isDataLoading } = useAppSelector(
    (state) => state.app
  )

  const shortenedTitle = `${title.slice(0, 10)}...`

  const addToCart = () => {
    const productExists = cart.find((item) => item.id === props.id)

    if (productExists) {
      // Increase quantity if product exists
      const updatedCartItems = cart.map((item) =>
        item.id === props.id ? { ...item, quantity: item.quantity + 1 } : item
      )
      dispatch(setCart(updatedCartItems))
    } else {
      // Add new product with quantity 1 if it doesn't exist
      dispatch(setCart([...cart, { ...props, quantity: 1 }]))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, type: "tween" }}
      className="relative flex h-full cursor-pointer flex-col gap-y-6 rounded-[3px] border border-[#E4E7E9] p-4 transition-all duration-300 hover:border-[#C9CFD2] hover:shadow-xl"
    >
      <Skeleton
        paragraph={{
          rows: 8,
        }}
        active
        loading={isDataLoading}
      >
        {contextHolder}
        <div className="absolute z-10 flex items-center gap-2">
          {tags?.map((tag, i) => (
            <div
              key={i}
              style={{ backgroundColor: tag.color }}
              className="left-0 top-0 h-[26px] rounded-sm px-2.5 py-[5px] text-xs font-semibold uppercase text-white"
            >
              {tag.title}
            </div>
          ))}
        </div>
        <Image
          preview={{
            visible: previewVisible,
            onVisibleChange(value) {
              if (!value) {
                setPreviewVisible(false)
              }
            },
            destroyOnClose: true,
            maskClassName: "!cursor-default",
            mask: (
              <div className="absolute flex items-center gap-x-2 px-2">
                <HeartIcon
                  isFavorite={favorites.some((f) => f.id === props.id)}
                  onFavoriteChange={(isFavorite) => {
                    message.success(
                      isFavorite
                        ? `${shortenedTitle} added to favorites`
                        : `${shortenedTitle} removed from favorites`
                    )
                    if (isFavorite) {
                      dispatch(setFavorites([...favorites, props]))
                    } else {
                      dispatch(
                        setFavorites(favorites.filter((f) => f.id !== props.id))
                      )
                    }
                  }}
                />
                <div
                  className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-white duration-200 hover:scale-90"
                  onClick={() => {
                    addToCart()
                    message.success(`${shortenedTitle} added to cart`)
                  }}
                >
                  <CartIcon className="text-black" />
                </div>
                <div
                  className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#FF7F50] duration-200 hover:scale-90"
                  onClick={() => setPreviewVisible(true)}
                >
                  <LuEye size={24} className="text-white" />
                </div>
              </div>
            ),
          }}
          src={imageSrc}
          alt={title}
          className="!h-[172px] !max-w-[100px]"
        />
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-1">
            <div className="flex items-center">
              {[...Array(stars)].map((_s, i) => (
                <IoStar key={i} size={16} className="text-[#FF7F50]" />
              ))}
              {[...Array(5 - stars)].map((_s, i) => (
                <IoIosStarOutline
                  key={i}
                  size={16}
                  className="text-[#ADB7BC]"
                />
              ))}
            </div>
            <p className="text-xs text-[#5d6468]">({ratings})</p>
          </div>
          <p className="h-10 overflow-hidden overflow-ellipsis text-sm">
            {title}
          </p>
          <p className="text-[#2DA5F3]">₦{price.toLocaleString()}</p>
        </div>
      </Skeleton>
    </motion.div>
  )
}

export default ProductCard
