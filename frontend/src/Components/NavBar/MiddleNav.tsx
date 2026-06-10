'use client'

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem } from '@/types';
import { useUser } from '@/context/UserContext';

export default function MiddleNav() {
  const { user, logout } = useUser();

  // 👇 controle do dropdown
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 👇 fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='items-center justify-between border-b border-purple-800' 
         style={{ padding: '20px', paddingInline: '15%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      
      {/* 1. LADO ESQUERDO: LOGO */}
      <Link href="/" className='flex items-center gap-5 hover:opacity-80 transition-opacity'>
        <Image
          src='/logoaccess2.png'
          alt='Access Game Logo'
          width={100}
          height={100}
          priority
        />
        <span className='gradient-text font-anton hidden text-4xl text-purple-200 font-bold sm:inline'>
          AccessGame
        </span>
      </Link>

      {/* --- INÍCIO DO AGRUPAMENTO DA DIREITA --- */}
      <div className="flex items-center gap-10"> 
        
        {/* 3. CARRINHO E PERFIL */}
        <div className='flex items-center gap-5'>
          
          {/* Botão de carrinho */}
          <Link href="/carrinho" className='text-sm rounded border border-[var-(--primary)] hover:bg-white hover:text-black transition hover:border-white ' style={{ paddingInline: '10px', paddingBlock: '3px' }}>
            <i className="bi bi-cart2 text-xl"></i>
          </Link>

          {/* 👇 PERFIL */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <button className='text-sm border border-purple-500 rounded hover:bg-white hover:text-black transition hover:border-white' style={{ padding: '5px 15px' }}>
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className='text-sm border border-purple-500 rounded hover:bg-white hover:text-black transition hover:border-white' style={{ padding: '5px 15px' }}>
                  Cadastro
                </button>
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              
              {/* Avatar */}
              <div
                onClick={() => setOpen(!open)}
                className='w-10 h-10 rounded-full overflow-hidden border border-purple-500 cursor-pointer'
              >
                <Image
                  src={user.avatar || '/default-avatar.png'}
                  alt="User"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-zinc-900 border border-white/10 shadow-lg p-4 z-50">
                  <Link href="/profile" >
                    <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 transition">
                      Perfil
                    </button>
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition"
                  >
                    Sair
                  </button>

                </div>
              )}
            </div>
          )}

        </div>

      </div>
      {/* --- FIM DO AGRUPAMENTO DA DIREITA --- */}

    </div>
  );
}