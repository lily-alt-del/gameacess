import React from 'react';

const equipe = [
  { id: 1, nome: "ARION PESSIN", descricao: "bla bla bla", imagem: "/integrantes/arion.png" },
  { id: 2, nome: "GABRIEL PASSARI", descricao: "bla bla bla", imagem: "/integrantes/gabriel.png" },
  { id: 3, nome: "HENRIQUE JOSHUA", descricao: "bla bla bla", imagem: "/integrantes/henrique.png" },
  { id: 4, nome: "LILY", descricao: "bla bla bla", imagem: "/integrantes/lily.png" },
  { id: 5, nome: "MARIA EDUARDA", descricao: "bla bla bla", imagem: "/integrantes/maria.png" },
  { id: 6, nome: "SABRINA KAORI", descricao: "bla bla bla", imagem: "/integrantes/sabrina.png" },
];

export default function SobreNos() {
  return (
    <div className="w-full min-h-screen bg-black text-white font-sans">
      <div className="h-12 md:h-12"></div>

      <div className="flex flex-col items-center w-full pb-20 px-6">
        <div className="w-full max-w-4xl">
          
          {/* SEÇÃO 1: JOGAR É PARA TODOS */}
          {/* Adicionamos um mt-10 extra aqui por segurança */}
          <section className="w-full mb-24 mt-10">
            <div className="w-full aspect-video bg-zinc-800 rounded-2xl border border-zinc-700 shadow-2xl mb-12 flex items-center justify-center">
               <span className="text-zinc-500">Placeholder Vídeo / Imagem</span>
            </div>
            
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight tracking-tight">
                Jogar é para todos. <br/>
                <span className="text-purple-500">Sem exceções</span>
              </h1>
              
              <div className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-3xl">
                <p className="mb-6">
                  Na Access Game, acreditamos que a diversidade de jogadores é o que torna a comunidade incrível, mas sabemos que nem todo jogo nasce pronto para todos os controles. Por isso, nosso foco é quebrar barreiras.
                </p>
                <p className="mb-6">
                  Desenvolvemos mods de acessibilidade pensados sob medida para quem precisa de adaptações motoras, visuais ou cognitivas.
                </p>
                <p className="text-white font-bold text-2xl py-6 border-l-4 border-purple-600 pl-8 bg-zinc-900/50 rounded-r-lg">
                  Nossa missão é simples: se você quer jogar, nós damos um jeito.
                </p>
              </div>
              <div className="h-10 md:h-14"></div>
            </div>
          </section>

          {/* SEÇÃO 2: INTEGRANTES */}
          <section className="w-full mt-24">
            <h2 className="text-3xl font-bold uppercase mb-16 flex items-center gap-4">
              Conheça nossos integrantes
              <div className="h-px bg-zinc-800 flex-1"></div>
            </h2>
            
            {/* Removi o grid e deixei flex-col para ficarem sempre um embaixo do outro */}
            <div className="flex flex-col gap-12">
              {equipe.map((membro) => (
                <div key={membro.id} className="flex items-center gap-8 group">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-zinc-800 shrink-0 shadow-lg">
                    <img 
                      src={membro.imagem} 
                      alt={membro.nome} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="border-b border-zinc-900 flex-1 pb-6 group-hover:border-zinc-700 transition-colors">
                    <h3 className="text-xl md:text-2xl font-bold group-hover:text-purple-500 transition-colors">
                      {membro.nome}
                    </h3>
                    <p className="text-zinc-500 italic text-base md:text-lg">
                      {membro.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}