'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Mod {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export default function AdminModsPage() {
  const [mods, setMods] = useState<Mod[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function loadMods() {
    try {
      const response = await fetch('http://localhost:3001/mods');

      const data = await response.json();

      setMods(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteMod(id: number) {
    if (!window.confirm('Deseja realmente excluir este mod?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');

      await fetch(`http://localhost:3001/mods/${id}`, {
        method: 'DELETE',

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMods((prev) => prev.filter((mod) => mod.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadMods();
  }, []);

  if (loading) {
    return <div className='p-10 text-white'>Carregando...</div>;
  }

  return (
    <main className='mx-auto max-w-6xl p-10'>
      <br />
      <a
        href='/admin/mods/new-mod'
        className='mb-6 inline-block rounded bg-green-600 px-4 py-2 text-white'
      >
        Novo Mod
      </a>
      <br /> <br />
      <h1 className='mb-8 text-4xl font-bold text-white'>Gerenciar Mods</h1>
      <div className='flex flex-col gap-4'>
        {mods.map((mod) => (
          <div key={mod.id} className='flex gap-4 rounded-xl bg-zinc-900 p-4'>
            <img
              src={mod.imageUrl}
              alt={mod.title}
              className='h-32 w-32 rounded-lg object-cover'
            />

            <div className='flex-1'>
              <h2 className='text-2xl font-bold text-white'>{mod.title}</h2>

              <p className='text-zinc-400'>{mod.description}</p>

              <p className='mt-2 text-green-400'>R$ {mod.price}</p>
            </div>

            <button
              onClick={() => router.push(`/admin/mods/edit/${mod.id}`)}
              className='rounded-lg bg-blue-600 px-4 py-2 text-white'
            >
              Editar
            </button>

            <button
              onClick={() => deleteMod(mod.id)}
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
