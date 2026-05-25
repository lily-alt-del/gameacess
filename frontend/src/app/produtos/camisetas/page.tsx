'use client'

import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  // Função exclusiva para salvar no Carrinho (Cart)
  const addCart = (product: any) => {
    const stored = localStorage.getItem('cart');
    let cart = stored ? JSON.parse(stored) : [];

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`${product.nome} adicionada ao Carrinho! 🛒`);
  };

  return (
    <div className="min-h-screen bg-[#0f0a1b] py-16" style={{ paddingInline: '15%' }}>
      <h1 className="text-5xl font-anton uppercase mb-12 tracking-wider text-white">
        Camisetas
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-14">
        {camisetas.map((item) => (
          <div key={item.id} className="group cursor-pointer transition-transform duration-300 hover:-translate-y-2">
            
            {/* Container da Imagem com o ícone de carrinho rápido */}
            <div className="relative bg-white rounded-lg aspect-square flex items-center justify-center mb-5 overflow-hidden">
              <img 
                src={item.imagem} 
                alt={item.nome} 
                className="w-full h-full object-cover"
              />
              
              {/* Ícone flutuante de Carrinho Rápido no canto superior direito */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Evita clicar no card por engano
                  addCart(item);
                }}
                className="product-icon absolute top-3 right-3 bg-black/60 hover:bg-black text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 text-lg active:scale-95"
                title="Adicionar ao Carrinho"
              >
                <i className="bi bi-cart3"></i>
              </button>
            </div>

            <h3 className="text-zinc-300 text-lg font-medium leading-tight mb-2 group-hover:text-white transition-colors">
              {item.nome}
            </h3>
            
            <p className="text-white font-bold text-xl mb-4">
              {item.preco}
            </p>

            {/* Botão de compra inferior */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                addCart(item);
              }}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 text-sm active:scale-[0.98]"
            >
              Adicionar ao Carrinho
            </button>

          </div>
        ))}
      </div>

      {/* Alertas do Toastify configurados para o tema dark */}
      <ToastContainer position="top-right" autoClose={1500} theme="dark" />
    </div>
  );
}