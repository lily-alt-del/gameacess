import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
  <footer 
     className="w-full bg-[#0a0a0a] text-white pb-8 border-t border-zinc-800 font-sans mt-auto"
      style={{ paddingInline: '15%', paddingTop: '13px' }}>
     <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        {/* ESQUERDA: Redes Sociais */}
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl font-black uppercase tracking-wide font-anton text-zinc-100">
            Nos siga nas redes sociais
          </h3>
          <div className="flex items-center gap-5">
            <a href="#" className="text-white hover:text-purple-500 transition-colors">
              <i className="bi bi-facebook text-3xl"></i>
            </a>
            <a href="#" className="text-white hover:text-purple-500 transition-colors">
              <i className="bi bi-instagram text-3xl"></i>
            </a>
            <a href="#" className="text-white hover:text-purple-500 transition-colors">
              {/* O ícone do Twitter/X mudou recentemente, bi-twitter-x é o mais novo no Bootstrap */}
              <i className="bi bi-twitter-x text-3xl"></i>
            </a>
          </div>
        </div>

        {/* DIREITA: Newsletter / WhatsApp */}
        <div className="flex flex-col gap-5 w-full md:w-auto md:items-end">
          <h3 className="text-2xl font-black uppercase tracking-wide font-anton text-zinc-100">
            Fique ligado
          </h3>
          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Ícone do WhatsApp */}
            <a href="#" className="text-white hover:text-green-500 transition-colors">
              <i className="bi bi-whatsapp text-3xl"></i>
            </a>
            
            {/* Input de Email (Estilo pílula) */}
            <div className="flex items-center bg-[#52525b] rounded-full px-4 py-2 w-full md:w-72 border border-zinc-500 focus-within:border-purple-500 transition-colors">
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-transparent border-none outline-none text-white placeholder-zinc-300 w-full text-sm"
              />
              {/* Linha vertical divisória */}
              <div className="w-px h-5 bg-zinc-400 mx-3"></div>
              {/* Botão de Enviar */}
              <button className="text-zinc-300 hover:text-white transition-colors">
                <i className="bi bi-send-fill text-sm"></i>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* TEXTOS LEGAIS (Parte de baixo) */}
   <div className="w-full mt-16 flex flex-col items-center gap-3 text-center">
        <p className="text-zinc-300 text-sm">
          © 2026 Access Game. Todos os direitos reservados
        </p>
        <p className="text-zinc-500 text-[10px] sm:text-xs max-w-4xl leading-relaxed">
          Política de privacidade | Termos de utilização | Access Game / CNPJ: XX.XXX.XXX/YYYY-ZZ / Rua: XXXXXXXXX, ZZZ - Bairro: XXXXX / Caraguatatuba / SP CEP: XXXXX-ZZZ
        </p>
      </div>
    </footer>
  );
}