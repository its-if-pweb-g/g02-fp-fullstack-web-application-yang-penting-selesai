import Banners from "./components/Banners";
import CategoriesCard from "./components/CategoriesCard";
import ProductCard from "./components/ProductCard";
import SliderLogo from "./components/SliderLogo";
import { products } from "./data/Products";

export default function Home() {
  return (
    <div>
      <Banners />
      <SliderLogo />
      <CategoriesCard />
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
