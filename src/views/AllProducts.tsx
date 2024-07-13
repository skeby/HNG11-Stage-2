import { useEffect, useState } from "react"
import { useAppQuery } from "../hooks/useAppQuery"
import { useAppSelector } from "../state/store"
import { paths } from "../static"
import ProductList from "./ProductList"
import { animateScroll } from "react-scroll"

const AllProducts = () => {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const { searchQuery } = useAppSelector((state) => state.app)
  const { data, isLoading, isFetching } = useAppQuery({
    queryKey: ["products", { page, size, searchQuery }],
    path: paths.products.get,
    showLoader: false,
    params: {
      page,
      size,
      search_value: searchQuery,
    },
    enabled: true,
  })

  useEffect(() => {
    setPage(1)
  }, [searchQuery])

  return (
    <ProductList
      pageSize={size}
      current={page}
      hideOnSinglePage={false}
      // showSizeChanger
      total={data?.total ?? 0}
      onChange={(page, size) => {
        animateScroll.scrollToTop({
          duration: 500,
        })
        setPage(page)
        setSize(size)
      }}
      loading={isLoading || isFetching}
      products={
        data?.items ??
        (isLoading || isFetching
          ? [...Array(3)].map((_, i) => ({
              id: `${i}`,
              name: "",
              photos: [],
              current_price: [],
            }))
          : [])
      }
      emptyDescription={
        searchQuery !== "" ? "No product found" : "No product available"
      }
    />
  )
}

export default AllProducts
