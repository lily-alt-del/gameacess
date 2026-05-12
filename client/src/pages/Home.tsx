import React, { useState } from "react";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

// ============================================================
// DADOS DOS PRODUTOS DE ROUPAS
// ============================================================
// Cada produto contém: id, nome, preço, imagem, tamanhos, cores e descrição
const clothingProducts = [
  {
    id: 1,
    name: "Camiseta Accessgame",
    price: 25.00,
    image: "https://via.placeholder.com/300x300?text=Camiseta",
    sizes: ["P", "M", "G",],
    colors: ["Preto", "Branco",],
    description: "Camiseta 100% algodão",
  },
  {
    id: 2,
    name: "Babylook Accessgame",
    price: 25.00,
    image: "https://via.placeholder.com/300x300?text=Babylook",
    sizes: ["P", "M", "G"],
    colors: ["Preto", "Branco",],
    description: "Babylook 100% algodão",
  },
  {
    id: 3,
    name: "Moletom Accessgame",
    price: 45.00,
    image: "https://via.placeholder.com/300x300?text=Moletom",
    sizes: ["P", "M", "G",],
    colors: ["Preto", "Branco",],
    description: "Moletom 100% algodão",
  },
];

// ============================================================
// DADOS DOS PRODUTOS PERIFÉRICOS
// ============================================================
// Produtos como mouses, controles e outros acessórios
const peripheralProducts = [
  {
    id: 101,
    name: "Mouse Adaptado Ergonômico",
    price: 206.00,
    image: "https://via.placeholder.com/300x300?text=Mouse+Ergo",
    sizes: ["Único"],
    colors: ["Preto"],
    description: "Mouse adaptado ergonômico para melhor conforto",
  },
  {
    id: 102,
    name: "Mouse Adaptado (Pés)",
    price: 119.90,
    image: "https://via.placeholder.com/300x300?text=Mouse+Pés",
    sizes: ["Único"],
    colors: ["Preto"],
    description: "Mouse adaptado para uso com os pés",
  },
  {
    id: 103,
    name: "Mouse Adaptado (Braço)",
    price: 112.21,
    image: "https://via.placeholder.com/300x300?text=Mouse+Braço",
    sizes: ["Único"],
    colors: ["Preto"],
    description: "Mouse adaptado para uso com o braço",
  },
  {
    id: 104,
    name: "Mouse Adaptado Ergonômico",
    price: 120.00,
    image: "https://via.placeholder.com/300x300?text=Mouse+Ergo2",
    sizes: ["Único"],
    colors: ["Preto"],
    description: "Mouse adaptado ergonômico premium",
  },
  {
    id: 105,
    name: "Mouse Gamer Ergonômico",
    price: 130.19,
    image: "https://via.placeholder.com/300x300?text=Mouse+Gamer",
    sizes: ["Único"],
    colors: ["Preto"],
    description: "Mouse gamer com design ergonômico",
  },
  {
    id: 106,
    name: "Controle Adaptado Play Station 5",
    price: 150.30,
    image: "https://via.placeholder.com/300x300?text=Controle+PS5",
    sizes: ["Único"],
    colors: ["Preto"],
    description: "Controle adaptado para PlayStation 5",
  },
  {
    id: 107,
    name: "Controle Nintendo Switch",
    price: 200.00,
    image: "https://via.placeholder.com/300x300?text=Controle+Switch",
    sizes: ["Único"],
    colors: ["Vermelho", "Azul"],
    description: "Controle adaptado para Nintendo Switch",
  },
  {
    id: 108,
    name: "Controle Adaptado XBOX Series X",
    price: 121.12,
    image: "https://via.placeholder.com/300x300?text=Controle+XBOX",
    sizes: ["Único"],
    colors: ["Preto"],
    description: "Controle adaptado para XBOX Series X",
  },
  {
    id: 109,
    name: "Mouse Gamer Ergonômico",
    price: 130.19,
    image: "https://via.placeholder.com/300x300?text=Mouse+Gamer2",
    sizes: ["Único"],
    colors: ["Preto"],
    description: "Mouse gamer com design ergonômico",
  },
  {
    id: 110,
    name: "Controle Adaptado Play Station 5",
    price: 150.30,
    image: "https://via.placeholder.com/300x300?text=Controle+PS52",
    sizes: ["Único"],
    colors: ["Preto"],
    description: "Controle adaptado para PlayStation 5",
  },
  {
    id: 111,
    name: "Controle Nintendo Switch",
    price: 200.00,
    image: "https://via.placeholder.com/300x300?text=Controle+Switch2",
    sizes: ["Único"],
    colors: ["Vermelho", "Azul"],
    description: "Controle adaptado para Nintendo Switch",
  },
  {
    id: 112,
    name: "Controle Adaptado XBOX Series X",
    price: 121.12,
    image: "https://via.placeholder.com/300x300?text=Controle+XBOX2",
    sizes: ["Único"],
    colors: ["Preto"],
    description: "Controle adaptado para XBOX Series X",
  },
];

// ============================================================
// PRODUTOS EM OFERTA DA SEMANA
// ============================================================
// Produtos com desconto especial exibidos no banner azul
const weeklyOffers = [
  { id: 201, name: "Mouse Logitech", discount: 30, price: 83.30, originalPrice: 119.00, sizes: ["Único"], colors: ["Preto"], description: "Mouse Logitech com desconto especial" },
  { id: 202, name: "Controle Logitech", discount: 50, price: 69.50, originalPrice: 139.00, sizes: ["Único"], colors: ["Preto"], description: "Controle Logitech em promoção" },
  { id: 203, name: "Suporte Adaptado", discount: 10, price: 79.99, originalPrice: 89.99, sizes: ["Único"], colors: ["Preto"], description: "Suporte adaptado com desconto" },
  { id: 204, name: "Adaptadores Variados", discount: 25, price: 22.49, originalPrice: 29.99, sizes: ["Único"], colors: ["Preto"], description: "Adaptadores variados em oferta" },
];

// ============================================================
// COMPONENTE PRINCIPAL - HOME
// ============================================================
export default function Home() {
  // Estado para armazenar o produto selecionado (para abrir página de detalhes)
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Estado para armazenar o texto de pesquisa
  const [searchText, setSearchText] = useState("");

  // ============================================================
  // PÁGINA DE DETALHES DO PRODUTO
  // ============================================================
  // Quando um produto é clicado, esta página é exibida com informações completas
  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-black">
        {/* HEADER - Cabeçalho da página de detalhes */}
        <header className="bg-black text-white p-3 sticky top-0 z-50 border-b border-gray-700">
          <div className="max-w-full mx-auto px-4">
            <div className="flex justify-between items-center gap-4">
              {/* Logo e Nome da Loja */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-black text-xs">AG</div>
                <h1 className="text-white font-bold text-sm">ACCESS GAME</h1>
              </div>

              {/* Botões de Autenticação */}
              <div className="flex items-center gap-4 ml-auto">
                <Button className="bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 transition">Entrar</Button>
                <Button className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition">Cadastrar</Button>
              </div>
            </div>

            {/* Barra de Pesquisa + Menu em Baixo */}
            <div className="flex items-center gap-4 mt-3">
              {/* Campo de Pesquisa */}
              <div className="flex items-center bg-gray-700 rounded-full px-3 py-1.5 flex-1 max-w-xs">
                <Search size={14} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Pesquisar loja"
                  className="flex-1 ml-2 bg-transparent text-white placeholder-gray-400 outline-none text-xs"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              {/* Links de Navegação */}
              <div className="flex items-center gap-6">
                <button className="text-white font-bold text-xs hover:text-blue-400 transition">NOVIDADES</button>
                <button className="text-white font-bold text-xs hover:text-blue-400 transition">PRODUTOS</button>
              </div>
            </div>
          </div>
        </header>

        {/* SEÇÃO DE DETALHES DO PRODUTO */}
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-700">
            <div className="grid grid-cols-2 gap-8 p-8">
              {/* Imagem Grande do Produto */}
              <div className="flex items-center justify-center bg-gray-800 rounded-lg h-96">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>

              {/* Informações do Produto */}
              <div>
                {/* Botão Voltar */}
                <button onClick={() => setSelectedProduct(null)} className="text-blue-400 hover:text-blue-300 mb-4">← Voltar</button>
                
                {/* Nome do Produto */}
                <h2 className="text-3xl font-bold text-white mb-2">{selectedProduct.name}</h2>
                
                {/* Preço */}
                <p className="text-4xl font-bold text-blue-400 mb-4">R${selectedProduct.price.toFixed(2)}</p>
                
                {/* Descrição */}
                <p className="text-gray-300 mb-6">{selectedProduct.description}</p>

                {/* Seletor de Tamanhos */}
                <div className="mb-6">
                  <h3 className="font-bold text-white mb-3">Tamanhos</h3>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.sizes.map((size: string) => (
                      <button key={size} className="border-2 border-gray-600 rounded-lg px-4 py-2 text-white hover:border-blue-400 hover:bg-blue-900 transition">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seletor de Cores */}
                <div className="mb-8">
                  <h3 className="font-bold text-white mb-3">Cores</h3>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.colors.map((color: string) => (
                      <button key={color} className="border-2 border-gray-600 rounded-lg px-4 py-2 text-white hover:border-blue-400 hover:bg-blue-900 transition">
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Botão Adicionar ao Carrinho */}
                <Button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition">
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  // PÁGINA PRINCIPAL - LISTAGEM DE PRODUTOS
  // ============================================================
  return (
    <div className="min-h-screen bg-black">
      {/* HEADER - Cabeçalho Principal */}
      <header className="bg-black text-white p-3 sticky top-0 z-50 border-b border-gray-700">
        <div className="max-w-full mx-auto px-4">
          {/* Primeira Linha: Logo + Botões */}
          <div className="flex justify-between items-center gap-4">
            {/* Logo e Nome da Loja */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-black text-xs">AG</div>
              <h1 className="text-white font-bold text-sm">ACCESS GAME</h1>
            </div>

            {/* Botões de Autenticação */}
            <div className="flex items-center gap-4 ml-auto">
              <Button className="bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 transition">Entrar</Button>
              <Button className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700 transition">Cadastrar</Button>
            </div>
          </div>

          {/* Segunda Linha: Pesquisa + Menu */}
          <div className="flex items-center gap-4 mt-3">
            {/* Campo de Pesquisa */}
            <div className="flex items-center bg-gray-700 rounded-full px-3 py-1.5 flex-1 max-w-xs">
              <Search size={14} className="text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar loja"
                className="flex-1 ml-2 bg-transparent text-white placeholder-gray-400 outline-none text-xs"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {/* Links de Navegação */}
            <div className="flex items-center gap-6">
              <button className="text-white font-bold text-xs hover:text-blue-400 transition">NOVIDADES</button>
              <button className="text-white font-bold text-xs hover:text-blue-400 transition">PRODUTOS</button>
            </div>
          </div>
        </div>
      </header>

      {/* BANNER - Informação de Frete Grátis */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 py-3 px-4">
        <div className="max-w-full mx-auto text-center">
          <p className="text-white text-xs italic font-semibold">
            Frete grátis para o país todo a partir de R$ 350,00
          </p>
        </div>
      </section>

      {/* SEÇÃO DE OFERTAS DA SEMANA */}
      <section className="bg-blue-500 py-6 px-4">
        <div className="max-w-full mx-auto">
          {/* Título da Seção */}
          <h3 className="text-white font-bold text-sm mb-4 px-4">⚡ OFERTAS DA SEMANA</h3>
          
          {/* Grid de Produtos em Oferta (4 colunas) */}
          <div className="grid grid-cols-4 gap-6 px-4">
            {weeklyOffers.map((offer) => (
              <button
                key={offer.id}
                onClick={() => setSelectedProduct(offer)}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {/* Imagem do Produto */}
                <div className="relative bg-gray-200 h-40 flex items-center justify-center rounded-t-2xl">
                  {/* Badge de Desconto */}
                  <div className="absolute top-2 left-2 bg-blue-500 rounded-full w-9 h-9 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">⚡ {offer.discount}%</span>
                  </div>
                </div>
                
                {/* Informações do Produto */}
                <div className="p-3">
                  <h3 className="font-bold text-xs text-gray-800 line-clamp-2">{offer.name}</h3>
                  <p className="text-gray-400 line-through text-xs">R${offer.originalPrice.toFixed(2)}</p>
                  <p className="text-blue-600 font-bold text-xs mt-2">R${offer.price.toFixed(2)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO DE ROUPAS E MOLETONS */}
      <section className="max-w-full mx-auto p-6 bg-black">
        {/* Título da Seção */}
        <h2 className="text-xl font-bold text-white mb-6 px-4">CAMISETAS E MOLETONS</h2>
        
        {/* Grid de Produtos de Roupas (3 colunas) */}
        <div className="grid grid-cols-3 gap-8 px-4">
          {clothingProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 border border-gray-700"
            >
              {/* Imagem do Produto */}
              <div className="bg-gray-800 h-56 flex items-center justify-center rounded-t-2xl">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Informações do Produto */}
              <div className="p-5">
                <h3 className="font-bold text-white text-sm">{product.name}</h3>
                <p className="text-blue-400 font-bold mt-3 text-sm">R${product.price.toFixed(2)}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* SEÇÃO DE PERIFÉRICOS */}
      <section className="bg-black py-8">
        <div className="max-w-full mx-auto px-4">
          {/* Título da Seção */}
          <h2 className="text-xl font-bold text-white mb-6">PERIFÉRICOS</h2>
          
          {/* Grid de Produtos Periféricos (3 colunas) */}
          <div className="grid grid-cols-3 gap-8">
            {peripheralProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition border border-gray-700"
              >
                {/* Imagem do Produto */}
                <div className="bg-gray-700 h-48 flex items-center justify-center rounded-t-2xl">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                
                {/* Informações do Produto */}
                <div className="p-4">
                  <h3 className="font-bold text-xs text-white line-clamp-2">{product.name}</h3>
                  <p className="text-blue-400 font-bold mt-3 text-xs">R${product.price.toFixed(2)}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER - Rodapé */}
      <footer className="bg-gray-900 text-white py-8 border-t border-gray-700">
        <div className="max-w-full mx-auto px-6">
          {/* Conteúdo Principal do Footer */}
          <div className="grid grid-cols-2 gap-12 mb-6">
            {/* Redes Sociais */}
            <div>
              <h3 className="font-bold text-sm mb-3">NOS SIGA NAS REDES SOCIAIS</h3>
              <div className="flex gap-3">
                {/* Botão Facebook */}
                <button className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs hover:bg-gray-200 transition">
                  f
                </button>
                {/* Botão Instagram */}
                <button className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs hover:bg-gray-200 transition">
                  📷
                </button>
                {/* Botão Twitter/X */}
                <button className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center font-bold text-xs hover:bg-gray-200 transition">
                  𝕏
                </button>
              </div>
            </div>

            {/* Newsletter - Inscrição por Email */}
            <div>
              <h3 className="font-bold text-sm mb-3">FIQUE LIGADO</h3>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Email"
                  className="bg-gray-700 text-white px-3 py-1.5 rounded-l flex-1 outline-none placeholder-gray-400 text-xs"
                />
                <button className="bg-blue-600 px-3 py-1.5 rounded-r hover:bg-blue-700 transition text-xs">→</button>
              </div>
            </div>
          </div>

          {/* Informações Legais e Copyright */}
          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-400 text-xs text-center">
              © 2026 Access Game. Todos os direitos reservados
            </p>
            <p className="text-gray-400 text-xs text-center mt-1 leading-relaxed">
              Política de privacidade | Termos de utilização | Access Game / CNPJ: XX.XXX.XXX/YYYY-ZZ | Rua: XXXXXXXXX, ZZZ - Bairro: XXXXX / Caraguatatuba - SP CEP: XXXXX-ZZZ
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
