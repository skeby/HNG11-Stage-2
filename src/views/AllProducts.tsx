import { useAppQuery } from "../hooks/useAppQuery"
import { useAppSelector } from "../state/store"
import { paths } from "../static"
import ProductList from "./ProductList"

const AllProducts = () => {
  const { data, isLoading } = useAppQuery({
    queryKey: ["products"],
    path: paths.products.get,
  })

  console.log(data)
  const { displayedProducts, searchQuery } = useAppSelector(
    (state) => state.app
  )
  return (
    <ProductList
      loading={isLoading}
      products={displayedProducts}
      emptyDescription={
        searchQuery !== "" ? "No product found" : "No product available"
      }
    />
  )
}

export default AllProducts
