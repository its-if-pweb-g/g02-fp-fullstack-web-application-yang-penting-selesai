"use client";

import React, { useState, useEffect } from "react";
import Banners from "./components/Banners";
import CategoriesCard from "./components/CategoriesCard";
import ProductCard from "./components/ProductCard";
import SliderLogo from "./components/SliderLogo";
import { Product } from "./components/ProductCard";

export default function Home() {
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
    <div>
      <Banners />
      <SliderLogo />
      <CategoriesCard />
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8">All Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
            {productList.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
