'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ==========================================
// 1. MODAL DE PERIFÉRICOS (PADRÃO COM CARRINHO)
// ==========================================
interface PerifericoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  price: string;
}

function PerifericoModal({ isOpen, onClose, title, description, price }: PerifericoModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg max-w-md w-full p-6 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-3 right-4 text-zinc-400 hover:text-white text-xl">&times;</button>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">{description}</p>
        <div className="text-lg font-bold text-green-400 mb-6">Preço: {price}</div>
        <button onClick={() => { alert('Adicionado ao carrinho!'); onClose(); }} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded text-sm transition uppercase">
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 2. MODAL DE ROUPAS (ESTILO SHOPEE/SHEIN)
// ==========================================
interface RoupaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  descTecido: string;
  price: string;
  imgPreta: string;
  imgBranca: string;
}

function RoupaModal({ isOpen, onClose, title, descTecido, price, imgPreta, imgBranca }: RoupaModalProps) {
  const [corSelecionada, setCorSelecionada] = useState<'preta' | 'branca'>('preta');
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState<string>('M');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-2xl w-full p-6 relative shadow-2xl flex flex-col md:flex-row gap-6">
        <button onClick={onClose} className="absolute top-3 right-4 text-zinc-400 hover:text-white text-2xl">&times;</button>
        
        <div className="w-full md:w-1/2 aspect-square bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
          <img 
            src={corSelecionada === 'preta' ? imgPreta : imgBranca} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-black text-white mb-1">{title}</h3>
            <span className="text-green-400 font-bold text-xl">{price}</span>
            
            <div className="mt-4">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Detalhes do Tecido</h4>
              <p className="text-zinc-300 text-sm leading-relaxed">{descTecido}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Cor:</h4>
              <div className="flex gap-3">
                <button 
                  onClick={() => setCorSelecionada('preta')}
                  className={`px-4 py-1.5 rounded text-xs font-bold border transition ${corSelecionada === 'preta' ? 'bg-white text-black border-white' : 'bg-zinc-800 text-white border-zinc-700'}`}
                >
                  Preto
                </button>
                <button 
                  onClick={() => setCorSelecionada('branca')}
                  className={`px-4 py-1.5 rounded text-xs font-bold border transition ${corSelecionada === 'branca' ? 'bg-white text-black border-white' : 'bg-zinc-800 text-white border-zinc-700'}`}
                >
                  Branco
                </button>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Tamanho:</h4>
              <div className="flex gap-2">
                {['P', 'M', 'G'].map((tam) => (
                  <button
                    key={tam}
                    onClick={() => setTamanhoSelecionado(tam)}
                    className={`w-10 h-10 rounded font-bold text-sm border flex items-center justify-center transition ${tamanhoSelecionado === tam ? 'bg-blue-600 text-white border-blue-600' : 'bg-zinc-800 text-zinc-300 border-zinc-700'}`}
                  >
                    {tam}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button 
            onClick={() => {
              alert(`Adicionado ao carrinho:\n${title}\nCor: ${corSelecionada}\nTamanho: ${tamanhoSelecionado}`);
              onClose();
            }}
            className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-sm transition uppercase tracking-wider"
          >
             Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. PÁGINA PRINCIPAL DE PRODUTOS
// ==========================================
export default function ProdutosPage() {
  const [perifericoModal, setPerifericoModal] = useState({ open: false, title: '', desc: '', price: '' });
  const [roupaModal, setRoupaModal] = useState({ open: false, title: '', descTecido: '', price: '', imgPreta: '', imgBranca: '' });

 const ofertasSemana = [
    { 
      id: 1, 
      title: 'Headset Gamer Pro', 
      precoAntigo: 'R$ 89,99', 
      precoAtual: 'R$ 79,89', 
      desconto: '10%', 
      img: 'https://t2.tudocdn.net/622197?w=824&h=494'
    },
    { 
      id: 2, 
      title: 'Teclado Mecânico RGB', 
      precoAntigo: 'R$ 1000,00', 
      precoAtual: 'R$ 50,00', 
      desconto: '50%', 
      img: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIPEBITDxAPEQ8QDxAQEBAQEBAVDxASFhUWFhURFhUYHTQjGCYxGxUVITEtJSkrLy4uFyA/ODMsNygwLisBCgoKDg0NDw8PDysZFRktKzcrKysrLSstKy0rKysrLSstKy0rKys3KysrKysrNysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAAcBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABDEAACAgEBBQYCBgcGBQUAAAABAgADEQQFEiExQQYHEyJRYXGBMkJikaGxFCNScoKiwRUkM0SSwkNT0eHxFjRjk7L/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwDuMREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEShrNZXQhe6yupBzex1VR8zwmh9oO93Q6bK6ff1dg4fq/LTn3sbn/CDA6HJXcKMsQB6kgCedttd7O0dSSKnXToc4XTp58e7tk/MYml63att5zdbba3ra7Of5jA9ZHa+nBwdRpwfQ3V5/OXFOpR/oOj/usp/KeRf0d/MMDfQEvVkeKigZLFPzHMdQIUsgrsBx4m8UKnzeVip5cuIP3QPX8Tztotubb2ci2E6oUdRePFrA+2CS1Y+O7Oi9jO9SjWMtWrVdNqGIVWz/AHexjyAJ4ofY5+JMDokREBERAREQEREBERAREQEREBERAREo6vVJShe11RFGWZjgCBWltr9fVp0377UqT9p2AB9hnnNA2/3is2U0S7o5ePYPMfdUPL+L7pzTb+213y+quay0/VJL2kew+qPjgS4muq7X70tNVkaet7yM+dv1VIxzOSN7+Wc47R98etvZhpCumoJ8hVAb8faZsgfICaVqNfdq8pRUwTru8Wb2ZuQHt+cgvZvUH6QrT2ewf0zAobS2vdqW377rbn44a12cjPpk8PlLLxJlj2ZuH1tOfYWnP4rLHWbKvpBNlTBRzYYZfjleXzgZXs1tGmoMtp3GZs75zukYGAT0my37No1AywV8jg6nDfJhObGXOh19tBzU5X1X6p+IgbNtTs1qAmKbWvrG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' 
    },
    { 
      id: 3, 
      title: 'Mouse Gamer Wireless', 
      precoAntigo: 'R$ 100,90', 
      precoAtual: 'R$ 99,95', 
      desconto: '10%', 
      img: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400' 
    },
    { 
      id: 4, 
      title: 'Mouse ergonomico', 
      precoAntigo: 'R$ 120,00', 
      precoAtual: 'R$ 84,00', 
      desconto: '30%', 
      img: 'https://netcomputadores.com.br/dbimg/produtos/em550gpl_101899_g.jpg' 
    },
  ];

  const roupas = [
    { id: 101, title: 'Moletom Access Game', price: 'R$ 130,00', img: '/moletompf.png', imgPreta: '/moletompf.png', imgBranca: '/moletombf.png', descTecido: 'Moletom Canguru. Interior flanelado macio, capuz forrado e costuras reforçadas.' },
    { id: 102, title: 'Camiseta Access Game', price: 'R$ 19,00', img: '/camisetapf.png', imgPreta: '/camisetapf.png', imgBranca: '/camisetabf.png', descTecido: 'Algodão 100% fio. Toque super macio e alta durabilidade.' },
    { id: 103, title: 'Babylook Acess Game', price: 'R$ 19,00', img: '/babypf.png', imgPreta: '/babypf.png', imgBranca: '/babybf.png', descTecido: 'Algodão 100% fio. Toque super macio e alta durabilidade.' },
  ];

  const perifericos = [
    { id: 201, title: 'mouse adaptado ergonomico', price: 'R$ 206,00', img: 'https://http2.mlstatic.com/D_628791-MLB93481032231_092025-O.jpg', desc: 'Conforto anatômico e acessibilidade digital garantida.Design anatômico que reduz o esforço muscular.' },
    { id: 202, title: 'mouse adaptado (pés)', price: 'R$ 119,90', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbu99Cy3CxOXHJ0SrC4VwZ329uKNrue_ZqrQ&s', desc: 'Navegação completa controlada pelos pés.Liberdade e autonomia sem usar as mãos.' },
    { id: 203, title: 'mouse  adptado (braço)', price: 'R$ 112,21', img: 'data:image/jpeg;base64,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', desc: 'Controle preciso acionado por movimentos do braço.Tecnologia assistiva para máxima independência diária.' },
    { id: 204, title: 'mouse adaptado ergonomico', price: 'R$ 120,00', img: 'https://cdn.awsli.com.br/2547/2547358/produto/236257449/mouse-sem-fio-vertical-multilaser-bt-mo382--5--vfkyj61hb2.jpg', desc: 'Alta performance com encaixe perfeito na mão.Longas sessões de jogo sem dores musculares.' },
    { id: 205, title: 'mouse gamer ergonomico', price: 'R$ 130,19', img: 'https://eletronicasantana.vteximg.com.br/arquivos/ids/95588-1000-1000/Mouse-sem-Fio-Ergonomico-2.4GHZ-1600DPI-MO284-Multilaser.jpg?v=637810475965070000', desc: 'Jogabilidade inclusiva no seu PS5 com total autonomia.Botões personalizáveis ​​para máxima acessibilidade gamer.' },
    { id: 206, title: 'controle adaptado Play Station 5 ', price: 'R$ 150,30', img: 'https://gmedia.playstation.com/is/image/SIEPDC/access-controller-image-block-01-en-12may23', desc: 'Acessibilidade e diversão portátil para todos os jogadores.Comandos adaptados para jogar sem barreiras físicas.' },
    { id: 207, title: 'Controle Nintendo switch', price: 'R$ 200,00', img: 'data:image/jpeg;base64,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', desc: 'Acessibilidade e diversão portátil para todos os jogadores.Comandos adaptados para jogar sem barreiras físicas.' },
    { id: 208, title: 'Controle Adaptado XBOX Series X', price: 'R$ 121,12', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTwtcdbU4oiebMarb75Zf8kTsVnGVr2bEMrQ&s', desc: 'Alta compatibilidade e ergonomia adaptada no Xbox.Supere limites no jogo com controles modificados.' },
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col justify-between">
      <div>
        <Header />

        {/* BARRA DE PESQUISA */}
        <div className="w-full bg-black border-b border-zinc-900 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Pesquisar loja" 
                className="bg-zinc-800 text-sm text-zinc-300 pl-10 pr-4 py-2 rounded-full w-64 focus:outline-none"
              />
            </div>
            <nav className="flex gap-6 text-sm font-bold tracking-wide">
              <Link href="#" className="hover:text-zinc-400 transition">NOVIDADES</Link>
              <Link href="#" className="hover:text-zinc-400 transition">PRODUTOS</Link>
            </nav>
          </div>
        </div>

        {/* BANNER DE OFERTAS */}
        <div className="w-full max-w-7xl mx-auto px-6 mt-6">
          <div className="w-full bg-blue-500 text-black font-black text-center py-2.5 text-xs md:text-sm uppercase tracking-wider rounded-t-xl">
             Frete grátis para todo o país a partir de R$ 350,00
          </div>
          
          {/* Ajustado: Usando bg-zinc-900 padrão para evitar quebra de classe */}
          <div className="w-full bg-zinc-900 border border-t-0 border-zinc-800 p-6 rounded-b-xl mb-14">
            <div className="flex items-center gap-2 mb-6 text-blue-400 font-black彻 text-xl uppercase tracking-wide">
              <span>⚡</span> Ofertas da semana
            </div>

            {/* Ajustado: Garantido as 4 colunas estritas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
              {ofertasSemana.map((prod) => (
                <div 
                  key={prod.id}
                  onClick={() => setPerifericoModal({ open: true, title: prod.title, desc: 'Aproveite essa oferta da semana.', price: prod.precoAtual })}
                  className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 relative group cursor-pointer hover:border-blue-500 transition duration-300 flex flex-col justify-between"
                >
                  <div className="absolute top-2 left-2 bg-blue-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded z-10">
                    -{prod.desconto}
                  </div>
                  
                  <div className="w-full aspect-square rounded overflow-hidden mb-3 bg-zinc-900">
                    <img src={prod.img} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div>
                    <h3 className="text-zinc-300 text-xs font-bold group-hover:text-white transition line-clamp-1">{prod.title}</h3>
                    <div className="mt-1">
                      <span className="text-zinc-500 line-through text-[11px] block">{prod.precoAntigo}</span>
                      <span className="text-green-400 font-black text-sm">{prod.precoAtual}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOLO CENTRAL DA LOJA */}
        <main className="max-w-7xl mx-auto px-6 flex flex-col gap-16">
          
          {/* SEÇÃO: CAMISETAS E MOLETONS */}
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6">Camisetas e Moletons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {roupas.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setRoupaModal({ open: true, title: item.title, descTecido: item.descTecido, price: item.price, imgPreta: item.imgPreta, imgBranca: item.imgBranca })}
                  className="group cursor-pointer flex flex-col gap-3"
                >
                  <div className="w-full aspect-[4/5] bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group-hover:border-zinc-500 transition duration-300">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-300 group-hover:text-white transition">{item.title}</h3>
                    <p className="text-sm text-green-400 font-bold mt-0.5">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SEÇÃO: PERIFÉRICOS */}
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider mb-6">Periféricos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
              {perifericos.map((prod) => (
                <div 
                  key={prod.id} 
                  onClick={() => setPerifericoModal({ open: true, title: prod.title, desc: prod.desc, price: prod.price })}
                  className="group cursor-pointer flex flex-col gap-3"
                >
                  <div className="w-full aspect-[3/4] bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden group-hover:border-zinc-500 transition duration-300">
                    <img src={prod.img} alt={prod.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-300 group-hover:text-white transition line-clamp-1">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-green-400 font-bold mt-0.5">{prod.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>

      <Footer />

      <PerifericoModal 
        isOpen={perifericoModal.open}
        onClose={() => setPerifericoModal({ ...perifericoModal, open: false })}
        title={perifericoModal.title}
        description={perifericoModal.desc}
        price={perifericoModal.price}
      />

      <RoupaModal 
        isOpen={roupaModal.open}
        onClose={() => setRoupaModal({ ...roupaModal, open: false })}
        title={roupaModal.title}
        descTecido={roupaModal.descTecido}
        price={roupaModal.price}
        imgPreta={roupaModal.imgPreta}
        imgBranca={roupaModal.imgBranca}
      />
    </div>
  );
}