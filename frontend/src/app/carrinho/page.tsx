import React from 'react';

// Mock de itens para visualização (depois virão do backend)
const itensMock = [
  { id: 1, nome: "Controle Adaptativo Pro", preco: 349.90, quantidade: 1, imagem: "/assets/integrantes/icon.png" },
  { id: 2, nome: "Cabo Adaptador USB-C", preco: 59.90, quantidade: 2, imagem: "/assets/integrantes/icon.png" },
  { id: 3, nome: "Mod de Acessibilidade p/ Jogo X", preco: 29.90, quantidade: 1, imagem: "/assets/integrantes/icon.png" },
];

export default function MeuCarrinho() {
  const subtotal = itensMock.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  return (
    <div className="w-full min-h-screen bg-black text-white font-sans selection:bg-purple-500">
      
{/* Container Centralizador */}
      <div className="flex flex-col items-center w-full pt-20 md:pt-32 pb-20 px-6">
        <div className="w-full max-w-6xl">
          
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-12 tracking-tight">
            Meu <span className="text-purple-500">Carrinho</span>
          </h1>

          {/* Layout de duas colunas: Itens e Resumo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* COLUNA 1: LISTA DE ITENS (Ocupa 2 colunas no desktop) */}
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold uppercase mb-6 flex items-center gap-3">
                 <i className="bi bi-cart2 text-purple-400"></i>
                 Produtos no seu pedido
              </h2>

              {itensMock.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 p-6 bg-zinc-950 rounded-xl border border-zinc-900 group hover:border-zinc-700 transition-colors">
                  {/* Imagem do Produto */}
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border border-zinc-800 shrink-0 shadow-lg">
                    <img src={item.imagem} alt={item.nome} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Detalhes do Produto */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors">{item.nome}</h3>
                    <p className="text-zinc-500 italic text-sm md:text-base mt-1">Preço unitário: <span className='text-zinc-300'>R$ {item.preco.toFixed(2)}</span></p>
                  </div>
                  
                  {/* Quantidade e Preço Total do Item */}
                  <div className="flex flex-col items-center gap-3 md:items-end">
                    <div className="flex items-center gap-3 text-lg border border-zinc-800 rounded-full px-4 py-1">
                      <button className="text-purple-500 hover:text-purple-300">-</button>
                      <span className="font-bold text-white">{item.quantidade}</span>
                      <button className="text-purple-500 hover:text-purple-300">+</button>
                    </div>
                    <p className="text-2xl font-bold text-white">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
                  </div>

                  {/* Botão Remover (Visual) */}
                  <button className="text-zinc-600 hover:text-red-500 transition-colors">
                    <i className="bi bi-trash-fill text-xl"></i>
                  </button>
                </div>
              ))}
            </div>

            {/* COLUNA 2: RESUMO DO PEDIDO (Ocupa 1 coluna no desktop) */}
            <div className="space-y-8">
                <div className="sticky top-48 p-8 bg-zinc-950 rounded-xl border border-purple-900/40 shadow-2xl">
                    <h2 className="text-2xl font-bold uppercase mb-8 pb-4 border-b border-zinc-800">
                        Resumo do Pedido
                    </h2>
                    
                    <div className="space-y-4 text-zinc-300 text-lg">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-bold text-white">R$ {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Frete</span>
                            <span className="font-bold text-white">Calculando...</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Desconto</span>
                            <span className="font-bold text-green-400">R$ 0,00</span>
                        </div>
                    </div>

                    <div className="h-px bg-zinc-800 my-8"></div>

                    <div className="flex justify-between text-2xl font-black uppercase text-white mb-10">
                        <span>Total</span>
                        <span className="text-3xl text-purple-400">R$ {subtotal.toFixed(2)}</span>
                    </div>

                    <button className="w-full text-center text-xl font-bold uppercase py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300 shadow-xl selection:bg-black">
                        Finalizar Compra
                    </button>
                    <button className="w-full text-center text-sm font-semibold italic text-zinc-500 mt-6 hover:text-purple-300 transition-colors">
                        Continuar Comprando
                    </button>
                </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}