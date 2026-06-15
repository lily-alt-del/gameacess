export default function AdminPage() {
  return (
    <main className="mx-auto max-w-5xl p-10">
      <h1 className="mb-10 text-4xl font-bold text-white">
        Painel Administrativo
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        <a
          href="/admin/users"
          className="rounded-xl bg-zinc-900 p-6 transition hover:bg-zinc-800"
        >
          <h2 className="mb-2 text-2xl font-bold text-white">
            Usuários
          </h2>

          <p className="text-zinc-400">
            Gerenciar usuários cadastrados.
          </p>
        </a>

        <a
          href="/admin/mods"
          className="rounded-xl bg-zinc-900 p-6 transition hover:bg-zinc-800"
        >
          <h2 className="mb-2 text-2xl font-bold text-white">
            Mods
          </h2>

          <p className="text-zinc-400">
            Gerenciar mods da loja.
          </p>
        </a>

        <a
          href="/admin/produtos"
          className="rounded-xl bg-zinc-900 p-6 transition hover:bg-zinc-800"
        >
          <h2 className="mb-2 text-2xl font-bold text-white">
            Produtos
          </h2> 

          <p className="text-zinc-400">
            Gerenciar produtos da loja.
          </p>
        </a>
      </div>
    </main>
  );
}