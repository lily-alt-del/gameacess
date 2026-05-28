import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#121212] border-t border-zinc-800 text-zinc-400 py-10 px-6 mt-20 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
        
        {/* Redes Sociais */}
       <div>
  <h4 className="text-white font-bold mb-4 tracking-wide text-xs uppercase">Nos siga nas redes sociais</h4>
  <div className="flex gap-4">
    {/* Facebook */}
    <Link href="https://facebook.com" target="_blank" className="hover:opacity-80 transition">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/733/733547.png" // Link do ícone do Facebook
        alt="Facebook" 
        className="w-6 h-6 object-contain invert" // 'invert' deixa o ícone branco para combinar com o tema escuro
      />
    </Link>

    {/* Instagram */}
    <Link href="https://instagram.com" target="_blank" className="hover:opacity-80 transition">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" // Link do ícone do Instagram
        alt="Instagram" 
        className="w-6 h-6 object-contain invert"
      />
    </Link>

    {/* X (Antigo Twitter) */}
    <Link href="https://x.com" target="_blank" className="hover:opacity-80 transition">
      <img 
        src="https://cdn-icons-png.flaticon.com/512/5969/5969020.png" // Link do ícone do X
        alt="X" 
        className="w-6 h-6 object-contain invert"
      />
    </Link>
  </div>
</div>
        {/* Fique Ligado (WhatsApp Form) */}
        <div>
          <h4 className="text-white font-bold mb-4 tracking-wide text-xs uppercase">Fique Ligado</h4>
          <div className="flex items-center gap-2">
            <span className="text-xl">💬</span>
            <div className="relative flex items-center">
              <input 
                type="email" 
                placeholder="Seu Email ou WhatsApp" 
                className="bg-zinc-800 text-white text-sm px-4 py-2.5 rounded-l w-64 focus:outline-none border border-zinc-700 border-r-0"
              />
              <button className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2.5 rounded-r transition font-bold">
                ➔
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-zinc-800 my-6" />

      {/* Direitos Autorais e Dados */}
      <div className="text-center text-xs text-zinc-500 flex flex-col gap-2">
        <p>© 2026 Access Game. Todos os direitos reservados.</p>
        <p>
          Política de privacidade | Termos de utilização | Access Game / CNPJ: XX.XXX.XXX/YYYY-ZZ / Rua: XXXXXXXXX, ZZZ - Bairro: XXXXX / Caraguatatuba / SP CEP: XXXXX-ZZZ
        </p>
      </div>
    </footer>
  );
}