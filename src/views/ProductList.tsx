import ProductCard from "../components/ProductCard";
import { products } from "../static";

const ProductList = () => {
  return (
    <div className="w-full bg-white grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
      {products.map((product, i) => (
        <ProductCard key={i} {...product} />
      ))}
    </div>
  );
};

export default ProductList;
