import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: number;
  discountPercentage?: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  const discountedPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  const renderStarRating = (rating?: number) => {
    if (!rating) {
      do {
        rating = Math.random() * 5;
      } while (rating <= 1);
    }

    return (
      <div className="flex items-center text-yellow-500">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={12}
            fill={index < Math.floor(rating) ? "#FFC107" : "none"}
            className="mr-1"
          />
        ))}
        <span className="text-gray-600 ml-2 text-12">
          ({rating.toFixed(1)})
        </span>
      </div>
    );
  };

  return (
    <div className=" text-sm group relative bg-zinc-50 shadow-lg rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      <button className="absolute top-4 right-4 z-10 bg-white/70 p-2 rounded-full hover:bg-white hover:shadow-lg transition-all">
        <Heart size={20} className="text-gray-600 hover:text-red-500" />
      </button>

      <div className="relative w-full pt-[100%]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {product.discountPercentage && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {product.discountPercentage}% OFF
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>

          <div className="flex justify-between items-center mb-2">
            {product.category && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                {product.category}
              </span>
            )}
            {renderStarRating(product.rating)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {product.discountPercentage ? (
              <>
                <span className="text-lg font-bold text-red-500 mr-2">
                  Rp {discountedPrice.toLocaleString()}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  Rp {product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                Rp {product.price.toLocaleString()}
              </span>
            )}
          </div>

          <button className="bg-[#859F3D] text-white p-2 rounded-full hover:bg-[#bade57] transition-colors">
            <ShoppingCart size={18} />
          </button>
        </div>

        <Link
          href={`/product/${product.id}`}
          className="block mt-4 text-center text-[#859F3D] hover:text-[#bade57] transition-colors">
          See product details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
