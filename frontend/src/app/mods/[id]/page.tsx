"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Mod {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export default function ModPage() {
  const params = useParams();

  const [mod, setMod] = useState<Mod | null>(null);

  useEffect(() => {
    async function loadMod() {
      const response = await fetch(
        `http://localhost:3001/mods/${params.id}`
      );

      const data = await response.json();

      setMod(data);
    }

    loadMod();
  }, [params.id]);

  if (!mod) {
    return (
      <div className="text-white p-10">
        Carregando...
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-10">
      <div className="grid md:grid-cols-2 gap-10">

        <div>
          <img
            src={mod.imageUrl}
            alt={mod.title}
            className="w-full rounded-xl"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold text-white">
            {mod.title}
          </h1>

          <p className="text-zinc-300">
            {mod.description}
          </p>

          <p className="text-3xl text-green-400 font-bold">
            R$ {mod.price.toFixed(2)}
          </p>

          <div className="flex gap-4 mt-4">
            <button className="bg-purple-600 px-6 py-3 rounded-lg">
              Adicionar ao Carrinho
            </button>

            <button className="bg-green-600 px-6 py-3 rounded-lg">
              Comprar Agora
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}