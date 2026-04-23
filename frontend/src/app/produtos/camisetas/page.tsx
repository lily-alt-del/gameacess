'use client'

import React from 'react';

const camisetas = [
  { id: 1, nome: "Camiseta Dinossauro", preco: "R$55,95", imagem: "/camisetas/dino.png" },
  { id: 2, nome: "Camiseta Pacman", preco: "R$65,99", imagem: "/camisetas/pacman.png" },
  { id: 3, nome: "Camiseta Bowser", preco: "R$45,98", imagem: "/camisetas/bowser.png" },
  { id: 4, nome: "Camiseta Tetris", preco: "R$26,98", imagem: "/camisetas/tetris.png" },
  { id: 5, nome: "Camiseta DonkeyKong", preco: "R$44,00", imagem: "/camisetas/dk.png" },
  { id: 6, nome: "Camiseta Sonic", preco: "R$15,99", imagem: "/camisetas/sonic.png" },
  { id: 7, nome: "Camiseta Fortnite", preco: "R$15,99", imagem: "/camisetas/fortnite.png" },
  { id: 8, nome: "Camiseta Ordem Paranormal", preco: "R$25,45", imagem: "/camisetas/ordem.png" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0a1b] py-16" style={{ paddingInline: '15%' }}>
      <h1 className="text-5xl font-anton uppercase mb-12 tracking-wider text-white">
        Camisetas
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-14">
        {camisetas.map((item) => (
          <div key={item.id} className="group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
            <div className="bg-white rounded-lg aspect-square flex items-center justify-center mb-5 overflow-hidden">
              <img 
                src={item.imagem} 
                alt={item.nome} 
                className="w-full h-full object-cover"
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
