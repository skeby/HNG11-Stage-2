import ProductCard from "../components/ProductCard";
import { useAppSelector } from "../state/store";

const ProductList = () => {
  const { displayedProducts } = useAppSelector((state) => state.app);
  return (
    <div className="w-full bg-white grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {displayedProducts.map((product, i) => (
        <ProductCard key={i} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
