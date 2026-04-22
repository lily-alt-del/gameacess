'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem } from '@/types';

// Nota: Você tem uma interface HeaderProps definida, mas não está usando no componente. 
// Mantive para não quebrar seu arquivo, mas o ideal é passar as props se for usar.

export default function MiddleNav() {
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
        />
        <span className='gradient-text font-anton hidden text-4xl font-anton text-purple-200 font-bold sm:inline'>
          AccessGame
        </span>
      </Link>

      {/* --- INÍCIO DO AGRUPAMENTO DA DIREITA --- */}
      <div className="flex items-center gap-10"> 
        
        {/* 2. MENU DROPDOWN (Agora dentro do grupo da direita) */}
        <div className="relative group">
          <button className="text-white hover:text-[#a855f7] transition-colors flex items-center gap-2 py-2 font-sans text-lg">
            Produtos
            <i className="bi bi-chevron-down text-sm transition-transform duration-300 group-hover:rotate-180"></i>
          </button>

          <div className="absolute left-0 top-full mt-1 w-56 bg-[#0f0a1b] border border-zinc-800 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
            <div className="flex flex-col">
              <Link href="/produtos/camisetas" className="text-zinc-300 hover:text-white hover:bg-zinc-800/50 px-5 py-3 transition-colors border-b border-zinc-800/50 flex items-center gap-3">
                <i className="bi bi-person-bounding-box text-purple-500"></i>
                Camisetas
              </Link>
              <Link href="/produtos/moletons" className="text-zinc-300 hover:text-white hover:bg-zinc-800/50 px-5 py-3 transition-colors border-b border-zinc-800/50 flex items-center gap-3">
                <i className="bi bi-layers text-purple-500"></i>
                Moletons
              </Link>
              <Link href="/produtos/perifericos" className="text-zinc-300 hover:text-white hover:bg-zinc-800/50 px-5 py-3 transition-colors border-b border-zinc-800/50 flex items-center gap-3">
                <i className="bi bi-mouse text-purple-500"></i>
                Periféricos
              </Link>
              <Link href="/produtos/colecionaveis" className="text-zinc-300 hover:text-white hover:bg-zinc-800/50 px-5 py-3 transition-colors flex items-center gap-3">
                <i className="bi bi-box-seam text-purple-500"></i>
                Colecionáveis
              </Link>
            </div>
          </div>
        </div>

        {/* 3. CARRINHO E PERFIL */}
        <div className='flex items-center gap-5'>
          <Link href="/carrinho" className='text-white flex justify-center rounded-xl w-10 h-10 items-center hover:bg-(--prim-light)'>
            <i className="bi bi-cart2 text-2xl"></i>
          </Link>
          <button className='text-white rounded-xl w-10 h-10 items-center hover:bg-(--prim-light)'>
            <i className="bi bi-person text-2xl"></i>
          </button>
        </div>

      </div>
      {/* --- FIM DO AGRUPAMENTO DA DIREITA --- */}

    </div>
  );
}