import { AnimatePresence } from "framer-motion"
import ProductCard from "../components/ProductCard"
import { Empty, Pagination } from "antd"
import { Product } from "../types"
import { ReactNode } from "react"

interface Props {
  products: Product[]
  emptyDescription: ReactNode
  loading?: boolean
}

const ProductList = ({ products, emptyDescription, loading }: Props) => {
  return products.length > 0 ? (
    <div className="grid w-full grid-cols-1 gap-4 bg-white sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <AnimatePresence>
        {products.map((f, i) => (
          <ProductCard loading={loading} key={i} {...f} />
        ))}
        {products && products.length === 0 && <Pagination />}
      </AnimatePresence>
    </div>
  ) : (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={emptyDescription}
    />
  )
}

export default ProductList
