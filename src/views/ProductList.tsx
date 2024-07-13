import { AnimatePresence } from "framer-motion"
import ProductCard from "../components/ProductCard"
import { Empty, Pagination, PaginationProps } from "antd"
import { Product } from "../types"
import { ReactNode } from "react"
import PaginationItem from "../components/PaginationItem"

interface Props extends PaginationProps {
  products: Product[]
  emptyDescription: ReactNode
  loading?: boolean
}

const ProductList = (props: Props) => {
  const { products, emptyDescription, loading, ...paginationProps } = props
  const newProducts = products.map((p) => {
    const extraInfo = p.description ? JSON.parse(p.description) : {}
    return {
      ...p,
      ...extraInfo,
    }
  })
  console.log(products)
  return products.length > 0 ? (
    <div className="flex flex-col items-center gap-y-10">
      <div className="grid w-full grid-cols-1 justify-center gap-4 bg-white min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence>
          {newProducts.map((p, i) => (
            <ProductCard loading={loading} key={i} {...p} />
          ))}
        </AnimatePresence>
      </div>
      {newProducts && (
        <Pagination
          {...paginationProps}
          itemRender={(page, type) => (
            <PaginationItem
              page={page}
              type={type}
              pageSize={paginationProps.pageSize ?? 10}
              currentPage={paginationProps.current ?? 1}
              total={paginationProps.total ?? 0}
            />
          )}
        />
      )}
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
