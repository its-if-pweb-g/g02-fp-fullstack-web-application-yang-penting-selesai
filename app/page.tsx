import Banners from "./components/Banners";
import CategoriesCard from "./components/CategoriesCard";
import ProductCard from "./components/ProductCard";
import SliderLogo from "./components/SliderLogo";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 99.99,
    image: "/product1.jpg",
    discountPercentage: 20,
  },
  {
    id: 2,
    name: "Product 2",
    price: 79.99,
    image: "/product2.jpg",
    discountPercentage: 30,
  },
  {
    id: 3,
    name: "Product 3",
    price: 49.99,
    image: "/product3.jpg",
  },
  { id: 4, name: "Product 1", price: 99.99, image: "/product4.jpg" },
  {
    id: 5,
    name: "Product 2",
    price: 79.99,
    image: "/product5.jpg",
    discountPercentage: 75,
  },
  { id: 6, name: "Product 3", price: 49.99, image: "/product6.jpg" },
  {
    id: 7,
    name: "Product 2",
    price: 79.99,
    image: "/product5.jpg",
    discountPercentage: 50,
  },
  { id: 8, name: "Product 3", price: 49.99, image: "/product6.jpg" },
];

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
