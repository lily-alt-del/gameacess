'use client';

import { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  createdAt: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        'http://localhost:3001/users',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteUser(id: number) {
    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir este usuário?',
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(
        `http://localhost:3001/users/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          'Erro ao excluir usuário',
        );
      }

      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user.id !== id,
        ),
      );
    } catch (error) {
      console.error(error);

      alert(
        'Não foi possível excluir o usuário.',
      );
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return (
      <main className="p-10">
        <h1 className="text-3xl font-bold text-white">
          Carregando usuários...
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl p-10">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Gerenciar Usuários
      </h1>

      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-xl bg-zinc-900 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {user.name}
                </h2>

                <p className="text-zinc-400">
                  {user.email}
                </p>

                <div className="mt-2 flex gap-2">
                  <span className="rounded bg-zinc-700 px-3 py-1 text-sm text-white">
                    ID: {user.id}
                  </span>

                  <span
                    className={`rounded px-3 py-1 text-sm text-white ${
                      user.role === 'ADMIN'
                        ? 'bg-red-600'
                        : 'bg-blue-600'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>

              {user.role !== 'ADMIN' && (
                <button
                  onClick={() =>
                    deleteUser(user.id)
                  }
                  className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                >
                  Excluir
                </button>
              )}
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <div className="rounded-xl bg-zinc-900 p-6 text-center text-zinc-400">
            Nenhum usuário encontrado.
          </div>
        )}
      </div>
    </main>
  );
}
