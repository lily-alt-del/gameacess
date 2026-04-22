'use client'

import React from 'react';

const camisetas = [
  { id: 1, nome: "Camisa Dinossauro (sem conexão)", preco: "R$55,95", imagem: "https://m.media-amazon.com/images/I/51pWp7Yp-FL._AC_UX679_.jpg" },
  { id: 2, nome: "Camisa Pacman", preco: "R$65,99", imagem: "https://m.media-amazon.com/images/I/61m6-fK-G0L._AC_UX679_.jpg" },
  { id: 3, nome: "Camisa Bowser", preco: "R$45,98", imagem: "https://m.media-amazon.com/images/I/61W2m6S87FL._AC_UX679_.jpg" },
  { id: 4, nome: "Camisa Tetris", preco: "R$26,98", imagem: "https://m.media-amazon.com/images/I/71Yv8v7Z-iL._AC_UX679_.jpg" },
  { id: 5, nome: "Camisa DonkeyKong", preco: "R$44,00", imagem: "https://m.media-amazon.com/images/I/61-8uXvX7PL._AC_UX679_.jpg" },
  { id: 6, nome: "Camisa Sonic", preco: "R$15,99", imagem: "https://m.media-amazon.com/images/I/61XpY8-pZFL._AC_UX679_.jpg" },
  { id: 7, nome: "Camisa Fortnite", preco: "R$15,99", imagem: "https://m.media-amazon.com/images/I/51v8z8z8z8L._AC_UX679_.jpg" },
  { id: 8, nome: "Camisa Ordem Paranormal", preco: "R$25,45", imagem: "https://m.media-amazon.com/images/I/71z8z8z8z8L._AC_UX679_.jpg" },
];

export default function CamisetasPage() {
  return (
    <div className="min-h-screen bg-[#0f0a1b] py-16" style={{ paddingInline: '15%' }}>
      <h1 className="text-5xl font-anton uppercase mb-12 tracking-wider text-white">
        Camisetas
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-14">
        {camisetas.map((item) => (
          <div key={item.id} className="group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
            <div className="bg-white rounded-lg aspect-square flex items-center justify-center p-4 mb-5 overflow-hidden">
              <img 
                src={item.imagem} 
                alt={item.nome} 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <h3 className="text-zinc-300 text-lg font-medium leading-tight mb-2 group-hover:text-white transition-colors">
              {item.nome}
            </h3>
            <p className="text-white font-bold text-xl">
              {item.preco}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
