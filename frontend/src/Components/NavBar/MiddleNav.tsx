'use client'

import { useState } from 'react';
import Image from 'next/image';
import { CartItem } from '@/types';

interface HeaderProps {
  cartItems: CartItem[]
  onRemoveFromCart: (id: number) => void
  onUpdateQuantity: (id: number, quantity: number) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function MiddleNav() {
  
  return (
    <div className='items-center justify-between border-b border-purple-800' style={{ padding: '20px', paddingInline: '15%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* LOGO */}
      <div className='flex items-center gap-5'>
        {/* Logo image */}
        <Image
          src='/logoaccess2.png'
          alt='Access Game Logo'
          width={100}
          height={100}
        />
        {/* Logotipo */}
        <span className='gradient-text font-anton hidden text-4xl font-anton text-purple-200 font-bold sm:inline'>
          AccessGame
        </span>
      </div>
      {/* CARRINHO E PERFIL */}
      <div className='flex items-center gap-5' style={{ paddingRight: '30px' }}>
          {/* Ícone de carrinho */}
          <button className=' text-white rounded-xl w-10 h-10 items-center hover:bg-(--prim-light) '>
            <i className="bi bi-cart2 text-2xl"></i>
          </button>
          {/* Ícone de perfil */}
          <button className=' text-white rounded-xl w-10 h-10 items-center hover:bg-(--prim-light) '>
            <i className="bi bi-person text-2xl"></i>
          </button>
      </div>
      
    </div>
  );
}
