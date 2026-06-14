export default function AdminPage() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">
        Painel Administrativo
      </h1>

      <div className="mt-8 flex flex-col gap-4">
        <a href="/admin/mods">
          Gerenciar Mods
        </a>

        <a href="/admin/users">
          Gerenciar Usuários
        </a>

        <a href="/admin/orders">
          Gerenciar Pedidos
        </a>
      </div>
    </main>
  );
}
