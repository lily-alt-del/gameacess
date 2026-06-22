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
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1781657041/tomodachi_life_bqwgye.png',
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
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782142445/ultrakill_nxyfil.png',
        category: ModCategory.DESCUBRA,
      },

      {
        title: 'Portal 2',
        description:
          'Legendas aprimoradas e indicadores visuais para sons importantes.',
        price: 17.02,
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782142686/portal_2_rocawu.png',
        category: ModCategory.DESCUBRA,
      },

      {
        title: 'Animal Crossing',
        description:
          'Textos mais claros e ritmo mais tranquilo para jogar sem pressa.',
        price: 5.44,
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782144643/animal_crossing_tupirp.png',
        category: ModCategory.DESCUBRA,
      },

      {
        title: 'Subway Surfers',
        description:
          'Controles simplificados e feedback visual mais evidente.',
        price: 3.28,
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782144750/subway_surf_hupvjv.png',
        category: ModCategory.DESCUBRA,
      },

      {
        title: 'Plants vs Zombies',
        description:
          'Sinais visuais substituem sons importantes do jogo.',
        price: 4.3,
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782144968/subway_surf_dbxrhr.png',
        category: ModCategory.DESCUBRA,
      },

      {
        title: 'Angry Birds',
        description:
          'Ajustes de toque e precisão para facilitar os lançamentos.',
        price: 5.3,
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782145167/angry_birds_u0vvhx.png',
        category: ModCategory.DESCUBRA,
      },

      // DESCONTO_PRINCIPAL

      {
        title: 'Vampire Survivors',
        description:
          'Automação de cliques e seleção de itens para jogar usando apenas um botão.',
        price: 9.9,
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782145427/vampire_survivors_ibgeme.png',
        category: ModCategory.DESCONTO_PRINCIPAL,
      },

      {
        title: 'Stardew Valley',
        description:
          'Leitor de tela completo que narra menus e diálogos.',
        price: 39.4,
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782145442/Stardew_poe2gd.png',
        category: ModCategory.DESCONTO_PRINCIPAL,
      },

      {
        title: 'Terraria',
        description:
          'Mira automática e assistência de construção.',
        price: 19.8,
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782145528/terraria_yppeap.png',
        category: ModCategory.DESCONTO_PRINCIPAL,
      },

      {
        title: 'Plague Inc.',
        description:
          'Interface com fontes ampliadas e alto contraste.',
        price: 5.0,
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782145599/plague_inc_fzn8xa.png',
        category: ModCategory.DESCONTO_PRINCIPAL,
      },

      {
        title: 'Postal 2',
        description:
          'Indicadores visuais que apontam a direção de tiros e alarmes.',
        price: 4.99,
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782145755/Postal_2_jy4pif.png',
        category: ModCategory.DESCONTO_PRINCIPAL,
      },

      {
        title: 'Company of Heroes',
        description:
          'Permite pausar ou desacelerar o combate em tempo real.',
        price: 7.5,
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782145838/heros_rxpcx2.png',
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
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782136790/mouse_ergonomico_uznwgn.png',
      },

      {
        title: 'Mousepad Adaptado para Braço',
        description:
          'Mouse adaptado para usuários com mobilidade reduzida nos dedos e mãos.',
        price: 99.9,
        stock: 15,
        category: 'PERIFERICOS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782137401/mouse_bra%C3%A7o_bs52dg.png',
      },

      {
        title: 'Joystick para computador',
        description:
          'Joystick para maior acessibilidade de pessoas com baixa mobilidade nas mãos.',
        price: 179.9,
        stock: 10,
        category: 'PERIFERICOS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782137902/joystick_1_pxzj88.png',
      },

      {
        title: 'Mouse Adaptado para Pé',
        description:
          'Mouse desenvolvido para utilização através dos pés.',
        price: 99.9,
        stock: 12,
        category: 'PERIFERICOS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782138307/mouse_de_pe_bcuzaq.webp',
      },

      {
        title: 'Mouse Ergonômico Adaptado',
        description:
          'Modelo ergonômico com adaptações para diferentes necessidades de acessibilidade.',
        price: 59.9,
        stock: 18,
        category: 'PERIFERICOS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782138475/ergonomico_kgnhqf.png',
      },

      {
        title: 'Mouse Gamer Ergonômico',
        description:
          'Mouse gamer ergonômico com design voltado para conforto e desempenho.',
        price: 79.9,
        stock: 15,
        category: 'PERIFERICOS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782138604/ergonomico_gamer_1_qg057e.png',
      },

      {
        title: 'Controle Adaptado para Nintendo Switch',
        description:
          'Controle adaptado para oferecer maior acessibilidade em jogos de Nintendo Switch.',
        price: 249.99,
        stock: 8,
        category: 'PERIFERICOS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782138753/switch_adaptado_or8dsk.png',
      },

      {
        title: 'Controle Adaptado para Xbox Series X',
        description:
          'Controle adaptado para usuários com necessidades de acessibilidade no Xbox Series X.',
        price: 239.9,
        stock: 8,
        category: 'PERIFERICOS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782139047/series_x_adaptado_fcrkfv.png',
      },

      {
        title: 'Controle Adaptado para PlayStation 5',
        description:
          'Controle adaptado para proporcionar acessibilidade em jogos de PS5.',
        price: 239.9,
        stock: 8,
        category: 'PERIFERICOS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782139151/ps5_adaptado_huxhss.png',
      },

      {
        title: 'Headset Adaptado',
        description:
          'Headset adaptado com cancelamento de ruídos para maior conforto e acessibilidade.',
        price: 129.9,
        stock: 12,
        category: 'PERIFERICOS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782139716/headset_adaptado_1_xmpswk.png',
      },

      {
        title: 'Headset Gamer com Microfone Adaptado',
        description:
          'Headset gamer com microfone integrado e cancelamento de ruídos.',
        price: 149.9,
        stock: 12,
        category: 'PERIFERICOS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782139445/headset_adaptado_aljccu.png',
      },

      {
        title: 'Camisa AccessGame',
        description:
          'Camiseta oficial da AccessGame.',
        price: 54.9,
        stock: 30,
        category: 'ROUPAS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782139897/camisa_vm53bv.png',
      },

      {
        title: 'Babylook AccessGame',
        description:
          'Babylook oficial da AccessGame.',
        price: 54.9,
        stock: 25,
        category: 'ROUPAS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782140208/babylook_jmwte5.png',
      },

      {
        title: 'Camisa Regata AccessGame',
        description:
          'Camisa regata oficial da AccessGame.',
        price: 49.9,
        stock: 25,
        category: 'ROUPAS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782140242/regata_zucl89.png',
      },

      {
        title: 'Blusa Moletom com Capuz AccessGame',
        description:
          'Moletom com capuz oficial da AccessGame.',
        price: 89.9,
        stock: 20,
        category: 'ROUPAS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782140277/capuz_aqqdi8.png',
      },

      {
        title: 'Blusa Moletom Careca AccessGame',
        description:
          'Moletom careca oficial da AccessGame.',
        price: 84.9,
        stock: 20,
        category: 'ROUPAS',
        imageUrl:
          'https://res.cloudinary.com/drhmcuxiy/image/upload/v1782140303/careca_yjet4z.png',
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