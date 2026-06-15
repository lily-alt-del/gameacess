'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [title, setTitle] = useState('');
  const [description, setDescription] =
    useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] =
    useState('');
  const [category, setCategory] =
    useState('PERIFERICOS');

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await fetch(
          `http://localhost:3001/products/${id}`,
        );

        const product =
          await response.json();

        setTitle(product.title);
        setDescription(
          product.description,
        );
        setPrice(
          product.price.toString(),
        );
        setStock(
          product.stock.toString(),
        );
        setImageUrl(product.imageUrl);
        setCategory(product.category);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProduct();
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
      !stock ||
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
        `http://localhost:3001/products/${id}`,
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
            stock: Number(stock),
          }),
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      alert(
        'Produto atualizado com sucesso!',
      );

      router.push('/admin/produtos');
    } catch (error) {
      console.error(error);

      alert(
        'Erro ao atualizar produto.',
      );
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
        Editar Produto
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
          type="number"
          placeholder="Estoque"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
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
          <option value="PERIFERICOS">
            PERIFERICOS
          </option>

          <option value="ROUPAS">
            ROUPAS
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