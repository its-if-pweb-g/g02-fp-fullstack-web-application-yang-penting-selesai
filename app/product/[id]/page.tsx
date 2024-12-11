"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductImageGallery from "./ProductImageGallery";
import ProductDescription from "./ProductDescription";
import { Product } from "../../components/ProductCard";

export default function ProductDetailPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartCount, setCartCount] = useState<number>(0);
  const { id } = useParams();
  const router = useRouter();
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

  const selectedProduct = productList.find((product) => product._id === id);

  const handleAddToCart = () => {
    if (selectedProduct) {
      setCart((prevCart) => [...prevCart, selectedProduct]);
      setCartCount((prevCount) => prevCount + 1);
      alert(`✅ ${selectedProduct.name} berhasil ditambahkan ke keranjang!`);
    }
  };

  const handleCheckout = () => {
    alert("🔗 Melanjutkan ke proses pembayaran...");
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Galeri Gambar Produk */}
        <div className="md:col-span-1">
          <ProductImageGallery images={selectedProduct?.image ?? ""} />
        </div>

        {/* Informasi Produk */}
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold text-gray-900">
            {selectedProduct?.name ?? "Nama Produk Tidak Tersedia"}
          </h1>
          <p className="text-gray-600 mb-4">
            {selectedProduct?.category ?? "Kategori Tidak Tersedia"}
          </p>

          {/* Harga Produk */}
          <div className="mb-4">
            {selectedProduct?.discountPercentage ? (
              <>
                <span className="text-lg font-bold text-red-500">
                  Rp{" "}
                  {(
                    selectedProduct?.price *
                    (1 - selectedProduct?.discountPercentage / 100)
                  ).toLocaleString("id-ID")}
                </span>
                <span className="text-sm text-gray-400 line-through ml-2">
                  Rp {selectedProduct?.price.toLocaleString("id-ID")}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">
                Rp {selectedProduct?.price.toLocaleString("id-ID")}
              </span>
            )}
          </div>

          {/* Deskripsi Produk */}
          <ProductDescription
            description={selectedProduct?.description ?? ""}
          />

          {/* Tombol Aksi */}
          <div className="mt-6 space-x-4 text-sm ">
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
