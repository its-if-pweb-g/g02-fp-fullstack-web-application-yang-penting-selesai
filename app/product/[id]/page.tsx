"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductImageGallery from "./ProductImageGallery";
import ProductDescription from "./ProductDescription";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category?: string;
  rating?: number;
  discountPercentage?: number;
}

const MOCK_PRODUCT: Product = {
  id: 1,
  name: "Contoh Produk",
  price: 100000,
  image: "/example-product.jpg",
  description: "Deskripsi lengkap untuk produk ini.",
  category: "Kategori",
  rating: 4.5,
  discountPercentage: 20,
};

export default function ProductDetailPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const router = useRouter();

  const handleAddToCart = () => {
    setCart((prevCart) => [...prevCart, MOCK_PRODUCT]);
    alert(`✅ ${MOCK_PRODUCT.name} berhasil ditambahkan ke keranjang!`);
  };

  const handleCheckout = () => {
    alert("🔗 Melanjutkan ke proses pembayaran...");
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galeri Gambar Produk */}
        <ProductImageGallery images={[MOCK_PRODUCT.image]} />

        {/* Informasi Produk */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {MOCK_PRODUCT.name}
          </h1>
          <p className="text-gray-600 mb-4">{MOCK_PRODUCT.category}</p>

          {/* Harga Produk */}
          <div className="mb-4">
            {MOCK_PRODUCT.discountPercentage ? (
              <>
                <span className="text-lg font-bold text-red-500">
                  Rp{" "}
                  {(
                    MOCK_PRODUCT.price *
                    (1 - MOCK_PRODUCT.discountPercentage / 100)
                  ).toLocaleString("id-ID")}
                </span>
                <span className="text-sm text-gray-400 line-through ml-2">
                  Rp {MOCK_PRODUCT.price.toLocaleString("id-ID")}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">
                Rp {MOCK_PRODUCT.price.toLocaleString("id-ID")}
              </span>
            )}
          </div>

          {/* Deskripsi Produk */}
          <ProductDescription description={MOCK_PRODUCT.description} />

          {/* Tombol Aksi */}
          <div className="mt-6 space-x-4 text-sm">
            <button
              onClick={handleAddToCart}
              className="bg-[#76ac38] text-white px-6 py-2 rounded-md hover:bg-lime-700 focus:ring-2 focus:ring-[#659330] transition-colors">
              Tambah ke Keranjang
            </button>
            <button
              onClick={handleCheckout}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 transition-colors">
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
