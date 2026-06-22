'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
import { uploadImage } from '@/services/upload';

export default function ProfilePage() {
  const { user, setUser, loading } = useUser();
  const router = useRouter();
  const [recommendedMods, setRecommendedMods] = useState([]);

  // 🔒 Proteção de rota
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  useEffect(() => {
    loadRecommended();
  }, []);

  async function loadRecommended() {
    try {
      const response = await fetch('http://localhost:3001/mods');

      if (!response.ok) {
        throw new Error(`Erro ${response.status}`);
      }

      const data = await response.json();

      setRecommendedMods(data.slice(0, 4));
    } catch (error) {
      console.error('Erro ao carregar recomendações:', error);
    }
  }

  // 🚪 Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // 👈 se você estiver salvando no localStorage
    router.push('/');
  };

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        Carregando...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className='min-h-207.5'>
      {/* HEADER */}
      <div className='flex h-[150] items-center border-b-4 border-purple-500 bg-purple-900 px-5 text-3xl text-purple-950'>
        <Link href='/'>
          <i className='bi bi-arrow-left text-purple-950'></i>
        </Link>
      </div>

      {/* AVATAR */}
      <div style={{ marginTop: -50, paddingLeft: 50 }}>
        <div className='h-[100] w-[100] overflow-hidden rounded-full border-4 border-purple-500 bg-purple-600'>
          <Image
            src={user.avatar || '/default-avatar.png'}
            alt='Avatar'
            width={100}
            height={100}
            className='h-full w-full object-cover'
          />
        </div>
      </div>

      {/* INFO */}
      <div className='mt-3 pl-10' style={{ paddingLeft: 40, marginBottom: 30 }}>
        <h1 className='text-2xl font-bold text-white'>{user.name}</h1>
        <p className='mt-1 text-sm text-zinc-400'>
          {user.pronouns || 'Sem pronomes'}
        </p>
        <p className='mt-3 max-w-2xl text-zinc-300'>
          {user.bio || 'Nenhuma descrição adicionada.'}
        </p>
      </div>

      {/* BOTÃO ADMIN - APENAS PARA ADMINISTRADORES */}
      {user?.role === 'ADMIN' && (
        <Link href='/admin' style={{ padding: 40 }}>
          <button className='cursor-pointer rounded-md border  text-white transition hover:bg-zinc-300 hover:text-purple-950'
            style={{ padding: 5 }}>
            Painel Administrativo
          </button>
        </Link>
      )}

      {/* BOTÃO EDITAR PERFIL */}
      <div className='mt-6 pl-10' style={{ paddingLeft: 40 }}>
        <Link href='/profile/edit'>
          <button
            className='cursor-pointer rounded-md bg-purple-600 text-white transition hover:bg-purple-700'
            style={{ padding: 5 }}
          >
            Editar perfil
          </button>
        </Link>
      </div>

      {/* BOTÃO CARRINHO */}
      <div className='mt-4' style={{ paddingLeft: 40 }}>
        <Link href='/carrinho'>
          <button
            className='cursor-pointer rounded-md bg-blue-600 text-white hover:bg-blue-700'
            style={{ padding: 5 }}
          >
            Ver Carrinho
          </button>
        </Link>
      </div>

      {/* BOTÃO LOGOUT */}
      <div className='mt-6' style={{ paddingLeft: 40 }}>
        <button
          onClick={handleLogout}
          className='cursor-pointer rounded-md bg-red-600 text-white hover:bg-red-700'
          style={{ padding: 5 }}
        >
          Sair da conta
        </button>
      </div>
      <br />
      <hr />

      <div className='mt-12 px-10 place-self-center' style={{ paddingLeft: 40}}>
        <h2 className='mb-6 text-3xl font-bold text-white' style={{ paddingBlock:40}}>Recomendados</h2>

        <div className='grid gap-8 grid-cols-4' style={{ paddingBottom: 50 }}>
          {recommendedMods.map((mod: any) => (
            <Link key={mod.id} href={`/mods/${mod.id}`}>
              <div className=" rounded-lg overflow-hidden group-hover:border-purple-500 group-hover:border-4 transition duration-300" style={{  }}>
                <img
                  src={mod.imageUrl}
                  alt={mod.title}
                  style={{ width: 300, height: 300 }}
                />

                <h3 className='mt-2 text-sm text-white'>{mod.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
