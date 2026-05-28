import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-[#121212] text-white px-6 py-4 flex justify-between items-center border-b border-zinc-800">
      {/* Logo e Nome */}
      <div className="flex items-center gap-3">
       {/* Substitua aquela div antiga por este bloco: */}
<div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-zinc-900 border border-zinc-800">
  <img 
    src="/logo.jpeg" // O Next já entende que a barra "/" puxa direto de dentro da pasta public
    alt="Logo Access Game" 
    className="w-full h-full object-cover"
  />
</div>
        <span className="text-xl font-black tracking-wider">ACCESS GAME</span>
      </div>
      
      {/* Botões de Acesso */}
      <div className="flex items-center gap-4">
        <Link href="#" className="px-4 py-2 text-sm bg-zinc-800 hover:bg-zinc-700 rounded border border-zinc-700 transition">
          Entrar
        </Link>
        <Link href="#" className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded font-medium transition">
          Cadastrar
        </Link>
      </div>
    </header>
  );
}