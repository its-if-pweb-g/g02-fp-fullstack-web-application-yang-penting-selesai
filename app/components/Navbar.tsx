"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, User, Search, ShoppingBag } from "lucide-react";

const NAV_LINKS = [
  { href: "/categories/all", label: "All" },
  { href: "/categories/electronics", label: "Electronics" },
  { href: "/categories/fashion", label: "Fashion" },
  { href: "/categories/sports", label: "Sports" },
  { href: "/categories/beauty-and-care", label: "Beauty & Care" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Mencari:", searchQuery);
    }
  };

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
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#bade57] transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
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
        </form>

        <div className="md:flex items-center space-x-6 ">
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative hover:text-[#bade57]">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1.5 py-0.5">
                0
              </span>
            </Link>

            <Link
              href="/auth/login"
              className="hidden md:block hover:text-[#bade57]">
              <User size={24} />
            </Link>

            <button onClick={toggleMenu} className="md:hidden ">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

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
                key={link.href}
                href={link.href}
                className="block py-2 px-6  rounded"
                onClick={toggleMenu}>
                {link.label}
              </Link>
            ))}

            <Link
              href="/login"
              className="block py-2 px-6  rounded"
              onClick={toggleMenu}>
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
