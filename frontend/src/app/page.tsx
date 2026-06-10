"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Mod {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export default function Home() {
  const [descubraMods, setDescubraMods] = useState<Mod[]>([]);
  const [descontosPrincipais, setDescontosPrincipais] = useState<Mod[]>([]);
  const [descontosGrandes, setDescontosGrandes] = useState<Mod[]>([]);

  useEffect(() => {
    async function carregarMods() {
      try {
        const [descubraResponse, principalResponse, grandeResponse] = await Promise.all([
          fetch("http://localhost:3001/mods/category/DESCUBRA"),
          fetch("http://localhost:3001/mods/category/DESCONTO_PRINCIPAL"),
          fetch("http://localhost:3001/mods/category/DESCONTO_GRANDE"),
        ]);

        setDescubraMods(await descubraResponse.json());
        setDescontosPrincipais(await principalResponse.json());
        setDescontosGrandes(await grandeResponse.json());
      } catch (error) {
        console.error("Erro ao carregar mods:", error);
      }
    }

    carregarMods();
  }, []);

  const bannerData = {
    title: "Bayonetta",
    img: "https://www.switchscores.com/img/ps-header/hdr-449-bayonetta-2-260416.jpg",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div>
        
        <div className="w-full relative bg-zinc-900 overflow-hidden mb-12" style={{ height: "800px" }}>
          <img src={bannerData.img} alt={bannerData.title} className="w-full h-full object-cover brightness-[0.45]" />
        </div>

        <main className="max-w-7xl px-6 flex flex-col gap-16" style={{ paddingTop: '50px', paddingBottom: '50px', margin: '0 auto' }}>
          {/* DESCUBRA ALGO NOVO */}
          <section>
            <h2 className="text-4xl text-gray-100 font-bold uppercase tracking-wider mb-6" style={{ paddingBottom: '20px' }}>Descubra algo novo</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {descubraMods.map((mod) => (
                <Link
                  key={mod.id}
                  href={`/mods/${mod.id}`}
                  className="group cursor-pointer flex flex-col gap-3">
                  <div className="aspect-[3/4] bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden group-hover:border-purple-500 group-hover:border-4 transition duration-300">
                    <img src={mod.imageUrl} alt={mod.title} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-zinc-300 group-hover:text-purple-300 transition line-clamp-1">{mod.title}</h3>

                    <p className="text-xs text-green-400 font-bold mt-0.5">R$ {mod.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* DESCONTOS EM DESTAQUE */}
          <section>
            <h2 className="text-4xl text-gray-100 font-bold uppercase tracking-wider mb-6" style={{ paddingBottom: '20px' }}>Descontos em Destaque</h2>

            {/* GRID SUPERIOR */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8" style={{ paddingBottom: '20px' }}>
              {descontosPrincipais.map((mod) => (
                <Link
                  key={mod.id}
                  href={`/mods/${mod.id}`}
                  className="group cursor-pointer flex flex-col gap-2">
                  <div className="aspect-[3/4] bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden group-hover:border-purple-500 group-hover:border-2 transition duration-300">
                    <img src={mod.imageUrl} alt={mod.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                  <h3 className="text-xs font-medium text-zinc-400 group-hover:text-purple-300 transition line-clamp-1">{mod.title}</h3>

                  <p className="text-sm text-green-400 font-bold mt-0.5">R$ {mod.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* GRID INFERIOR */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {descontosGrandes.map((mod) => (
                <Link
                  key={mod.id}
                  href={`/mods/${mod.id}`}
                  className="group cursor-pointer flex flex-col gap-3">
                  <div className="aspect-video bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group-hover:border-purple-500 group-hover:border-4 transition duration-300">
                    <img src={mod.imageUrl} alt={mod.title} className="w-full h-full object-cover" />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition">{mod.title}</h3>

                    <p className="text-sm text-green-400 font-bold mt-0.5">R$ {mod.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>

    </div>
  );
}
