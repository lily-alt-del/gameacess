"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams =
    useSearchParams();

  const query =
    searchParams.get("q");

  const [mods, setMods] =
    useState([]);

  useEffect(() => {
    async function loadResults() {
      if (!query) return;

      const response =
        await fetch(
          `http://localhost:3001/mods/search?q=${query}`,
        );

      const data =
        await response.json();

      setMods(data);
    }

    loadResults();
  }, [query]);

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-3xl text-white font-bold mb-8">
        Resultados para "{query}"
      </h1>

      <div className="grid grid-cols-4 gap-6">
        {mods.map((mod: any) => (
          <Link
            key={mod.id}
            href={`/mods/${mod.id}`}
          >
            <div className="cursor-pointer">
              <img
                src={mod.imageUrl}
                alt={mod.title}
                className="rounded-lg"
              />

              <h2 className="text-white mt-2">
                {mod.title}
              </h2>

              <p className="text-green-400">
                R$ {mod.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}