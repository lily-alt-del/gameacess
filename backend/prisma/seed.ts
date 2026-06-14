import { PrismaClient, ModCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpa os mods
  await prisma.mod.deleteMany();

  // Limpa os produtos
  await prisma.product.deleteMany();

  // Seed dos mods
  await prisma.mod.createMany({
    data: [
      // DESCUBRA

      {
        title: 'Tomodachi Life',
        description:
          'Mod de daltonismo para Tomodachi Life: melhora as cores e o contraste.',
        price: 13.2,
        imageUrl:
          'https://www.leiaja.com/wp-content/uploads/2026/05/Divulgacao-Nintendo.jpg',
        category: ModCategory.DESCUBRA,
      },

      {
        title: 'Levil Devil',
        description:
          'Ajustes de controles e tempo de reação para facilitar a jogabilidade.',
        price: 5.9,
        imageUrl:
          'https://i.pinimg.com/736x/71/74/1f/71741f0e91ba7353dc20be8555183f84.jpg',
        category: ModCategory.DESCUBRA,
      },

      {
        title: 'Ultrakill',
        description:
          'Opções de sensibilidade e mira assistida para melhor controle.',
        price: 16.99,
        imageUrl:
          'https://mfiles.alphacoders.com/101/thumb-1920-1011359.jpeg',
        category: ModCategory.DESCUBRA,
      },

      {
        title: 'Portal 2',
        description:
          'Legendas aprimoradas e indicadores visuais para sons importantes.',
        price: 17.02,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/pt/f/f9/Portal2cover.jpg',
        category: ModCategory.DESCUBRA,
      },

      {
        title: 'Animal Crossing',
        description:
          'Textos mais claros e ritmo mais tranquilo para jogar sem pressa.',
        price: 5.44,
        imageUrl:
          'https://m.media-amazon.com/images/I/81KKBjilaGL.jpg',
        category: ModCategory.DESCUBRA,
      },

      {
        title: 'Subway Surfers',
        description:
          'Controles simplificados e feedback visual mais evidente.',
        price: 3.28,
        imageUrl:
          'https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=1200,height=1200,fit=cover,f=png/231cb237ab22763a61c2ca0eac6a3760/subway-surfers-logo.png',
        category: ModCategory.DESCUBRA,
      },

      {
        title: 'Plants vs Zombies',
        description:
          'Sinais visuais substituem sons importantes do jogo.',
        price: 4.3,
        imageUrl:
          'https://m.media-amazon.com/images/I/91zzKKBFQVL._AC_UF1000,1000_QL80_.jpg',
        category: ModCategory.DESCUBRA,
      },

      {
        title: 'Angry Birds',
        description:
          'Ajustes de toque e precisão para facilitar os lançamentos.',
        price: 5.3,
        imageUrl:
          'https://play-lh.googleusercontent.com/INjAX3rST_6h8j8FDaB9LMlgv-dCMd-g1aCKE7OIuTG9UqB9X95Ow86xPdC1U_onhQ',
        category: ModCategory.DESCUBRA,
      },

      // DESCONTO_PRINCIPAL

      {
        title: 'Vampire Survivors',
        description:
          'Automação de cliques e seleção de itens para jogar usando apenas um botão.',
        price: 9.9,
        imageUrl:
          'https://cdn1.epicgames.com/spt-assets/6091b3f3943e4a7aa25fcac13de15cd1/vampire-survivors-7nq1h.jpg',
        category: ModCategory.DESCONTO_PRINCIPAL,
      },

      {
        title: 'Stardew Valley',
        description:
          'Leitor de tela completo que narra menus e diálogos.',
        price: 39.4,
        imageUrl:
          'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg?t=1754692865',
        category: ModCategory.DESCONTO_PRINCIPAL,
      },

      {
        title: 'Terraria',
        description:
          'Mira automática e assistência de construção.',
        price: 19.8,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/en/thumb/1/1a/Terraria_Steam_artwork.jpg/250px-Terraria_Steam_artwork.jpg',
        category: ModCategory.DESCONTO_PRINCIPAL,
      },

      {
        title: 'Plague Inc.',
        description:
          'Interface com fontes ampliadas e alto contraste.',
        price: 5.0,
        imageUrl:
          'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/246620/4c67f0dc09d833b843cf5c3834d95bef246ccd49/header.jpg?t=1776850604',
        category: ModCategory.DESCONTO_PRINCIPAL,
      },

      {
        title: 'Postal 2',
        description:
          'Indicadores visuais que apontam a direção de tiros e alarmes.',
        price: 4.99,
        imageUrl:
          'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/223470/header.jpg?t=1726251082',
        category: ModCategory.DESCONTO_PRINCIPAL,
      },

      {
        title: 'Company of Heroes',
        description:
          'Permite pausar ou desacelerar o combate em tempo real.',
        price: 7.5,
        imageUrl:
          'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/228200/header.jpg?t=1777996337',
        category: ModCategory.DESCONTO_PRINCIPAL,
      },

      // DESCONTO_GRANDE

      {
        title: 'Hollow Knight',
        description:
          'Pistas visuais para indicar ataques de chefes.',
        price: 2.5,
        imageUrl:
          'https://static.wikia.nocookie.net/hollowknight/images/c/cd/HK_Cover_Art.png/revision/latest?cb=20220613045755&path-prefix=pt',
        category: ModCategory.DESCONTO_GRANDE,
      },

      {
        title: 'Doki Doki Literature Club Plus',
        description:
          'Fontes de alta legibilidade e maior contraste.',
        price: 3.0,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/pt/a/ae/Doki_Doki_Literature_Club_Capa.jpg',
        category: ModCategory.DESCONTO_GRANDE,
      },

      {
        title: 'Alice: Madness Returns',
        description:
          'Filtros que destacam plataformas e personagem.',
        price: 10.0,
        imageUrl:
          'https://m.media-amazon.com/images/I/71RgYPhcYaL._AC_UF1000,1000_QL80_.jpg',
        category: ModCategory.DESCONTO_GRANDE,
      },
    ],
  });

  // Seed dos produtos
  await prisma.product.createMany({
    data: [
      {
        title: 'Mouse Ergonômico',
        description:
          'Mouse ergonômico desenvolvido para proporcionar maior conforto durante longos períodos de uso.',
        price: 49.9,
        stock: 20,
        category: 'PERIFERICOS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Mouse Adaptado para Braço',
        description:
          'Mouse adaptado para usuários com mobilidade reduzida nos dedos e mãos.',
        price: 99.9,
        stock: 15,
        category: 'PERIFERICOS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Kit Mouses Adaptados e Joystick',
        description:
          'Kit completo com mouse adaptado e joystick para maior acessibilidade.',
        price: 179.9,
        stock: 10,
        category: 'PERIFERICOS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Mouse Adaptado para Pé',
        description:
          'Mouse desenvolvido para utilização através dos pés.',
        price: 99.9,
        stock: 12,
        category: 'PERIFERICOS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Mouse Ergonômico Adaptado',
        description:
          'Modelo ergonômico com adaptações para diferentes necessidades de acessibilidade.',
        price: 59.9,
        stock: 18,
        category: 'PERIFERICOS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Mouse Gamer Ergonômico',
        description:
          'Mouse gamer ergonômico com design voltado para conforto e desempenho.',
        price: 79.9,
        stock: 15,
        category: 'PERIFERICOS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Controle Adaptado para Nintendo Switch',
        description:
          'Controle adaptado para oferecer maior acessibilidade em jogos de Nintendo Switch.',
        price: 249.99,
        stock: 8,
        category: 'PERIFERICOS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Controle Adaptado para Xbox Series X',
        description:
          'Controle adaptado para usuários com necessidades de acessibilidade no Xbox Series X.',
        price: 239.9,
        stock: 8,
        category: 'PERIFERICOS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Controle Adaptado para PlayStation 5',
        description:
          'Controle adaptado para proporcionar acessibilidade em jogos de PS5.',
        price: 239.9,
        stock: 8,
        category: 'PERIFERICOS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Headset Gamer Adaptado',
        description:
          'Headset gamer adaptado para maior conforto e acessibilidade.',
        price: 129.9,
        stock: 12,
        category: 'PERIFERICOS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Headset Gamer com Microfone Adaptado',
        description:
          'Headset gamer com microfone integrado e recursos de acessibilidade.',
        price: 149.9,
        stock: 12,
        category: 'PERIFERICOS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Camisa AccessGame',
        description:
          'Camiseta oficial da AccessGame.',
        price: 54.9,
        stock: 30,
        category: 'ROUPAS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Babylook AccessGame',
        description:
          'Babylook oficial da AccessGame.',
        price: 54.9,
        stock: 25,
        category: 'ROUPAS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Camisa Regata AccessGame',
        description:
          'Camisa regata oficial da AccessGame.',
        price: 49.9,
        stock: 25,
        category: 'ROUPAS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Blusa Moletom com Capuz AccessGame',
        description:
          'Moletom com capuz oficial da AccessGame.',
        price: 89.9,
        stock: 20,
        category: 'ROUPAS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },

      {
        title: 'Blusa Moletom Careca AccessGame',
        description:
          'Moletom careca oficial da AccessGame.',
        price: 84.9,
        stock: 20,
        category: 'ROUPAS',
        imageUrl:
          'https://down-br.img.susercontent.com/file/c49135d660d5ffb0c936fcc1c50694d2',
      },
    ],
  });

  console.log('Seed executada com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });