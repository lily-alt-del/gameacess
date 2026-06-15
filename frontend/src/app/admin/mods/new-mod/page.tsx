'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewModPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] =
    useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] =
    useState('');
  const [category, setCategory] =
    useState('DESCUBRA');

  async function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    if (
        !title.trim() ||
        !description.trim() ||
        !imageUrl.trim() ||
        !price ||
        !category
    ) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      const token =
        localStorage.getItem('token');

      const response = await fetch(
        'http://localhost:3001/mods',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title,
            description,
            imageUrl,
            category,
            price: Number(price),
          }),
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      alert('Mod criado com sucesso!');

      router.push('/admin/mods');
    } catch {
      alert('Erro ao criar mod');
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-10">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Novo Mod
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="rounded bg-zinc-800 p-3 text-white"
        />

        <textarea
          placeholder="Descrição"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          className="rounded bg-zinc-800 p-3 text-white"
        />

        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="rounded bg-zinc-800 p-3 text-white"
        />

        <input
          type="text"
          placeholder="URL da imagem"
          value={imageUrl}
          onChange={(e) =>
            setImageUrl(e.target.value)
          }
          className="rounded bg-zinc-800 p-3 text-white"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="rounded bg-zinc-800 p-3 text-white"
        >
          <option value="DESCUBRA">
            DESCUBRA
          </option>

          <option value="DESCONTO_PRINCIPAL">
            DESCONTO_PRINCIPAL
          </option>

          <option value="DESCONTO_GRANDE">
            DESCONTO_GRANDE
          </option>
        </select>

        <button
          type="submit"
          className="rounded bg-green-600 p-3 text-white"
        >
          Cadastrar Mod
        </button>
      </form>
    </main>
  );
}