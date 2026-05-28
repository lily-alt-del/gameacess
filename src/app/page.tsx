'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Modal from '@/components/Modal';

// ATUALIZAÇÃO DO MODAL LOCAL PARA ADICIONAR PREÇO, ESTRELAS E CARRINHO
interface JogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  rating?: number;
  price?: string;
}

function JogoModal({ isOpen, onClose, title, description, rating, price }: JogoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-md w-full p-6 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-3 right-4 text-zinc-400 hover:text-white text-xl">
          &times;
        </button>
        
        <h3 className="text-xl font-bold text-white mb-2 pr-6">{title}</h3>
        
        {/* Renderização das Estrelinhas */}
        {rating && (
          <div className="flex gap-1 text-yellow-500 mb-3 text-sm">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < Math.floor(rating) ? '★' : '☆'}</span>
            ))}
            <span className="text-zinc-400 text-xs ml-1">({rating})</span>
          </div>
        )}

        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{description}</p>
        
        {/* Preço */}
        {price && (
          <div className="text-lg font-bold text-white mb-6">
            Preço: <span className="text-green-400">{price}</span>
          </div>
        )}

        <button 
          onClick={() => {
            alert('Adicionado ao carrinho com sucesso!');
            onClose();
          }}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-sm transition tracking-wide uppercase"
        >
          🛒 Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJogo, setSelectedJogo] = useState({ title: '', desc: '', rating: 0, price: '' });

  const abrirModal = (title: string, desc: string, rating: number, price: string) => {
    setSelectedJogo({ title, desc, rating, price });
    setModalOpen(true);
  };

  // BANNER PRINCIPAL
  const bannerData = {
    title: 'Bayonetta',
    img: 'https://www.nintendo.com/eu/media/images/10_share_images/games_15/wiiu_14/SI_WiiU_Bayonetta1.jpg', 
  };

  // SEÇÃO: DESCUBRA ALGO NOVO (Duas fileiras de 4 jogos = 8 jogos no total)
  const descubraJogos = [
    { id: 1, title: 'Tomodachi life', price: 'R$ 13,20', rating: 4.8, img: 'https://www.leiaja.com/wp-content/uploads/2026/05/Divulgacao-Nintendo.jpg', desc: 'Mod de daltonismo para *Tomodachi Life*: melhora as cores e o contraste, deixando o jogo mais fácil de enxergar' },
    { id: 2, title: 'Levil devil', price: '5,90', rating: 4.5, img: 'https://play-lh.googleusercontent.com/1zTWXjwCUeRmOVeqNnmrb-oR-KELGQMOLjrcZ2cXkQby8pQRpD5Wrng7Z8JPuWrsqQ=w240-h480-rw', desc: 'ajustes de controles e tempo de reação para facilitar a jogabilidade.' },
    { id: 3, title: 'Ultrakill', price: 'R$ 16,99', rating: 4.2, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1229490/capsule_616x353.jpg?t=1774188523', desc: 'opções de sensibilidade e mira assistida para melhor controle.' },
    { id: 4, title: 'portal 2', price: 'R$ 17,02', rating: 5.0, img: 'https://upload.wikimedia.org/wikipedia/pt/f/f9/Portal2cover.jpg', desc: 'legendas aprimoradas e indicadores visuais para sons importantes.' },
    { id: 5, title: 'Animal Crossing', price: 'R$ 5,44', rating: 4.0, img: 'https://m.media-amazon.com/images/I/81KKBjilaGL.jpg', desc: 'textos mais claros e ritmo mais tranquilo para jogar sem pressa.' },
    { id: 6, title: 'Subway Surfers', price: 'R$ 3,28', rating: 4.7, img: 'https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=1200,height=1200,fit=cover,f=png/231cb237ab22763a61c2ca0eac6a3760/subway-surfers-logo.png', desc: 'controles simplificados e feedback visual mais evidente.' },
    { id: 7, title: 'Planta vs Zombie', price: '4,3', rating: 4.3, img: 'https://m.media-amazon.com/images/I/91zzKKBFQVL._AC_UF1000,1000_QL80_.jpg', desc: 'sinais visuais substituem sons importantes do jogo.' },
    { id: 8, title: 'Angry birds', price: 'R$ 5,30', rating: 4.9, img: 'https://play-lh.googleusercontent.com/INjAX3rST_6h8j8FDaB9LMlgv-dCMd-g1aCKE7OIuTG9UqB9X95Ow86xPdC1U_onhQ', desc: 'ajustes de toque e precisão para facilitar os lançamentos.' },
  ];

  // SEÇÃO: DESCONTOS EM DESTAQUE (Fileira de 6 jogos menores + Fileira de 3 jogos maiores)
  const descontosPrincipais = [
    { id: 101, title: 'Vampire Survivors', price: 'R$ 9,90', rating: 4.1, img: 'https://cdn1.epicgames.com/spt-assets/6091b3f3943e4a7aa25fcac13de15cd1/vampire-survivors-7nq1h.jpg', desc: 'Automação de cliques e seleção de itens para jogar usando apenas um botão ou comando de voz.' },
    { id: 102, title: 'Stardew Valley', price: 'R$ 39,40', rating: 4.4, img: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg?t=1754692865', desc: 'Leitor de tela completo (Stardew Access) que narra menus, diálogos e coordenadas do mapa.' },
    { id: 103, title: 'Terraria', price: 'R$ 19,80', rating: 4.0, img: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/Terraria_Steam_artwork.jpg/250px-Terraria_Steam_artwork.jpg', desc: 'Mira automática e assistência de construção que eliminam a necessidade de reflexos rápidos com o mouse.' },
    { id: 104, title: 'Plague Inc.', price: 'R$ 5,00', rating: 4.6, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/246620/4c67f0dc09d833b843cf5c3834d95bef246ccd49/header.jpg?t=1776850604', desc: 'Interface com fontes ampliadas e cores adaptadas para alto contraste e daltonismo severo.' },
    { id: 105, title: 'postal 2.', price: 'R$ 4,99', rating: 4.2, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/223470/header.jpg?t=1726251082', desc: 'Indicadores visuais na tela que apontam a direção exata de tiros, alarmes e passos.' },
    { id: 106, title: 'Company of Heroes.', price: 'R$ 7,50', rating: 4.5, img: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/228200/header.jpg?t=1777996337', desc: 'Modificadores que permitem pausar ou desacelerar o combate em tempo real para planejar táticas sem pressa.' },
  ];

  const descontosGrandes = [
    { id: 201, title: 'Hollow Knight', price: 'R$2,50', rating: 4.9, img: 'https://static.wikia.nocookie.net/hollowknight/images/c/cd/HK_Cover_Art.png/revision/latest?cb=20220613045755&path-prefix=pt', desc: 'Pistas visuais na tela (brilhos e setas) para indicar ataques de chefes que dependem de som.' },
    { id: 202, title: 'Doki Doki Literature Club Plus', price: 'R$3,00', rating: 4.8, img: 'https://upload.wikimedia.org/wikipedia/pt/a/ae/Doki_Doki_Literature_Club_Capa.jpg', desc: 'Substituição de textos por fontes de alta legibilidade (como OpenDyslexic) e caixas de diálogo com maior contraste.' },
    { id: 203, title: 'Alice: Madness Returns', price: 'R$ 10,00', rating: 4.7, img: 'https://m.media-amazon.com/images/I/71RgYPhcYaL._AC_UF1000,1000_QL80_.jpg', desc: 'Filtros de sombreamento que destacam as bordas das plataformas flutuantes e separam a personagem do cenário escuro.' },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between">
      <div>
        <Header />

        {/* BARRA DE PESQUISA E LINKS FIXADOS (TELA TODA, COM FUNDO PRETO) */}
        <div className="w-full bg-black border-b border-zinc-900 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Pesquisar loja" 
                className="bg-zinc-800 text-sm text-zinc-300 pl-10 pr-4 py-2 rounded-full w-64 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              />
            </div>

            <nav className="flex gap-6 text-sm font-bold tracking-wide">
              <Link href="#" className="hover:text-zinc-400 transition">NOVIDADES</Link>
              <Link href="#" className="hover:text-zinc-400 transition">PRODUTOS</Link>
            </nav>
          </div>
        </div>

        {/* BANNER DE PONTA A PONTA (OCUPA 100% DA LARGURA DA TELA) */}
        <div className="w-full h-[450px] relative bg-zinc-900 overflow-hidden mb-12">
          <img 
            src={bannerData.img} 
            alt={bannerData.title} 
            className="w-full h-full object-cover brightness-[0.45]"
          />
          {/* Nome Escrito por Cima do Banner */}
        
        </div>

        {/* CORPO DA PÁGINA COM GRIDS CENTRALIZADOS */}
        <main className="max-w-7xl mx-auto px-6 flex flex-col gap-16">
          
          {/* SEÇÃO 1: DESCUBRA ALGO NOVO (Duas fileiras de 4 jogos) */}
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6">Descubra algo novo</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {descubraJogos.map((jogo) => (
                <div 
                  key={jogo.id} 
                  onClick={() => abrirModal(jogo.title, jogo.desc, jogo.rating, jogo.price)}
                  className="group cursor-pointer flex flex-col gap-3"
                >
                  <div className="aspect-[3/4] bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden group-hover:border-zinc-500 transition duration-300">
                    <img 
                      src={jogo.img} 
                      alt={jogo.title}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-300 group-hover:text-white transition line-clamp-1">
                      {jogo.title}
                    </h3>
                    <p className="text-xs text-green-400 font-bold mt-0.5">{jogo.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SEÇÃO 2: DESCONTOS EM DESTAQUE */}
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6">Descontos em Destaque</h2>
            
            {/* Fileira Superior: 6 jogos lado a lado */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
              {descontosPrincipais.map((jogo) => (
                <div 
                  key={jogo.id}
                  onClick={() => abrirModal(jogo.title, jogo.desc, jogo.rating, jogo.price)}
                  className="group cursor-pointer flex flex-col gap-2"
                >
                  <div className="aspect-[3/4] bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden group-hover:border-zinc-500 transition duration-300">
                    <img 
                      src={jogo.img} 
                      alt={jogo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xs font-medium text-zinc-400 group-hover:text-white transition line-clamp-1">
                    {jogo.title}
                  </h3>
                </div>
              ))}
            </div>

            {/* Fileira Inferior: 3 jogos com quadrados maiores (aspect-video) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {descontosGrandes.map((jogo) => (
                <div 
                  key={jogo.id}
                  onClick={() => abrirModal(jogo.title, jogo.desc, jogo.rating, jogo.price)}
                  className="group cursor-pointer flex flex-col gap-3"
                >
                  <div className="aspect-video bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group-hover:border-zinc-500 transition duration-300">
                    <img 
                      src={jogo.img} 
                      alt={jogo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition">
                      {jogo.title}
                    </h3>
                    <p className="text-sm text-green-400 font-bold mt-0.5">{jogo.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>

      <Footer />

      {/* GERENCIADOR DO NOVO MODAL DINÂMICO */}
      <JogoModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        title={selectedJogo.title} 
        description={selectedJogo.desc} 
        rating={selectedJogo.rating}
        price={selectedJogo.price}
      />
    </div>
  );
}