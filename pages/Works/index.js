'use client';
import { useState } from 'react';
import Image from 'next/image';
import './Works.css';

const images = [
  "/1.jpg",
  "/4.jpg",
  "/23.webp",
  "/3.jpg",
  "/5.jpg",
  "/20240612_192624.jpg"
];

export default function Works() {
const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-cool-gray-900 text-white px-4">
      <h2 className="text-3xl font-bold mb-6">Trabajos</h2>
      <ul className="gallery w-full">
        {images.map((src, i) => (
          <li
            key={i}
            className={`gallery__item ${activeIndex === i ? 'touch-zoom' : ''}`}
            onTouchStart={() => setActiveIndex(i)}
            onTouchEnd={() => setTimeout(() => setActiveIndex(null), 300)}
          >
            <Image
              src={src}
              alt={`Trabajo ${i + 1}`}
              width={800}
              height={600}
              className="gallery__img"
            />
          </li>
        ))}
      </ul>

    </div>
  );
}
