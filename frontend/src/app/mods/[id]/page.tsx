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
    <main className="mx-auto max-w-7xl justify-content" style={{ paddingTop: '50px', paddingBottom: '50px', margin: '0 auto' }}>
      <div className='grid md:grid-cols-2 '>
        <div>
          <img
            src={mod.imageUrl}
            alt={mod.title}
            className='w-full rounded-xl'
            style={{ height: 450, width: 450 }}
          />
        </div>

        <div className='flex flex-col justify-between'>
          <div>
          <h1 className='text-4xl font-bold text-white'>{mod.title}</h1>
          <br />
          <p className='text-zinc-300'>{mod.description}</p>
          </div>
          <div>
          <p className='text-3xl font-bold text-blue-500'>
            R$ {mod.price.toFixed(2)}
          </p>
          <br />
          <div className='mt-4 flex gap-4'>
            <button 
            onClick={addToCart}
            className='text-md border border-purple-500 rounded hover:bg-white hover:text-black transition hover:border-white cursor-pointer' style={{ padding: 8 }}>
              Adicionar ao Carrinho
            </button>

            <button className='text-md border text-blue-500 border-blue-500 rounded hover:bg-blue-500 hover:text-[#0f0a1b] transition hover:border-blue-500 cursor-pointer' style={{ padding: 8 }}>
              Comprar Agora
            </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
