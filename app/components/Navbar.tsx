'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ShoppingCart, 
  Menu, 
  X, 
  User, 
  Search 
} from 'lucide-react'

const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/products', label: 'Produk' },
  { href: '/categories', label: 'Kategori' },
  { href: '/promo', label: 'Promo' }
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Mencari:', searchQuery)
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">

        <Link href="/" className="text-2xl font-bold text-blue-600">
          TokoKu
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-4">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="text-gray-800 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <form onSubmit={handleSearch} className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Cari produk..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-3 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="absolute right-3">
              <Search size={18} className="text-gray-500" />
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <Link 
            href="/cart" 
            className="relative hover:text-blue-600"
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
              0
            </span>
          </Link>

          <Link 
            href="/login" 
            className="hidden md:block hover:text-blue-600"
          >
            <User size={24} />
          </Link>

          <button 
            onClick={toggleMenu} 
            className="md:hidden text-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  placeholder="Cari produk..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="block py-2 text-gray-800 hover:bg-gray-100 rounded"
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}

            <Link 
              href="/login" 
              className="block py-2 text-gray-800 hover:bg-gray-100 rounded"
              onClick={toggleMenu}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}