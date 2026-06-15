'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditModPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [title, setTitle] = useState('');
  const [description, setDescription] =
    useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] =
    useState('');
  const [category, setCategory] =
    useState('DESCUBRA');

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadMod() {
      try {
        const response = await fetch(
          `http://localhost:3001/mods/${id}`,
        );

        const mod = await response.json();

        setTitle(mod.title);
        setDescription(mod.description);
        setPrice(mod.price.toString());
        setImageUrl(mod.imageUrl);
        setCategory(mod.category);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadMod();
    }
  }, [id]);

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
      alert(
        'Preencha todos os campos obrigatórios.',
      );

      return;
    }

    try {
      const token =
        localStorage.getItem('token');

      const response = await fetch(
        `http://localhost:3001/mods/${id}`,
        {
          method: 'PUT',

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

      alert(
        'Mod atualizado com sucesso!',
      );

      router.push('/admin/mods');
    } catch (error) {
      console.error(error);

      alert('Erro ao atualizar mod.');
    }
  }

  if (loading) {
    return (
      <div className="p-10 text-white">
        Carregando...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-10">
      <h1 className="mb-8 text-4xl font-bold text-white">
        Editar Mod
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
          className="rounded bg-blue-600 p-3 text-white"
        >
          Salvar Alterações
        </button>
      </form>
    </main>
  );
}