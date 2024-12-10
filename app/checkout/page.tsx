"use client";

import { useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const MOCK_CART: Product[] = [
  {
    id: 1,
    name: "Produk A",
    price: 100000,
    quantity: 2,
    image: "/example-product.jpg",
  },
  {
    id: 2,
    name: "Produk B",
    price: 75000,
    quantity: 1,
    image: "/example-product-2.jpg",
  },
];

export default function CheckoutPage() {
  const [cart, setCart] = useState<Product[]>(MOCK_CART);

  const handleRemoveItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const getTotalPrice = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert("Checkout berhasil! Terima kasih atas pembelian Anda.");
    setCart([]); // Kosongkan keranjang setelah checkout
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <div className="text-center min-h-screen">
          <p className="text-gray-600">Keranjang Anda kosong.</p>
          <Link href="/" className="text-[#76ac38] hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Daftar Produk */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-md font-medium text-gray-900">
                    {item.name}
                  </h2>
                  <p className="text-gray-600">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                  className="w-16 text-center border rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:underline">
                  Hapus
                </button>
              </div>
            </div>
          ))}

          {/* Total Harga */}
          <div className="text-right mt-6">
            <p className="text-md text-gray-900">
              Total:{" "}
              <span className="font-bold">
                Rp {getTotalPrice().toLocaleString("id-ID")}
              </span>
            </p>
          </div>

          {/* Tombol Checkout */}
          <div className="text-right">
            <button
              onClick={handleCheckout}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 transition-colors">
              Lanjutkan Pembayaran
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
