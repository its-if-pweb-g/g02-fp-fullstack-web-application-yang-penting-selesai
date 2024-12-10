import Link from "next/link";
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import DropDownIcon from "./Icon";

// nanti dipanggil dari database
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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
