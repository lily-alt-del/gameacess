'use client';

import Link from 'next/link';
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { ArrowLeft, Camera } from 'lucide-react';

import { useUser } from '@/context/UserContext';

import { uploadImage } from '@/services/upload';
import { updateUser } from '@/services/user';

export default function EditProfilePage() {
  const { user, setUser } = useUser();

  const router = useRouter();

  // estados
  const [name, setName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [bio, setBio] = useState('');

  const [preview, setPreview] = useState('');

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  // proteção rota
  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    setName(user.name);

    setPronouns(user.pronouns || '');

    setBio(user.bio || '');

    setPreview(user.avatar || '/default-avatar.png');
  }, [user, router]);

  // upload avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // valida tipo
    if (!file.type.startsWith('image/')) {
      alert('Selecione uma imagem válida');
      return;
    }

    // valida tamanho
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB');
      return;
    }

    setAvatarFile(file);

    // preview instantâneo
    setPreview(URL.createObjectURL(file));
  };

  // salvar
  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);

      let avatarUrl = user.avatar || '';

      // upload nova imagem
      if (avatarFile) {
        avatarUrl = await uploadImage(avatarFile);
      }

      // atualizar backend
      const updatedUser = await updateUser(user.id, {
        name,
        avatar: avatarUrl,
        pronouns,
        bio,
      });

      // atualizar contexto
      setUser(updatedUser);

      // atualizar localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));

      alert('Perfil atualizado com sucesso!');

      router.push('/profile');
    } catch (error) {
      console.error(error);

      alert('Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className='min-h-screen bg-[#0f0f14] text-white'>
      {/* HEADER */}
      <div className='flex items-center gap-4 border-b border-purple-500/20 bg-purple-900' style={{ padding: 20 }}>
        <Link href='/profile'>
          <ArrowLeft 
          size={24}
          />
        </Link>

        <h1 className='text-2xl font-bold'>Editar Perfil</h1>
      </div>

      {/* CONTEÚDO */}
      <div className='mx-auto flex flex-col items-center place-self-center' style={{ paddingTop: 50 }}>
        {/* CARD */}
        <div className='rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg'>
          {/* AVATAR */}
          <div className='flex flex-col items-center'  style={{ padding: 10 }}>
            <div className='relative'>
              <div className='h-32 w-32 overflow-hidden rounded-full border-4 border-purple-500 bg-purple-700'>
                <Image
                  src={preview || '/default-avatar.png'}
                  alt='Avatar'
                  width={128}
                  height={128}
                  className='h-full w-full object-cover'
                />
              </div>

              {/* botão upload */}
              <label className='absolute right-0 bottom-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-purple-600 transition hover:bg-purple-700'>
                <Camera size={18} />

                <input
                  type='file'
                  accept='image/*'
                  onChange={handleAvatarChange}
                  className='hidden'
                />
              </label>
            </div>

            <p className='mt-4 text-sm text-purple-300'  style={{ paddingInline: 20, paddingTop: 10 }}>
              Clique no ícone para trocar o avatar
            </p>
          </div>

          {/* FORM */}
          <div className='mt-8 gap-5'  style={{ padding: 20 }}>
            {/* nome */}
            <div>
              <label className='mb-2 block text-sm text-purple-300'>Nome</label>

              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full rounded-lg border border-white/10 bg-[#1b1b25] px-4 py-3 text-white transition outline-none focus:border-purple-500'
                placeholder='Seu nome'
              />
            </div>

            {/* pronomes */}
            <div>
              <label className='mb-2 block text-sm text-purple-300'>
                APFs/Pronomes
              </label>

              <input
                type='text'
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
                className='w-full rounded-lg border border-white/10 bg-[#1b1b25] px-4 py-3 text-white transition outline-none focus:border-purple-500'
                placeholder='Ex: "a/ela/a" ou "ela/dela"'
              />
            </div>

            {/* bio */}
            <div>
              <label className='mb-2 block text-sm text-purple-300'>Bio</label>

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className='w-full resize-none rounded-lg border border-white/10 bg-[#1b1b25] px-4 py-3 text-white transition outline-none focus:border-purple-500'
                placeholder='Conte um pouco sobre você...'
              />
            </div>

            {/* ações */}
            <div className='flex gap-5 place-self-center' style={{ paddingTop: 15 }}>
              {/* cancelar */}
              <Link
                href='/profile'
                className=' border border-white rounded hover:bg-white hover:text-black transition hover:border-white cursor-pointer' style={{ padding: '5px 15px' }}
              >
                Cancelar
              </Link>

              {/* salvar */}
              <button
                onClick={handleSave}
                disabled={loading}
                className=' border border-purple-500 text-purple-500 rounded hover:bg-purple-500 hover:text-black transition hover:border-purple-500 cursor-pointer' style={{ padding: '5px 15px' }}
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
