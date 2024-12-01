import ProductCard from './components/ProductCard';

const products = [
  { id: 1, name: 'Product 1', price: 99.99, image: '/product1.jpg' },
  { id: 2, name: 'Product 2', price: 79.99, image: '/product2.jpg' },
  { id: 3, name: 'Product 3', price: 49.99, image: '/product3.jpg' },
  { id: 4, name: 'Product 1', price: 99.99, image: '/product4.jpg' },
  { id: 5, name: 'Product 2', price: 79.99, image: '/product5.jpg' },
  { id: 6, name: 'Product 3', price: 49.99, image: '/product6.jpg' },
];

export default function Home() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}