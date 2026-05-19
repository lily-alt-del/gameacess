import { useState } from "react";
import { Menu, X, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import logoImage from '@/assets/logo.jpeg';

// ============================================================================
// DADOS DOS JOGOS - Aqui estão os dados fictícios dos jogos em destaque
// ============================================================================

interface Game {
  id: number;
  title: string;
  price: number;
  oldPrice: number | null;
  image: string;
  description: string;
}

const destaqueGames: Game[] = [
  {
    id: 1,
    title: "Tomodachi life",
    price: 13.2,
    oldPrice: null,
    image: "https://store-images.s-microsoft.com/image/apps.39698.70702278257994163.68b869af-04bf-4393-8ae6-7bb15e154eea.6c6c7f6a-a969-4fa6-b973-647c4fcd2f23",
    description: "blblblblblblblblblb",
  },
  {
    id: 2,
    title: "Level Devil",
    price: 5.9,
    oldPrice: null,
    image: "https://play-lh.googleusercontent.com/1zTWXjwCUeRmOVeqNnmrb-oR-KELGQMOLjrcZ2cXkQby8pQRpD5Wrng7Z8JPuWrsqQ=w240-h480-rw",
    description: "blblblblblblblblblb.",
  },
  {
    id: 3,
    title: "portal 2",
    price: 17.02,
    oldPrice: null,
    image: "https://upload.wikimedia.org/wikipedia/pt/f/f9/Portal2cover.jpg",
    description: "blblblblblblblblblb.",
  },
  {
    id: 4,
    title: "Ultrakill",
    price: 16.99,
    oldPrice: null,
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1229490/capsule_616x353.jpg?t=1774188523",
    description: "blblblblblblblblblb.",
  },
  {
    id: 5,
    title: "Animal Crossing",
    price: 5.44,
    oldPrice: null,
    image: "https://m.media-amazon.com/images/I/81KKBjilaGL.jpg",
    description: "blblblblblblblblblb.",
  },
  {
    id: 6,
    title: "Subway Surfers",
    price: 3.28,
    oldPrice: null,
    image: "https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=1200,height=1200,fit=cover,f=png/231cb237ab22763a61c2ca0eac6a3760/subway-surfers-logo.png",
    description: "blblblblblblblblblb.",
  },
  {
    id: 7,
    title: "Planta vs zombie",
    price: 4.3,
    oldPrice: null,
    image: "https://m.media-amazon.com/images/I/91zzKKBFQVL._AC_UF1000,1000_QL80_.jpg",
    description: "blblblblblblblblblb.",
  },
  {
    id: 8,
    title: "Angry Birds",
    price: 5.3,
    oldPrice: null,
    image: "https://play-lh.googleusercontent.com/INjAX3rST_6h8j8FDaB9LMlgv-dCMd-g1aCKE7OIuTG9UqB9X95Ow86xPdC1U_onhQ",
    description: "blblblblblblblblblb.",
  },
];

// ============================================================================
// DADOS DOS DESCONTOS - Aqui estão os jogos com desconto em destaque
// ============================================================================
const descontoGames: Game[] = [
  {
    id: 9,
    title: "Vampire Survivors",
    price: 19.99,
    oldPrice: 25.4,
    image: "https://cdn1.epicgames.com/spt-assets/6091b3f3943e4a7aa25fcac13de15cd1/vampire-survivors-7nq1h.jpg",
    description: "xingxongxingxongxingxong.",
  },
  {
    id: 10,
    title: "Stardew Valley",
    price: 14.4,
    oldPrice: 17.9,
    image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg?t=1754692865",
    description: "xingxongxingxongxingxong.",
  },
  {
    id: 11,
    title: "Terraria",
    price: 15.3,
    oldPrice: 17.44,
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/Terraria_Steam_artwork.jpg/250px-Terraria_Steam_artwork.jpg",
    description: "xingxongxingxongxingxong.",
  },
  {
    id: 12,
    title: "Plague Inc.",
    price: 10.4,
    oldPrice: 13.8,
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/246620/4c67f0dc09d833b843cf5c3834d95bef246ccd49/header.jpg?t=1776850604",
    description: "xingxongxingxongxingxong.",
  },
];

// ============================================================================
// COMPONENTE PRINCIPAL - Home Page
// ============================================================================
export default function Home() {
  // Estado para controlar se o menu hambúrguer está aberto
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Estado para armazenar o jogo selecionado (para mostrar no modal)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  
  // Estado para armazenar o carrinho de compras
  const [cart, setCart] = useState<Game[]>([]);

  // ============================================================================
  // FUNÇÃO: Adicionar jogo ao carrinho
  // ============================================================================
  // Função para adicionar jogo ao carrinho
  const handleAddToCart = (game: Game) => {
    setCart([...cart, game]);
    toast.success(`${game.title} adicionado ao carrinho!`);
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ====================================================================
          HEADER - Logo, Nome da Marca e Menu Hambúrguer
          ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 bg-black border-b border-gray-800 z-50">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Logo e Nome da Marca */}
          <div className="flex items-center gap-3">
          {/* LOGO: Substitua a URL abaixo pela URL da sua imagem */}
<img
  src={logoImage}
  alt="Logo Access Game"
  className="w-10 h-10 rounded-full object-cover"
/>


            <h1 className="text-xl font-bold text-white">ACCESS GAME</h1>
          </div>

          {/* Botão Menu Hambúrguer */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ====================================================================
          MENU LATERAL - Abre quando clica no hambúrguer
          ==================================================================== */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 pt-16">
          {/* Fundo escuro semi-transparente */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />

          {/* Conteúdo do Menu */}
          <div className="absolute right-0 top-16 w-80 bg-gray-900 border-l border-gray-800 h-screen overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Botões de Autenticação */}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">
                  Entrar
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Cadastrar
                </Button>
              </div>

              {/* Separador */}
              <div className="border-t border-gray-700" />

              {/* Categorias */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 mb-3 uppercase">
                  Categorias:
                </h3>
                <nav className="space-y-2">
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded transition-colors">
                    Novidades
                  </button>
                  <button className="w-full text-left px-3 py-2 hover:bg-gray-800 rounded transition-colors">
                    Produtos
                  </button>
                </nav>
              </div>

              {/* Separador */}
              <div className="border-t border-gray-700" />

              {/* Botão Sobre Nós */}
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Sobre Nós
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          CONTEÚDO PRINCIPAL
          ==================================================================== */}
      <main className="pt-16">
        {/* ====================================================================
            BANNER - Imagem em destaque que ocupa toda a largura
            ==================================================================== */}
        <div className="w-full h-48 md:h-64 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
          <img
            src="https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/key-art/Homepage_Discover-our-games_MC-Vanilla-KeyArt_864x864.jpg"
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* ====================================================================
            SEÇÃO: JOGOS EM DESTAQUE
            ==================================================================== */}
        <section className="px-4 py-8 md:px-6">
          <h2 className="text-2xl font-bold mb-6 text-white">DESTAQUE:</h2>

          {/* Grade de Jogos - 4 por linha em desktop, responsivo em mobile */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {destaqueGames.map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className="group cursor-pointer"
              >
                {/* Imagem do Jogo */}
                <div className="relative overflow-hidden rounded-lg mb-3 aspect-square bg-gray-800">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Overlay ao passar o mouse */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold">Ver Detalhes</span>
                  </div>
                </div>

                {/* Título do Jogo */}
                <h3 className="text-sm font-semibold text-white truncate">
                  {game.title}
                </h3>

                {/* Preço */}
                <p className="text-sm text-blue-400 font-bold">
                  R$ {game.price.toFixed(2)}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* ====================================================================
            SEÇÃO: DESCONTOS EM DESTAQUE
            ==================================================================== */}
        <section className="px-4 py-8 md:px-6 bg-gray-900/50">
          <h2 className="text-2xl font-bold mb-6 text-white">DESCONTOS EM DESTAQUE</h2>

          {/* Grade de Jogos com Desconto */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {descontoGames.map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className="group cursor-pointer"
              >
                {/* Imagem com Badge de Desconto */}
                <div className="relative overflow-hidden rounded-lg mb-3 aspect-square bg-gray-800">
                  <img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Badge de Desconto */}
                  {game.oldPrice && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">
                      {Math.round(((game.oldPrice - game.price) / game.oldPrice) * 100)}% OFF
                    </div>
                  )}

                  {/* Overlay ao passar o mouse */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-bold">Ver Detalhes</span>
                  </div>
                </div>

                {/* Título do Jogo */}
                <h3 className="text-sm font-semibold text-white truncate">
                  {game.title}
                </h3>

                {/* Preços - Preço antigo riscado e preço atual */}
                <div className="flex items-center gap-2">
                  {game.oldPrice && (
                    <p className="text-xs text-gray-500 line-through">
                      R$ {game.oldPrice.toFixed(2)}
                    </p>
                  )}
                  <p className="text-sm text-green-400 font-bold">
                    R$ {game.price.toFixed(2)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Espaço extra para scroll */}
        <div className="h-20" />
      </main>

      {/* ====================================================================
          MODAL DE DETALHES DO JOGO
          ==================================================================== */}
      <Dialog open={selectedGame !== null} onOpenChange={() => setSelectedGame(null)}>
        <DialogContent className="bg-gray-900 border-gray-800">
          {selectedGame && (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">{selectedGame.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                {/* Imagem do Jogo */}
                <img
                  src={selectedGame.image}
                  alt={selectedGame.title}
                  className="w-full h-64 object-cover rounded-lg"
                />

                {/* Descrição */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedGame.description}
                </p>

                {/* Preços */}
                <div className="space-y-2">
                  {selectedGame.oldPrice && (
                    <p className="text-gray-500 line-through text-sm">
                      R$ {selectedGame.oldPrice.toFixed(2)}
                    </p>
                  )}
                  <p className="text-2xl font-bold text-green-400">
                    R$ {selectedGame.price.toFixed(2)}
                  </p>
                </div>

                {/* Avaliação (Simulada) */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">(4.5/5)</span>
                </div>

                {/* Botão Comprar */}
                <Button
                  onClick={() => handleAddToCart(selectedGame)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  COMPRAR - Adicionar ao Carrinho
                </Button>

                {/* Contador de Itens no Carrinho */}
                {cart.length > 0 && (
                  <p className="text-center text-sm text-gray-400">
                    Você tem {cart.length} item(ns) no carrinho
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

