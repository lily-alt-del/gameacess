'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/user';
import { useUser } from '@/context/UserContext';

export default function RegisterPage() {
  const router = useRouter();
  const { setUser } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '', // 👈 NOVO
  });

  const isValidImageUrl = (url: string) => {
    if (!url) return false;

    try {
      const parsed = new URL(url);
      return /\.(jpg|jpeg|png|webp|gif)$/i.test(parsed.pathname);
    } catch {
      return false;
    }
  };

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, avatar } = formData;

    // 🔐 validações
    if (!name || !email || !password || !confirmPassword) {
      return alert('Preencha todos os campos');
    }

    if (password.length < 6) {
      return alert('A senha deve ter pelo menos 6 caracteres');
    }

    if (password !== confirmPassword) {
      return alert('As senhas não coincidem');
    }

    try {
      setLoading(true);

      const data = await registerUser({
        name,
        email,
        password,
        avatar: avatar || undefined, // 👈 ENVIA AVATAR
      });

      // 👇 login automático com avatar real
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        avatar: data.avatar || '/default-avatar.png',
      });

      router.push('/');
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Erro ao cadastrar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='flex min-h-screen items-center justify-center bg-cover bg-center'
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      {/* OVERLAY */}
      <div className='absolute inset-0 bg-black/70'></div>

      <div className='relative z-10 w-full max-w-md'>
        {/* Botão Voltar */}
        <Link
          href='/'
          className='mb-8 flex items-center gap-2 text-purple-400 transition-colors hover:text-purple-300'
        >
          <ArrowLeft className='h-4 w-4' />
          <span className='text-sm font-medium'>Voltar para a loja</span>
        </Link>

        {/* Card */}
        <div className='flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-xl'>
          <h1 className='mb-2 text-3xl font-bold text-white'>Cadastrar</h1>

          <p className='mb-6 text-purple-400'>
            Crie sua conta para começar a comprar.
          </p>

          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Avatar Preview */}
            {isValidImageUrl(formData.avatar) && (
              <div className='flex justify-center'>
                <div className='h-20 w-20 overflow-hidden rounded-full border border-white'>
                  <Image
                    src={formData.avatar}
                    alt='Preview'
                    width={80}
                    height={80}
                    className='h-full w-full object-cover'
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/default-avatar.png';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Avatar URL */}
            <div>
              <label className='mb-2 block text-sm text-purple-200'>
                URL do Avatar (opcional)
              </label>
              <input
                type='text'
                name='avatar'
                value={formData.avatar}
                onChange={handleChange}
                className='bg-dark-bg border-dark-border w-full rounded-lg border px-4 py-3 text-white'
                placeholder='https://imagem.com/avatar.png'
              />
            </div>

            {/* Nome */}
            <div>
              <label className='mb-2 block text-sm text-purple-200'>
                Nome Completo
              </label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='bg-dark-bg border-dark-border w-full rounded-lg border px-4 py-3 text-white'
                placeholder='Seu nome completo'
              />
            </div>

            {/* Email */}
            <div>
              <label className='mb-2 block text-sm text-purple-200'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='bg-dark-bg border-dark-border w-full rounded-lg border px-4 py-3 text-white'
                placeholder='seu@email.com'
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
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='bg-dark-bg border-dark-border w-full rounded-lg border px-4 py-3 text-white'
                  placeholder='******'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute top-1/2 right-3 -translate-y-1/2 text-purple-400'
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirmar senha */}
            <div>
              <label className='mb-2 block text-sm text-purple-200'>
                Confirmar Senha
              </label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='bg-dark-bg border-dark-border w-full rounded-lg border px-4 py-3 text-white'
                  placeholder='******'
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute top-1/2 right-3 -translate-y-1/2 text-purple-400'
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Termos */}
            <div className='flex items-start'>
              <input
                type='checkbox'
                id='terms'
                className='mt-1 h-4 w-4 accent-purple-600'
                required
              />
              <label htmlFor='terms' className='ml-2 text-sm text-purple-300'>
                Concordo com os{' '}
                <Link href='#' className='text-purple-400 underline'>
                  Termos
                </Link>
              </label>
            </div>

            {/* Botão */}
            <button
              type='submit'
              disabled={loading}
              className='w-full rounded bg-purple-600 py-3 font-semibold hover:bg-purple-700 disabled:opacity-50'
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>

          <div className='my-6 flex items-center gap-4'>
            <div className='bg-dark-border h-px flex-1'></div>
            <span className='text-sm text-purple-400'>ou</span>
            <div className='bg-dark-border h-px flex-1'></div>
          </div>

          <p className='text-center text-sm text-purple-400'>
            Já tem conta?{' '}
            <Link href='/login' className='font-semibold text-purple-300'>
              Faça login
            </Link>
          </p>
        </div>

        <p className='mt-6 text-center text-xs text-white'>
          Seus dados são protegidos
        </p>
      </div>
    </div>
  );
}

// https://pin.it/1GoDbB1a2
