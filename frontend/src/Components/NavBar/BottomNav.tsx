import { Search } from 'lucide-react';
import Link from 'next/link';
import { IoShirt } from 'react-icons/io5';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BottomNav() {
  const [search, setSearch] = useState('');

  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(`/search?q=${encodeURIComponent(search)}`);
  }

  return (
    <>
      <div className='flex h-auto items-center justify-around border-b border-purple-800 text-white'>
        <form
          onSubmit={handleSearch}
          className='flex h-full items-center'
          style={{ paddingTop: 15, paddingBottom: 15 }}
        >
          <input
            type='search'
            placeholder='Buscar...'
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className='rounded-l-md border-t border-b border-l border-purple-700 text-white outline-none'
            style={{ padding: 7 }}
          ></input>
          <button
            type='submit'
            className='cursor-pointer rounded-r-md border-t border-r border-b border-purple-700 p-2'
            style={{ padding: 9 }}
          >
            <Search size={20} color='white' />
          </button>
        </form>

        {/* 2. MENU DROPDOWN (Agora dentro do grupo da direita) */}
        <div className='group relative'>
          <button className='flex items-center gap-2 py-2 text-lg text-white transition-colors hover:text-[#a855f7]'>
            Produtos
            <i className='bi bi-chevron-down text-sm transition-transform duration-300 group-hover:rotate-180'></i>
          </button>

          <div className='invisible absolute top-full left-0 z-50 mt-1 w-56 overflow-hidden rounded-lg border border-zinc-800 bg-[#0f0a1b] opacity-0 shadow-2xl transition-all duration-300 group-hover:visible group-hover:opacity-100'>
            <div className='flex flex-col'>
              <Link
                href='/produtos/camisetas'
                className='flex items-center gap-3 border-b border-zinc-800/50 px-5 py-3 text-zinc-300 transition-colors hover:bg-zinc-800/50 hover:text-purple-500'
              >
                <IoShirt />
                Roupas
              </Link>
              <Link
                href='/produtos/perifericos'
                className='flex items-center gap-3 border-b border-zinc-800/50 px-5 py-3 text-zinc-300 transition-colors hover:bg-zinc-800/50 hover:text-purple-500'
              >
                <i className='bi bi-mouse2-fill'></i>
                Periféricos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
