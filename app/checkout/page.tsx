"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Trash2, ShoppingCart, Plus, Minus } from "lucide-react";
import { Products, CartItem, CartSummary } from "../cart/page";
import { useAuth } from "../context/AuthContext";

export default function CheckoutPage() {
  const { user } = useAuth();
  const [cart, setCart] = useState<{
    items: CartItem[];
    summary?: CartSummary;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/cart?userId=${user.id}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch cart data");
      }

      const data = await res.json();

      if (!data.cart || data.cart.items.length === 0) {
        setCart(null);
      } else {
        setCart(data.cart);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleRemoveItem = async (productId: string) => {
    if (!user?.id) return;

    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to remove item");
      }

      setCart((prevCart) => {
        if (!prevCart) return null;
        return {
          ...prevCart,
          items: prevCart.items.filter((item) => item.productId !== productId),
        };
      });
    } catch (error) {
      console.error("Error removing item:", error);
      setError(
        error instanceof Error ? error.message : "Failed to remove item"
      );
    }
  };

  const handleQuantityChange = async (productId: string, quantity: number) => {
    if (!user?.id || quantity < 1) return;

    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          productId,
          quantity,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update quantity");
      }

      setCart((prevCart) => {
        if (!prevCart) return null;
        return {
          ...prevCart,
          items: prevCart.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        };
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update quantity"
      );
    }
  };

  const calculateTotalPrice = () => {
    if (!cart) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ShoppingCart className="animate-pulse" size={48} />
        <p className="ml-2">Memuat keranjang Anda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-6">
        <p>{error}</p>
        <button
          onClick={fetchCart}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Ulangi Lagi
        </button>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center p-6">
        <ShoppingCart className="mx-auto mb-4" size={48} />
        <h1 className="text-2xl mb-2">
          Terima kasih telah melakukan pembayaran {"^^ "}
        </h1>
        <p className="text-gray-600">Pesanan kamu akan kami proses</p>
        <Link href="/">
          <button className="mt-4 bg-[#76ac38] hover:bg-[#bade57] text-white px-4 py-2 rounded">
            Lanjutkan Belanja
          </button>
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    alert("Checkout berhasil! Terima kasih atas pembelian Anda.");
    setCart(null); // Kosongkan keranjang setelah checkout
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

      {cart.items.length === 0 ? (
        <div className="text-center min-h-screen">
          <p className="text-gray-600">Keranjang Anda kosong.</p>
          <Link href="/" className="text-[#76ac38] hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Daftar Produk */}
          {cart.items.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.product?.image || "/images/placeholder.png"}
                  alt={item.product?.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h2 className="text-md font-medium text-gray-900">
                    {item.product?.name}
                  </h2>
                  <p className="text-gray-600">
                    Rp {item.product?.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center mr-4">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.productId, item.quantity - 1)
                    }
                    className="bg-gray-200 p-2 rounded-l">
                    <Minus size={16} />
                  </button>
                  <span className="px-4 border-y">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.productId, item.quantity + 1)
                    }
                    className="bg-gray-200 p-2 rounded-r">
                    <Plus size={16} />
                  </button>

                  <button
                    onClick={() => handleRemoveItem(item.productId)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded">
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Total Harga */}
          <div className="text-right mt-6">
            <p className="text-lg text-gray-900">
              Total:{" "}
              <span className="font-bold">
                Rp {calculateTotalPrice().toFixed(2)}
              </span>
            </p>
          </div>

          {/* Tombol Pembayaran */}
          <div className="text-right">
            <button
              onClick={handleCheckout}
              className="sm:max-w-80 w-full py-3 bg-red-500 text-white px-6 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 transition-colors">
              Lanjutkan Pembayaran
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
