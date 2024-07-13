import { useAppSelector } from "../state/store"
import ProductList from "./ProductList"

const Favorites = () => {
  const { searchQuery, favorites } = useAppSelector((state) => state.app)
  return (
    <ProductList
      showPagination={false}
      products={favorites}
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
