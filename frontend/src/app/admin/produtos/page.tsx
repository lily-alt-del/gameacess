'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function loadProducts() {
    try {
      const response = await fetch('http://localhost:3001/products');

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct(id: number) {
    if (!window.confirm('Deseja realmente excluir este produto?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');

      await fetch(`http://localhost:3001/products/${id}`, {
        method: 'DELETE',

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) {
    return <div className='p-10 text-white'>Carregando...</div>;
  }

  return (
    <main className='mx-auto max-w-6xl p-10'>
      <a
        href='/admin/produtos/new-products'
        className='mb-6 inline-block rounded bg-green-600 px-4 py-2 text-white'
      >
        Novo Produto
      </a>

      <h1 className='mb-8 text-4xl font-bold text-white'>Gerenciar Produtos</h1>

      <div className='flex flex-col gap-4'>
        {products.map((product) => (
          <div
            key={product.id}
            className='flex gap-4 rounded-xl bg-zinc-900 p-4'
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className='h-32 w-32 rounded-lg object-cover'
            />

            <div className='flex-1'>
              <h2 className='text-2xl font-bold text-white'>{product.title}</h2>

              <p className='text-zinc-400'>{product.category}</p>

              <p className='text-zinc-400'>Estoque: {product.stock}</p>

              <p className='mt-2 text-green-400'>R$ {product.price}</p>
            </div>

            <button
              onClick={() => router.push(`/admin/produtos/edit/${product.id}`)}
              className='rounded-lg bg-blue-600 px-4 py-2 text-white'
            >
              Editar
            </button>

            <button
              onClick={() => deleteProduct(product.id)}
              className='rounded-lg bg-red-600 px-4 py-2 text-white'
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
