"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { Trash2, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

interface Product {
  name: string;
  price: number;
  image: string;
  description?: string;
}

interface CartItem {
  _id: string;
  productId: string;
  quantity: number;
  product: Product | null;
}

interface CartSummary {
  totalItems: number;
  totalQuantity: number;
  totalValue: number;
}

export default function CartPage() {
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
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
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
      setError(error instanceof Error ? error.message : "An unexpected error occurred");
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
      const res = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: user.id, 
          productId 
        })
      });

      if (!res.ok) {
        throw new Error('Failed to remove item');
      }

      setCart(prevCart => {
        if (!prevCart) return null;
        return {
          ...prevCart,
          items: prevCart.items.filter(item => item.productId !== productId)
        };
      });

    } catch (error) {
      console.error('Error removing item:', error);
      setError(error instanceof Error ? error.message : "Failed to remove item");
    
    }

  };

  const handleQuantityChange = async (productId: string, quantity: number) => {

    if (!user?.id || quantity < 1) return;

    try {
      const res = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: user.id, 
          productId, 
          quantity 
        })
      });

      if (!res.ok) {
        throw new Error('Failed to update quantity');
      }

      setCart(prevCart => {
        if (!prevCart) return null;
        return {
          ...prevCart,
          items: prevCart.items.map(item => 
            item.productId === productId 
              ? { ...item, quantity } 
              : item
          )
        };
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
      setError(error instanceof Error ? error.message : "Failed to update quantity");
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
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Ulangi Lagi
        </button>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="text-center p-6">
        <ShoppingCart className="mx-auto mb-4" size={48} />
        <h1 className="text-2xl mb-2">Your cart is empty</h1>
        <p className="text-gray-600">Looks like you haven't added any items yet.</p>
        <Link href="/">
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Lanjutkan Belanja
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <ShoppingCart className="mr-3" /> My Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {cart.items.map((item) => (
            <div 
              key={item.productId} 
              className="flex items-center border-b py-4 hover:bg-gray-50 transition-colors"
            >
              <img 
                src={item.product?.image || "placeholder.jpg"} 
                alt={item.product?.name || "Product Image"} 
                className="w-24 h-24 object-cover rounded mr-4"
              />

              <div className="flex-grow">
                <h2 className="text-xl font-semibold">
                  {item.product?.name || "Unknown Product"}
                </h2>
                <p className="text-gray-600">
                  Rp {item.product?.price || "N/A"}
                </p>
              </div>

              <div className="flex items-center mr-4">
                <button 
                  onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                  className="bg-gray-200 p-2 rounded-l"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 border-y">{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                  className="bg-gray-200 p-2 rounded-r"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button 
                onClick={() => handleRemoveItem(item.productId)}
                className="text-red-500 hover:bg-red-50 p-2 rounded"
              >
                <Trash2 />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Ringkasan Pemesanan</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Jumlah Items</span>
              <span>{cart.items.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Jumlah Kuantitas</span>
              <span>
                {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total Harga</span>
              <span>Rp {calculateTotalPrice().toFixed(2)}</span>
            </div>
          </div>
          <Link href="/checkout">
            <button className="w-full mt-6 bg-green-500 text-white py-3 rounded hover:bg-green-600 transition-colors">
              Lanjutkan Ke Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}