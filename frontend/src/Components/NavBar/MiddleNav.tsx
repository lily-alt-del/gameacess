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