"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const banner = [
  { image: "/img/beauty.png", href: "/categories/beauty-and-care" },
  { image: "/img/fashion.png", href: "/categories/fashion" },
  { image: "/img/sport.png", href: "/categories/sports" },
];

export default function Banners() {
  const [index, setIndex] = useState(0);

  // Geser gambar setiap 10 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % banner.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [banner.length]);

  return (
    <section className="relative">
      <Link href={banner[index].href}>
        <div
          className="relative mx-auto w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[570px]  bg-cover bg-center transition-all duration-700 ease-in-out "
          style={{
            backgroundImage: `url("${banner[index].image}")`,
          }}></div>
      </Link>

      <div className="w-full flex justify-center space-x-4 mt-5">
        {banner.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 hover:scale-150 transition-all duration-300 ease-in-out rounded-full ${
              index === i ? "bg-[#2c3528]" : "bg-gray-300"
            }`}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}></button>
        ))}
      </div>
    </section>
  );
}
