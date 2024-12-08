"use client";

import { products } from "../data/Products";
import { PlusCircle } from "lucide-react";
import React, { useState } from "react";
import { Product } from "./ProductTable";

const TABLE = {
  header: ["Name", "Category", "Price", "Rating", "Discount"],
  data: products,
};

const FORM_DATA = [
  { name: "Name", type: "text" },
  { name: "Category", type: "text" },
  { name: "Description", type: "text" },
  { name: "Price", type: "number" },
  { name: "Discount", type: "number" },
  { name: "Image", type: "file" },
];

export default function AdminView() {
  const [activeRow, setActiveRow] = useState<Number | null>(null);
  const [addProduct, setAddProduct] = useState(false);

  const handleActionClick = (id: Number) => {
    setActiveRow((prev) => (prev === id ? null : id));
  };

  const handleAddProduct = () => {
    setAddProduct((prev) => !prev);
    setActiveRow(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Product Submitted!");
  };

  return (
    <div className="my-12 lg:py-6 px-8 max-w-screen-xl bg-zinc-50 rounded-xl mx-auto flex flex-col shadow-lg">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-4 py-8 space-y-2 ">
          <h1 className="text-xl font-bold text-left">Hello... Admin</h1>
          <p className="text-sm">
            Manage your products and view their sales performance.
          </p>
        </div>
        <div className="min-w-fit w-min px-4 py-2 h-min bg-[#859F3D] text-white rounded-lg hover:bg-[#afd053] transition-all ease-in-out cursor-pointer hover:-translate-y-1">
          <button
            onClick={handleAddProduct}
            className="flex text-sm items-center justify-center text-left ">
            <PlusCircle size={18} className="mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {addProduct && (
        <div className="w-full h-full fixed top-0 left-0 flex items-center justify-center backdrop-filter backdrop-blur-sm backdrop-brightness-75 z-50">
          <div className="bg-white p-10 rounded-lg text-center shadow-lg border-[1px] border-solid border-black">
            <h2 className="text-xl font-bold mb-4">Add new product </h2>
            <form onSubmit={handleSubmit} className="space-y-4 w-[600px] ">
              {FORM_DATA.map((item) => (
                <div
                  key={item.name}
                  className="grid-cols-8 grid gap-4 items-center">
                  <label
                    className="block text-sm col-span-1 text-left "
                    htmlFor="name">
                    {item.name}
                  </label>
                  {":"}
                  <input
                    className="rounded-lg col-span-6 border border-gray-200 p-4 text-sm"
                    placeholder={item.name}
                    type={item.type}
                    id={item.name}
                  />
                </div>
              ))}
            </form>
            <button
              className="text-sm mt-8 px-4 py-2 bg-[#859F3D] text-white rounded-lg hover:bg-[#afd053] transition-all ease-in-out cursor-pointer hover:-translate-y-1"
              onClick={handleAddProduct}>
              Add to database
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto pb-6">
        <table className="min-w-full mx-auto divide-y-2 divide-gray-200 text-sm">
          <thead className="text-left transition-colors ease-in-out hover:bg-zinc-100">
            <tr>
              {TABLE.header.map((item, index) => (
                <th
                  key={index}
                  scope="col"
                  className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {TABLE.data.map((item) => (
              <tr
                key={item.id}
                className=" transition-colors ease-in-out hover:bg-zinc-100">
                <td className="whitespace-nowrap px-4 py-2 ">
                  <div className="flex flex-row space-x-4 items-center py-2">
                    <div className="bg-zinc-100 p-2 text-center w-20 h-20 rounded-md">
                      {" "}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover"
                      />
                    </div>
                    <div className="p-2 text-left grow ">{item.name}</div>
                  </div>{" "}
                </td>
                <td className="whitespace-nowrap px-4 py-2 ">{item.price}</td>
                <td className="whitespace-nowrap px-4 py-2 ">{item.price}</td>
                <td className="whitespace-nowrap px-4 py-2 ">{item.rating}</td>
                <td className="whitespace-nowrap px-4 py-2 ">
                  {item.discountPercentage
                    ? item.discountPercentage + "%"
                    : "-"}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <button
                    type="button"
                    onClick={() => handleActionClick(item.id)}
                    className="inline-block rounded bg-[#859F3D] px-4 py-2 text-xs font-medium text-white hover:bg-[#bade57]">
                    Actions
                  </button>
                  {activeRow === item.id && (
                    <div className="w-32 h-min flex flex-col text-sm bg-white mt-2 p-4 space-y-4 shadow-lg border rounded-md absolute z-10">
                      <h3 className="font-semibold">Actions</h3>
                      <button className="hover:text-[#859F3D] text-left items-center">
                        Edit
                      </button>
                      <button className="hover:text-[#859F3D] text-left items-center">
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <div className="flex items-center justify-center px-4 py-3 sm:px-6">
          <p className="text-sm">
            Showing {TABLE.data.length} of {TABLE.data.length} products
          </p>
        </div>
      </div>
    </div>
  );
}
