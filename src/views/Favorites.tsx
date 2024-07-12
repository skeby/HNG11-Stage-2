// import { useAppQuery } from "../hooks/useAppQuery"
import { useAppSelector } from "../state/store"
import ProductList from "./ProductList"

const Favorites = () => {
  // const {} = useAppQuery({})
  const { displayedProducts, searchQuery } = useAppSelector(
    (state) => state.app
  )
  return (
    <ProductList
      products={displayedProducts}
      emptyDescription={
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
