'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
}

export default function RoupasPage() {
  const params = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [isInCart, setIsInCart] = useState(false);

  async function checkIfInCart(productId: number) {
    const token = localStorage.getItem('token');

    if (!token) return;

    try {
      const response = await fetch('http://localhost:3001/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const cart = await response.json();

      const exists = cart.items.some((item: any) => item.productId === productId);

      setIsInCart(exists);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function loadProduct() {
      const response = await fetch(`http://localhost:3001/products/${params.id}`);

      const data = await response.json();

      setProduct(data);

      checkIfInCart(data.id);
    }

    loadProduct();
  }, [params.id]);

  if (!product) {
    return <div className='p-10 text-white'>Carregando...</div>;
  }

  async function addToCart() {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Faça login para adicionar itens ao carrinho');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/cart/product/${product?.id}`, {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      alert('Item adicionado ao carrinho!');
      setIsInCart(true);
    } catch {
      alert('Erro ao adicionar item');
    }
  }

  return (
    <main
      className='justify-content mx-auto max-w-7xl'
      style={{ paddingTop: '50px', paddingBottom: '50px', margin: '0 auto' }}
    >
      <div className='grid md:grid-cols-2'>
        <div>
          <img
            src={product.imageUrl}
            alt={product.title}
            className='w-full rounded-xl'
            style={{ height: 450, width: 450 }}
          />
        </div>

        <div className='flex flex-col justify-between'>
          <div>
            <h1 className='text-4xl font-bold text-white'>{product.title}</h1>
            <br />
            <p className='text-zinc-300'>{product.description}</p>
          </div>
          <div>
            <p className='text-3xl font-bold text-blue-500'>
              R$ {product.price.toFixed(2)}
            </p>
            <br />
            <div className='mt-4 flex gap-4'>
              <button
                onClick={addToCart}
                disabled={isInCart}
                className={`text-md rounded border transition ${
                  isInCart
                    ? 'cursor-not-allowed border-zinc-500 text-zinc-500'
                    : 'cursor-pointer border-purple-500 hover:border-white hover:bg-white hover:text-black'
                }`}
                style={{ padding: 8 }}
              >
                {isInCart ? 'Adicionado ao Carrinho' : 'Adicionar ao Carrinho'}
              </button>

              <button
                className='text-md cursor-pointer rounded border border-blue-500 text-blue-500 transition hover:border-blue-500 hover:bg-blue-500 hover:text-[#0f0a1b]'
                style={{ padding: 8 }}
              >
                Comprar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
