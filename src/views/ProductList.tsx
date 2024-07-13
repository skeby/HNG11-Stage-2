import { AnimatePresence } from "framer-motion"
import ProductCard from "../components/ProductCard"
import { Empty, Pagination, PaginationProps } from "antd"
import { Product } from "../types"
import { ReactNode } from "react"

interface Props extends PaginationProps {
  products: Product[]
  emptyDescription: ReactNode
  loading?: boolean
}

const ProductList = (props: Props) => {
  const { products, emptyDescription, loading, ...paginationProps } = props
  return products.length > 0 ? (
    <div className="flex flex-col items-center gap-y-8">
      <div className="grid w-full grid-cols-1 justify-center gap-4 bg-white min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence>
          {products.map((p, i) => (
            <ProductCard loading={loading} key={i} {...p} />
          ))}
        </AnimatePresence>
      </div>
      {products && <Pagination {...paginationProps} />}
    </div>
  ) : (
    !loading && (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={emptyDescription}
      />
    )
  )
}

export default ProductList
