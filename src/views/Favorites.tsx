import { Empty } from "antd"
import ProductCard from "../components/ProductCard"
import { useAppSelector } from "../state/store"
import { AnimatePresence } from "framer-motion"

const Favorites = () => {
  const { displayedProducts, searchQuery } = useAppSelector(
    (state) => state.app
  )
  return displayedProducts.length > 0 ? (
    <div className="grid w-full grid-cols-1 gap-4 bg-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <AnimatePresence>
        {displayedProducts.map((f, i) => (
          <ProductCard key={i} {...f} />
        ))}
      </AnimatePresence>
    </div>
  ) : (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        searchQuery !== "" ? (
          "No favorite product found"
        ) : (
          <div className="text-center">
            <p className="font-semibold">No data</p>
            <p>
              Click on the heart icon shown on hovering on the product image to
              add to favorites
            </p>
          </div>
        )
      }
    />
  )
}

export default Favorites
