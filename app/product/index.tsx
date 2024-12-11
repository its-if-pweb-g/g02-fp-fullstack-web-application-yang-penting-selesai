"use client";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard"; // Mengimpor komponen ProductCard
import { Product } from "../components/ProductCard";

export default function ProductsPage() {
  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductList(data.products || []);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productList.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
