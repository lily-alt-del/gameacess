'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
}

export default function PerifericosPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch(
        'http://localhost:3001/products/category/PERIFERICOS'
      );

      const data = await response.json();

      setProducts(data);
    }

    loadProducts();
  }, []);

  return (
    <main className="max-w-7xl mx-auto place-self-center" style={{ paddingTop: 30, paddingInline: 50, paddingBottom: 50 }}>
      <h1 className="text-4xl font-bold text-white mb-8">
        Periféricos
      </h1>

      <div className="grid grid-cols-4 gap-6" style={{ paddingTop: 25 }}>
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/perifericos/${product.id}`}
          >
            <div className="cursor-pointer border rounded-xl min-h-78">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="text-center center">
              <h2 className="text-white mt-4 font-bold">
                {product.title}
              </h2>

              <p className="text-blue-500 font-bold">
                R$ {product.price.toFixed(2)}
              </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}