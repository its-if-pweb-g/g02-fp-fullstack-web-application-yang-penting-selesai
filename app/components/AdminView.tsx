"use client";

import { PlusCircle } from "lucide-react";
import React, { useState, useCallback, useEffect } from "react";
import { Product } from "./ProductTable";

const TABLE_HEADER = ["Name", "Category", "Price", "Actions"];

const FORM_DATA = [
  { name: "name", type: "text" },
  { name: "category", type: "text" },
  { name: "description", type: "text" },
  { name: "price", type: "number" },
  { name: "discount", type: "number" },
  { name: "image", type: "file" },
];

export default function AdminView() {

  const [products, setProducts] = useState<Product[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [activeRow, setActiveRow] = useState<string | null>(null);
  const [addProduct, setAddProduct] = useState(false);

  useEffect(() => {

    const fetchProducts = async () => {
      
      try {
        
        const res = await fetch('/api/products');
        
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await res.json();
        setProducts(data.products as Product[]);
      
      } catch (error) {
        console.error('Error fetching products:', error);
      
      }
    };

    fetchProducts();
  }, []);

  const handleActionClick = (id: string) => {
    setActiveRow((prev) => (prev === id ? null : id));
  };

  const handleAddProduct = () => {
    setAddProduct((prev) => !prev);
    setActiveRow(null);
  };

  const handleSubmit = useCallback( async (e: React.FormEvent) => {

    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const imageFile = formData.get('image') as File;
    
    formData.delete('image');
    const productData = Object.fromEntries(formData.entries());

    setUploadStatus('uploading');

    try {

      if (imageFile && imageFile.size > 0) {
        
        const imageFormData = new FormData();
        imageFormData.append('image', imageFile);

        const imageRes = await fetch('http://35.193.181.126:3000/upload-image', {
            method: 'POST',
            body: imageFormData
        });

        if (!imageRes.ok) {
            throw new Error('Failed to upload image');
        }

        const { imageURL } = await imageRes.json();
        productData.imageURL = imageURL;
      
      }

      const productRes = await fetch('/api/products/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
  
      if (productRes.ok) {
        setUploadStatus('success');
        console.log('Product added successfully');
      
      } else {
        setUploadStatus('failed');
        console.error('Failed to add product');
      
      }

    } catch (error) {
      setUploadStatus('failed');
      console.error('Error:', error);
    }

  }, []);

  const handleDeleteProduct = useCallback( async (id: string) => {

    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    console.log(`/api/products/delete-product/${id}`);

    if (confirmDelete) {
      try {

        const res = await fetch(`/api/products/delete-product/${id}`, {
          method: 'DELETE',
        });
  
        if (!res.ok) {
          throw new Error('Failed to delete product');
        }
  
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        console.log('Product deleted successfully');

      } catch (error) {
        console.error('Error deleting product:', error);

      }
    }

  }, []);

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

            {uploadStatus === 'uploading' && (
              <div className="mb-4 p-4 text-sm text-blue-800 bg-blue-50 rounded-lg">
                <span className="font-medium">Uploading...</span> Please wait while the data is being uploaded.
              </div>
            )}

            {uploadStatus === 'success' && (
              <div className="mb-4 p-4 text-sm text-green-800 bg-green-50 rounded-lg">
                <span className="font-medium">Success!</span> Product has been added successfully.
              </div>
            )}

            {uploadStatus === 'failed' && (
              <div className="mb-4 p-4 text-sm text-red-800 bg-red-50 rounded-lg">
                <span className="font-medium">Error!</span> Something went wrong. Please try again.
              </div>
            )}

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
                    name={item.name}
                  />
                </div>
              ))}
              <button 
                type="submit"
                disabled={uploadStatus === 'uploading'}
                className={`text-sm mt-8 px-4 py-2 rounded-lg transition-all ease-in-out cursor-pointer ${
                  uploadStatus === 'uploading'
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-[#859F3D] text-white hover:bg-[#afd053] hover:-translate-y-1'
                }`}>
                {uploadStatus === 'uploading' ? 'Uploading...' : 'Add to database'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto pb-6">
        <table className="min-w-full mx-auto divide-y-2 divide-gray-200 text-sm">
          <thead className="text-left transition-colors ease-in-out hover:bg-zinc-100">
            <tr>
              {TABLE_HEADER.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((item) => (
              <tr
                key={item._id}
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
                <td className="whitespace-nowrap px-4 py-2 ">{item.category}</td>
                <td className="whitespace-nowrap px-4 py-2 ">{item.price}</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <button
                    type="button"
                    onClick={() => handleActionClick(item._id)}
                    className="inline-block rounded bg-[#859F3D] px-4 py-2 text-xs font-medium text-white hover:bg-[#bade57]">
                    Actions
                  </button>
                  {activeRow === item._id && (
                    <div className="w-32 h-min flex flex-col text-sm bg-white mt-2 p-4 space-y-4 shadow-lg border rounded-md absolute z-10">
                      <h3 className="font-semibold">Actions</h3>
                      <button className="hover:text-[#859F3D] text-left items-center">
                        Edit
                      </button>
                      <button 
                        className="hover:text-[#859F3D] text-left items-center"
                        onClick={() => handleDeleteProduct(item._id)}
                      >
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
            Showing {products.length} of {products.length} products
          </p>
        </div>
      </div>
    </div>
  );
}
