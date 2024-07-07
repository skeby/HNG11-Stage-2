import { AnimatePresence } from "framer-motion"
import ProductCard from "../components/ProductCard"
import { useAppSelector } from "../state/store"
import { Empty } from "antd"

const ProductList = () => {
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
        searchQuery !== "" ? "No product found" : "No product available"
      }
    />
  )
}

export default ProductList
