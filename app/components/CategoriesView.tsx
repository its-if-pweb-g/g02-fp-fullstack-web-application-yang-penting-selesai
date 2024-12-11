"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Product } from "../components/ProductCard";
import DropDownIcon from "./Icon";

const SIDE_MENU = {
  categories: [
    { label: "All", href: "#" },
    { label: "Electronics", href: "#" },
    { label: "Fashion", href: "#" },
    { label: "Sports", href: "#" },
    { label: "Beauty & Care", href: "#" },
  ],
  filters: [
    { label: "Price: Low to High", href: "#" },
    { label: "Price: High to Low", href: "#" },
    { label: "Rating", href: "#" },
    { label: "Discount", href: "#" },
  ],
};

export default function CategoriesView() {
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
    <div className="max-w-7xl mx-auto grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-8">
      <div className="lg:col-span-1">
        <div className="flex h-min lg:h-screen flex-col justify-between border-e bg-white px-4 py-6">
          <ul className="mt-6 space-y-3">
            <li>
              <Link
                href="#"
                className="block rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-black">
                Products
              </Link>
            </li>
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-700  hover:text-[#859F3D]">
                  <span className="text-sm font-medium"> Category </span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <DropDownIcon />
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 px-2">
                  {SIDE_MENU.categories.map((category) => (
                    <li key={category.label}>
                      <label className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700  hover:text-[#859F3D] cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category.label}
                          className="mr-2 cursor-pointer"
                        />
                        {category.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-700  hover:text-[#859F3D]">
                  <span className="text-sm font-medium"> Filter </span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <DropDownIcon />
                  </span>
                </summary>
                <ul className="mt-2 space-y-1 px-2">
                  {SIDE_MENU.filters.map((filter) => (
                    <li key={filter.label}>
                      <label className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700  hover:text-[#859F3D] cursor-pointer">
                        <input
                          type="radio"
                          name="filter"
                          value={filter.label}
                          className="mr-2 cursor-pointer"
                        />
                        {filter.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      <div className="px-6 mt-6 mb-12 lg:my-12 rounded-lg lg:col-span-4 ">
        <h2 className="text-2xl font-bold text-left mb-8">All Products</h2>
        {/* panggil product dari database */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productList.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
