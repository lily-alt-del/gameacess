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

      console.log('ANTED DE SALVAR: ', data.token);

      localStorage.setItem('token', data.token);

      console.log('DEPOIS DE SALVAR: ', localStorage.getItem('token'));

      localStorage.setItem('user', JSON.stringify(data.user));

      // 👇 salva usuário no contexto
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar || '/default-avatar.png',
        role: data.user.role,
      });

      // 👇 redireciona pra home
      router.push('/');
    } catch (error) {
      console.error(error);
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

      <div className='relative w-full max-w-md'>
        <Link
          href='/'
          className='mb-8 flex items-center gap-2 text-purple-400 hover:text-purple-300'
          style={{ paddingBottom: 10 }}
        >
          ← <span className='text-sm'>Voltar para a loja</span>
        </Link>

        <div
          className='flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-xl'
          style={{ padding: 20 }}
        >
          <h1 className='mb-2 text-3xl font-bold text-white'>Entrar</h1>

          <p className='text-md mb-8 text-purple-200' style={{ paddingBottom: 20 }}>
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
                className='bg-dark-bg border-dark-border w-full rounded-lg border px-4 py-3 text-white outline-none focus:border-purple-500'
                placeholder='seu@email.com'
                style={styles.label}
              />
            </div>

            {/* Senha */}
            <div>
              <label className='mb-2 block text-sm text-purple-200' style={{ paddingTop: 10 }}>
                Senha
              </label>

              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='bg-dark-bg border-dark-border w-full rounded-lg border px-4 py-3 text-white outline-none focus:border-purple-500'
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

            <div className='flex items-center' style={{ paddingTop: 10 }}>
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
            <div className='flex justify-center' style={{ paddingTop: 10 }}>
            <button
              type='submit'
              className='text-sm border border-purple-500 rounded hover:bg-white hover:text-black transition hover:border-white cursor-pointer' style={{ padding: 8 }}
            >
              Entrar
            </button>
            </div>
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

            
          </div>
        </div>

        <p className='mt-8 text-center text-xs text-white' style={{ paddingTop: 10 }}>
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
    
  },
};
