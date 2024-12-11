"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { products } from "../data/Products";
import { Product } from "./ProductCard";
import {
  ShoppingCart,
  Menu,
  X,
  User,
  Search,
  ShoppingBag,
  SearchCheck,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/category", label: "All" },
  { href: "/category", label: "Electronics" },
  { href: "/category", label: "Fashion" },
  { href: "/category", label: "Sports" },
  { href: "/category", label: "Beauty & Care" },
];

export default function Navbar() {
  const router = useRouter();

  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthIconClick, setIsAuthIconClick] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [filterProductList, setFilterProductList] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsScrolled(scrollPosition > windowHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProductList(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
    }
  };

  const handleAuthIconClick = () => {
    setIsAuthIconClick((prev) => !prev);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Mencari:", searchQuery);
    }
  };

  useEffect(() => {
    const filteredProducts = productList.filter((product) => {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilterProductList(filteredProducts);
    setSelectedIndex(-1);
  }, [searchQuery, products]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          prevIndex < filterProductList.length - 1 ? prevIndex + 1 : prevIndex
        );
        event.preventDefault();
      } else if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
        event.preventDefault();
      } else if (event.key === "Enter") {
        if (selectedIndex >= 0) {
          const selectedManga = filterProductList[selectedIndex];
          window.location.href = `/product/${selectedManga._id}`;
        }
      }
    },
    [filterProductList, selectedIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <header
      className={`sticky top-0 z-50 text-sm shadow-md transition-colors duration-300 ${
        isScrolled ? "bg-white text-black " : "bg-[#1A1A19] text-white"
      }`}>
      <nav className="container mx-auto px-10 py-3 flex justify-between items-center">
        <div className="md:flex items-center space-x-6">
          <Link
            href="/"
            className="flex flex-row text-2xl font-bold items-center">
            <ShoppingBag size={24} className="mr-1" />
            TokoKu
          </Link>
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex space-x-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#bade57] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="hidden md:flex relative items-center w-full max-w-12 md:max-w-60 lg:max-w-sm xl:max-w-lg ">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`text-black flex-grow pl-3 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#bade57] transition-colors duration-300 ${
              isScrolled ? "bg-white text-black" : "bg-[#1A1A19] text-white"
            }`}
          />
          <button type="submit" className="absolute right-3">
            <Search size={18} className="text-gray-500" />
          </button>

          {searchQuery && (
            <div
              className={`hidden md:flex flex-col my-7 absolute top-10 z-10 border-[1px] shadow-md ${
                isScrolled ? "bg-white text-black" : "bg-[#1A1A19] text-white"
              } rounded-md  w-full max-w-12 md:max-w-60 lg:max-w-sm xl:max-w-lg translate-y-[-10px] transition-opacity duration-300 ease-in `}>
              {filterProductList.map((product, index) => (
                <Link
                  key={product._id}
                  href={`/product/${product._id}`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => setSearchQuery("")}
                  className={`hover:text-[#bade57] hover:${
                    isScrolled ? "bg-zinc-50" : "bg-[#1A1A19]"
                  } ${
                    selectedIndex === index ? "text-[#bade57]" : ""
                  }  p-[10px] m-0 cursor-pointer transition-colors duration-300`}>
                  <div className="flex space-x-2">
                    <Search size={18} className="text-gray-400" />
                    <p className="text-sm">{product.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </form>

        <div className="md:flex items-center space-x-6 ">
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative hover:text-[#bade57]">
              <ShoppingCart size={24} />
              {/* <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1.5 py-0.5">
                {cartCount}
              </span> */}
            </Link>

            <button
              className="hidden md:block hover:text-[#bade57]"
              onClick={handleAuthIconClick}>
              <User size={24} />
            </button>

            <button onClick={toggleMenu} className="md:hidden ">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {isAuthIconClick && (
        <div className="hidden w-32 h-min md:flex flex-col text-sm text-black bg-white mt-2 p-4 space-y-4 shadow-lg border rounded-md absolute z-10 right-5">
          <h3 className="font-semibold">Account</h3>
          <Link
            href={isAuthenticated ? "/" : "/auth/login"}
            className="hover:text-[#859F3D] text-left items-center"
            onClick={handleAuth}>
            {isAuthenticated ? "Logout" : "Login"}
          </Link>
        </div>
      )}

      {isMenuOpen && (
        <div className="md:hidden ">
          <div className=" pt-2 pb-4 space-y-2">
            <form onSubmit={handleSearch} className="mb-4 px-4">
              <div className="relative flex items-center ">
                <input
                  type="text"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-3 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#bade57] ${
                    isScrolled
                      ? "bg-white text-black"
                      : "bg-[#1A1A19] text-white"
                  } `}
                />
                <button type="submit" className="absolute right-3">
                  <Search size={18} className="text-gray-500" />
                </button>
              </div>
            </form>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-2 px-6  rounded"
                onClick={toggleMenu}>
                {link.label}
              </Link>
            ))}

            <Link
              href={isAuthenticated ? "/" : "/auth/login"}
              className="block py-2 px-6  rounded"
              onClick={toggleMenu}>
              {isAuthenticated ? "Logout" : "Login"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
