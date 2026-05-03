'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/user';
import { useUser } from '@/context/UserContext';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();

  const [showPassword, setShowPassword] = useState(false);

  // 👇 NOVOS STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 👇 FUNÇÃO DE LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // evita reload da página

    try {
      const data = await loginUser({ email, password });

      // 👇 salva usuário no contexto
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        avatar: data.avatar || '/default-avatar.png',
      });

      // 👇 redireciona pra home
      router.push('/');

    } catch (error) {
      console.error('Erro no login:', error);
      alert('Email ou senha inválidos');
    }
  };

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover bg-center'
        style={{ backgroundImage: "url('/background.jpg')" }}
      />

      <div className='absolute inset-0 bg-black/70'></div>

      <div className='relative w-full max-w-xl p-10 py-10'>
        
        <Link
          href='/'
          className='mb-8 flex items-center gap-2 text-purple-400 hover:text-purple-300'
        >
          ← <span className='text-sm'>Voltar para a loja</span>
        </Link>

        <div className='h-100 rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col justify-center' style={{ padding: '60px' }}>

          <h1 className='mb-2 text-3xl font-bold text-white'>Entrar</h1>

          <p className='mb-8 text-purple-200 text-md'>
            Acesse sua conta para continuar suas compras.
          </p>

          {/* 👇 FORM COM SUBMIT */}
          <form className='space-y-4' onSubmit={handleLogin}>
            
            {/* Email */}
            <div>
              <label className='mb-2 block text-sm text-purple-200'>
                Email
              </label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-dark-bg border-dark-border w-full rounded-lg border px-4 py-3 text-white placeholder:text-purple-500 focus:border-purple-500 focus:outline-none'
                placeholder='seu@email.com'
                style={styles.label}
              />
            </div>

            {/* Senha */}
            <div>
              <label className='mb-2 block text-sm text-purple-200'>
                Senha
              </label>

              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='bg-dark-bg border-dark-border w-full rounded-lg border px-4 py-3 pr-10 text-white placeholder:text-purple-500 focus:border-purple-500 focus:outline-none'
                  placeholder='******'
                  style={styles.label}
                />

                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute top-1/2 right-3 -translate-y-1/2 text-purple-400'
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
            </div>

            <div className='flex items-center'>
              <input
                type='checkbox'
                id='remember'
                className='h-4 w-4 accent-purple-600'
              />
              <label
                htmlFor='remember'
                className='ml-2 text-sm text-purple-300'
              >
                Lembrar de mim
              </label>
            </div>

            {/* 👇 BOTÃO AGORA FUNCIONA */}
            <button
              type='submit'
              className='w-full rounded-lg bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700'
            >
              Entrar
            </button>
          </form>

          <div className='my-6 flex items-center gap-4'>
            <div className='bg-dark-border h-px flex-1'></div>
            <span className='text-sm text-purple-400'>ou</span>
            <div className='bg-dark-border h-px flex-1'></div>
          </div>

          <div className='space-y-2 text-center text-sm'>
            <p className='text-purple-400'>
              Não tem conta?{' '}
              <Link
                href='/register'
                className='font-semibold text-purple-300 hover:text-purple-200'
              >
                Cadastre-se
              </Link>
            </p>

            <Link
              href='#'
              className='block text-purple-400 hover:text-purple-300'
            >
              Esqueceu a senha?
            </Link>
          </div>
        </div>

        <p className='mt-8 text-center text-xs text-white'>
          Ao entrar, você concorda com nossos Termos de Serviço e Política de
          Privacidade
        </p>
      </div>
    </div>
  );
}

const styles = {
  label: {
    paddingBlock: '7px',
  }
};