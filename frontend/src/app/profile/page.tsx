'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { uploadImage } from '@/services/upload';

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const router = useRouter();

  // 🔒 Proteção de rota
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // 🚪 Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user'); // 👈 se você estiver salvando no localStorage
    router.push('/');
  };

  if (!user) return null;

  return (
    <>
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
        <p className='text-sm text-purple-300'>{user.email}</p>
      </div>

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

      {/* BOTÃO LOGOUT */}
      <div className='mt-6 pl-10' style={{ paddingLeft: 40 }}>
        <button
          onClick={handleLogout}
          className='cursor-pointer rounded-md bg-red-600 text-white hover:bg-red-700'
          style={{ padding: 5 }}
        >
          Sair da conta
        </button>
      </div>
    </>
  );
}
