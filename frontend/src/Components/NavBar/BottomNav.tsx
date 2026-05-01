import { Search } from 'lucide-react';
import Link from 'next/link';
import { IoShirt } from "react-icons/io5";
import { GiPirateCoat } from "react-icons/gi";

export default function BottomNav() {
    return(
        <>
        <div className="h-auto text-white border-b border-purple-800 flex items-center justify-around">
            <form className="flex items-center h-full" style={{ paddingTop: 15, paddingBottom: 15 }}>
                <input type="search" placeholder="Buscar..." className="border-l border-t border-b rounded-l-md border-purple-700 outline-none text-white" style={{ padding: 7 }} ></input>
                <button type="submit" className=" border-t border-r border-b rounded-r-md border-purple-700 p-2 cursor-pointer" style={{ padding: 9 }} >
                    <Search size={20} color="white" />
                </button>
            </form>

            {/* 2. MENU DROPDOWN (Agora dentro do grupo da direita) */}
        <div className="relative group">
          <button className="text-white hover:text-[#a855f7] transition-colors flex items-center gap-2 py-2 text-lg">
            Produtos
            <i className="bi bi-chevron-down text-sm transition-transform duration-300 group-hover:rotate-180"></i>
          </button>

          <div className="absolute left-0 top-full mt-1 w-56 bg-[#0f0a1b] border border-zinc-800 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden">
            <div className="flex flex-col">
              <Link href="/produtos/camisetas" className="text-zinc-300 hover:text-white hover:bg-zinc-800/50 px-5 py-3 transition-colors border-b border-zinc-800/50 flex items-center gap-3">
              <IoShirt />
                Camisetas
              </Link>
              <Link href="/produtos/moletons" className="text-zinc-300 hover:text-white hover:bg-zinc-800/50 px-5 py-3 transition-colors border-b border-zinc-800/50 flex items-center gap-3">
                <GiPirateCoat />
                Moletons
              </Link>
              <Link href="/produtos/perifericos" className="text-zinc-300 hover:text-white hover:bg-zinc-800/50 px-5 py-3 transition-colors border-b border-zinc-800/50 flex items-center gap-3">
                <i className="bi bi-mouse2-fill"></i>
                Periféricos
              </Link>
              <Link href="/produtos/colecionaveis" className="text-zinc-300 hover:text-white hover:bg-zinc-800/50 px-5 py-3 transition-colors flex items-center gap-3">
                <i className="bi bi-box2-fill"></i>
                Colecionáveis
              </Link>
            </div>
          </div>
        </div>

        </div>
        </>
    )
}