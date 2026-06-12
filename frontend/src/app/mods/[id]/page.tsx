'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Mod {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export default function ModPage() {
  const params = useParams();

  const [mod, setMod] = useState<Mod | null>(null);

  useEffect(() => {
    async function loadMod() {
      const response = await fetch(`http://localhost:3001/mods/${params.id}`);

      const data = await response.json();

      setMod(data);
    }

    loadMod();
  }, [params.id]);

  if (!mod) {
    return <div className='p-10 text-white'>Carregando...</div>;
  }

  async function addToCart() {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Faça login para adicionar itens ao carrinho');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/cart/${mod?.id}`, 
      {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error();
      }

      alert('Item adicionado ao carrinho!');
    } catch {
      alert('Erro ao adicionar item');
    }
  }

  return (
    <main className='mx-auto max-w-7xl p-10'>
      <div className='grid gap-10 md:grid-cols-2'>
        <div>
          <img
            src={mod.imageUrl}
            alt={mod.title}
            className='w-full rounded-xl'
          />
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-4xl font-bold text-white'>{mod.title}</h1>

          <p className='text-zinc-300'>{mod.description}</p>

          <p className='text-3xl font-bold text-green-400'>
            R$ {mod.price.toFixed(2)}
          </p>

          <div className='mt-4 flex gap-4'>
            <button 
            onClick={addToCart}
            className='rounded-lg bg-purple-600 px-6 py-3'>
              Adicionar ao Carrinho
            </button>

            <button className='rounded-lg bg-green-600 px-6 py-3'>
              Comprar Agora
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
