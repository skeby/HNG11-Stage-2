import { IoStar } from "react-icons/io5"
import Image from "./Image"
import { Image as AntdImage } from "antd"
import { IoIosStarOutline } from "react-icons/io"
import HeartIcon from "./HeartIcon"
import { LuEye } from "react-icons/lu"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../state/store"
import { setCart, setFavorites } from "../state/slices/appSlice"
import useMessage from "antd/es/message/useMessage"
import { Product } from "../types"
import { Skeleton, Tooltip } from "antd"
import CartIcon from "../assets/icons/cart.svg?react"
import { motion } from "framer-motion"
import { API_BASE_URL } from "../services/axiosClient"
import { useAppQuery } from "../hooks/useAppQuery"
import { paths } from "../static"

export interface ProductCardProps extends Product {}

const ProductCard = (props: ProductCardProps) => {
  const {
    stars,
    ratings,
    photos,
    current_price,
    available_quantity,
    // quantity,
    name,
    tags: tTags,
    loading,
  } = props

  const [previewVisible, setPreviewVisible] = useState(false)
  const [message, contextHolder] = useMessage()

  const { data, isSuccess, isLoading } = useAppQuery({
    queryKey: ["product", { id: props.id }],
    path: `${paths.products.get}/${props.id}`,
    enabled: previewVisible,
  })

  const product = data as Product

  const dispatch = useAppDispatch()
  const { cart, favorites, isDataLoading } = useAppSelector(
    (state) => state.app
  )

  const tags = [...(tTags ?? [])]
  const shortenedName = `${name?.slice(0, 10)}...`
  const isItemAddedToCart = cart.some((p) => p.id === props.id)
  const isFavorite = favorites.some((f) => f.id === props.id)

  if (available_quantity === 0)
    tags?.push({ title: "Out of stock", color: "#EE5858" })

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
      className="relative flex h-full cursor-pointer flex-col gap-y-6 rounded-[3px] border border-[#E4E7E9] p-4 transition-all duration-300 hover:border-[#C9CFD2] hover:shadow-lg"
    >
      <Skeleton
        paragraph={{
          rows: 8,
        }}
        active
        loading={isDataLoading || loading}
      >
        {contextHolder}
        <div className="absolute left-4 right-4 z-10 flex flex-wrap items-center gap-2">
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
        <AntdImage.PreviewGroup
          items={product?.photos?.map(
            (photo) => `${API_BASE_URL}/images/${photo.url}`
          )}
          preview={{
            visible: previewVisible && isSuccess && !isLoading,
            onVisibleChange(value) {
              setPreviewVisible(value)
            },
            toolbarRender: (originalNode) => (
              <div className="flex flex-col items-center gap-y-3">
                <p className="flex min-h-[45.75px] items-center justify-center rounded-[100px] bg-black/10 px-6 text-sm tracking-wide text-white/100">
                  {name}
                </p>
                {originalNode}
              </div>
            ),
          }}
        >
          <Image
            rootClassName="static"
            style={{
              height: "100%",
              objectFit: "cover",
            }}
            preview={{
              destroyOnClose: true,
              maskClassName: "!transition-all !duration-500 !bg-black/10",
              mask: (
                <div className="absolute flex items-center gap-x-2 px-2">
                  <Tooltip
                    title={
                      isFavorite ? "Remove from favorite" : "Add to favorite"
                    }
                  >
                    <>
                      <HeartIcon
                        isFavorite={isFavorite}
                        onFavoriteChange={(isFavorite) => {
                          message.success(
                            isFavorite
                              ? `${shortenedName} added to favorites`
                              : `${shortenedName} removed from favorites`
                          )
                          if (isFavorite) {
                            dispatch(setFavorites([...favorites, props]))
                          } else {
                            dispatch(
                              setFavorites(
                                favorites.filter((f) => f.id !== props.id)
                              )
                            )
                          }
                        }}
                      />
                    </>
                  </Tooltip>
                  {available_quantity !== 0 && (
                    <Tooltip
                      title={
                        isItemAddedToCart
                          ? "Item already added to cart"
                          : "Add to cart"
                      }
                    >
                      <div
                        className={`flex size-12 ${isItemAddedToCart ? "cursor-not-allowed" : "cursor-pointer"} items-center justify-center rounded-full bg-white duration-200 hover:scale-90`}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!isItemAddedToCart) {
                            addToCart()
                            message.success(`${shortenedName} added to cart`)
                          }
                        }}
                      >
                        <CartIcon className="text-black" />
                      </div>
                    </Tooltip>
                  )}
                  {photos.length > 0 && (
                    <Tooltip
                      title={photos.length > 1 ? "View images" : "View image"}
                    >
                      <div
                        className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-[#FF7F50] duration-200 hover:scale-90"
                        onClick={() => setPreviewVisible(true)}
                      >
                        <LuEye size={24} className="text-white" />
                      </div>
                    </Tooltip>
                  )}
                </div>
              ),
            }}
            src={
              photos?.[0]?.url
                ? `${API_BASE_URL}/images/${photos?.[0]?.url}`
                : undefined
            }
            alt={name}
            wrapperClassName="sm:h-[250px] max-h-[250px] sm:max-h-auto"
            className="!max-w-[100px]"
          />
        </AntdImage.PreviewGroup>
        <div className="flex flex-col gap-y-2">
          <div className="flex gap-x-1">
            <div className="flex items-center">
              {[...Array(stars)].map((_s, i) => (
                <IoStar key={i} size={16} className="text-[#FF7F50]" />
              ))}
              {stars > 0 &&
                [...Array(5 - stars)].map((_s, i) => (
                  <IoIosStarOutline
                    key={i}
                    size={16}
                    className="text-[#ADB7BC]"
                  />
                ))}
            </div>
            <p className="text-xs text-[#5d6468]">({ratings})</p>
          </div>
          <p className="max-h-10 overflow-hidden overflow-ellipsis text-sm">
            {name}
          </p>
          <p className="text-[#2DA5F3]">
            ₦{current_price[0]?.["NGN"]?.[0].toLocaleString()}
          </p>
        </div>
      </Skeleton>
    </motion.div>
  )
}

export default ProductCard
