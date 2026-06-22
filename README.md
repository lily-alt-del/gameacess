<div align="center">

# 🎮 AccessGame

### Marketplace de Mods e Periféricos para Gamers

Plataforma desenvolvida para reunir mods de jogos e periféricos em um único ambiente moderno e acessível.

</div>

---

# 📖 Sobre o Projeto

O AccessGame é um marketplace voltado para a comunidade gamer, permitindo a descoberta e aquisição de mods para jogos e periféricos como teclados, mouses e headsets.

O projeto foi desenvolvido com foco em uma arquitetura moderna Full Stack, utilizando Next.js no frontend e NestJS no backend.

---

# 🏗️ Estrutura do Projeto

```txt
AccessGame/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── prisma/
│   └── package.json
│
└── README.md
```

---

# 🚀 Tecnologias Utilizadas

## Frontend

* Next.js
* React
* TypeScript
* TailwindCSS

## Backend

* NestJS
* Prisma ORM
* JWT Authentication
* BCrypt

## Banco de Dados

* MySQL

## Upload de Arquivos

* Cloudinary

---

# ✨ Funcionalidades

## Usuários

* Cadastro
* Login
* Logout
* Perfil personalizado
* Avatar personalizado
* Pronomes
* Biografia

## Marketplace

* Listagem de Mods
* Página individual de Mod
* Busca de Mods
* Listagem de Periféricos
* Página individual de Produto

## Carrinho

* Adicionar Mods
* Adicionar Produtos
* Alterar quantidade de produtos
* Remover itens
* Cálculo automático do total

## Administração

* Painel Administrativo
* Cadastro de Mods
* Cadastro de Produtos
* Gerenciamento do catálogo

---

# 🧱 Stack Principal

<p align="center">
<img src="https://skillicons.dev/icons?i=ts,nextjs,react,nodejs,nestjs,mysql,tailwind&theme=dark" />
</p>

---

# ⚙️ Pré-requisitos

* Node.js 18+
* MySQL 8+
* npm

---

# 🛠️ Instalação

Clone o repositório:

```bash
git clone https://github.com/SEU-USUARIO/accessgame.git

cd accessgame
```

---

# 📦 Backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo `.env`:

```env
DATABASE_URL="mysql://root:senha@localhost:3306/accessgame"

JWT_SECRET="sua_chave_secreta"

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Execute o seed:

```bash
npx prisma db seed
```

Inicie o servidor:

```bash
npm run start:dev
```

Backend disponível em:

```txt
http://localhost:3001
```

---

# 💻 Frontend

Entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

Frontend disponível em:

```txt
http://localhost:3000
```

---

# 🗄️ Banco de Dados

O projeto utiliza MySQL juntamente com Prisma ORM.

Principais entidades:

* User
* Mod
* Product
* Cart
* CartItem

---

# 📸 Upload de Imagens

As imagens dos mods, produtos e avatares são armazenadas através do Cloudinary.

---

# 🔒 Autenticação

O sistema utiliza:

* JWT (JSON Web Token)
* Guards do NestJS
* Rotas protegidas
* Controle de permissões por cargo (USER e ADMIN)

---

# 📜 Scripts Úteis

## Backend

```bash
npm run start:dev
npm run build
npm run start
npx prisma migrate dev
npx prisma studio
npx prisma db seed
```

## Frontend

```bash
npm run dev
npm run build
npm run start
```

---

# 📈 Status do Projeto

🚧 Em desenvolvimento

Funcionalidades planejadas:

* Sistema de favoritos
* Avaliações de mods
* Comentários
* Histórico de compras
* Recomendações personalizadas
* Sistema de pedidos

---

# 👨‍💻 Desenvolvedores

Desenvolvido por:

Lily dos Santos
GitHub: https://github.com/lily-alt-del

Árion Pessin:
GitHub: https://github.com/ARiN010

Gabriel Passari:
GitHub: https://github.com/Gabrielpassari

Maria Eduarda:
GitHub: https://github.com/Dudao6969

Sabrina Kaori:
GitHub: https://github.com/kaorigalarza

Henrique Joshua:
GitHub: https://github.com/henrique279
