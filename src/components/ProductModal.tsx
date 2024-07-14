import { Button, Carousel, ConfigProvider, message, Modal, Tooltip } from "antd"
import { Product } from "../types"
import HeartIcon from "./HeartIcon"
import { ReactNode } from "react"
import Image from "./Image"
import { API_BASE_URL } from "../services/axiosClient"

interface Props {
  shortenedName: string
  isOpen: boolean
  isItemAddedToCart: boolean
  isFavorite: boolean
  onClose: () => void
  addToCart: () => void
  removeFromCart: () => void
  onFavoriteChange: (isFavorite: boolean) => void
  product: Product
  productInfo: ReactNode
  tags: ReactNode
}

const ProductModal = ({
  shortenedName,
  isOpen,
  isItemAddedToCart,
  isFavorite,
  onClose,
  addToCart,
  removeFromCart,
  onFavoriteChange,
  product,
  productInfo,
  tags,
}: Props) => {
  const { available_quantity } = product
  return (
    <Modal
      centered
      open={isOpen}
      closeIcon={null}
      classNames={{
        header: "left-0",
        content: "!rounded-xl !px-5 !py-5",
      }}
      onCancel={onClose}
      footer={
        <div className="flex items-center gap-x-3">
          <Button
            disabled={available_quantity === 0}
            onClick={() => {
              if (!isItemAddedToCart) {
                addToCart()
                message.success(`${shortenedName} added to cart`)
              } else {
                removeFromCart()
                message.success(`${shortenedName} removed from cart`)
              }
            }}
            className="h-[51px] w-full rounded-xl bg-primary font-semibold !text-white hover:!text-primary disabled:!text-black"
          >
            {isItemAddedToCart ? "Remove from Cart" : "Add to Cart"}
          </Button>
          <Tooltip
            title={isFavorite ? "Remove from favorite" : "Add to favorite"}
          >
            <>
              <HeartIcon
                className="!size-[51px] rounded-xl border border-black bg-white"
                isFavorite={isFavorite}
                onFavoriteChange={onFavoriteChange}
              />
            </>
          </Tooltip>
        </div>
      }
    >
      <Carousel arrows rootClassName="!rounded-xl !overflow-hidden">
        {product.photos.map((photo, i) => (
          <ConfigProvider
            theme={{
              components: {
                Image: {
                  borderRadius: 12,
                  borderRadiusOuter: 12,
                },
              },
            }}
          >
            <Image
              key={i}
              rootClassName="w-full sm:h-[400px] h-[300px] md:h-[350px] max-h-[400px] duration-500"
              style={{
                height: "100%",
                objectFit: "cover",
                borderRadius: 12,
              }}
              src={`${API_BASE_URL}/images/${photo.url}`}
            />
          </ConfigProvider>
        ))}
      </Carousel>
      <div className="my-3 flex flex-wrap items-center gap-2">{tags}</div>
      {productInfo}
    </Modal>
  )
}

export default ProductModal
