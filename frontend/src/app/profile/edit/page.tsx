"use client";

import Link from "next/link";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowLeft, Camera } from "lucide-react";

import { useUser } from "@/context/UserContext";

import { uploadImage } from "@/services/upload";
import { updateUser } from "@/services/user";

export default function EditProfilePage() {
  const { user, setUser } = useUser();

  const router = useRouter();

  // estados
  const [name, setName] = useState("");

  const [preview, setPreview] = useState("");

  const [avatarFile, setAvatarFile] =
    useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  // proteção rota
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    setName(user.name);

    setPreview(
      user.avatar || "/default-avatar.png"
    );
  }, [user, router]);

  // upload avatar
  const handleAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // valida tipo
    if (!file.type.startsWith("image/")) {
      alert("Selecione uma imagem válida");
      return;
    }

    // valida tamanho
    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 5MB");
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

      let avatarUrl = user.avatar || "";

      // upload nova imagem
      if (avatarFile) {
        avatarUrl = await uploadImage(
          avatarFile
        );
      }

      // atualizar backend
      const updatedUser = await updateUser(
        user.id,
        {
          name,
          avatar: avatarUrl,
        }
      );

      // atualizar contexto
      setUser(updatedUser);

      // atualizar localStorage
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      alert("Perfil atualizado com sucesso!");

      router.push("/profile");
    } catch (error) {
      console.error(error);

      alert("Erro ao atualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      {/* HEADER */}
      <div className="flex items-center gap-4 border-b border-purple-500/20 bg-purple-900 px-6 py-5">
        <Link
          href="/profile"
          className="text-purple-300 transition hover:text-white"
        >
          <ArrowLeft size={24} />
        </Link>

        <h1 className="text-2xl font-bold">
          Editar Perfil
        </h1>
      </div>

      {/* CONTEÚDO */}
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        {/* CARD */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg">
          {/* AVATAR */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-purple-500 bg-purple-700">
                <Image
                  src={
                    preview ||
                    "/default-avatar.png"
                  }
                  alt="Avatar"
                  width={128}
                  height={128}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* botão upload */}
              <label className="absolute right-0 bottom-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-purple-600 transition hover:bg-purple-700">
                <Camera size={18} />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>

            <p className="mt-4 text-sm text-purple-300">
              Clique no ícone para trocar o avatar
            </p>
          </div>

          {/* FORM */}
          <div className="mt-8 space-y-5">
            {/* nome */}
            <div>
              <label className="mb-2 block text-sm text-purple-300">
                Nome
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="w-full rounded-lg border border-white/10 bg-[#1b1b25] px-4 py-3 text-white outline-none transition focus:border-purple-500"
                placeholder="Seu nome"
              />
            </div>

            {/* email */}
            <div>
              <label className="mb-2 block text-sm text-purple-300">
                Email
              </label>

              <input
                type="email"
                disabled
                value={user.email}
                className="w-full cursor-not-allowed rounded-lg border border-white/10 bg-[#111] px-4 py-3 text-gray-400"
              />
            </div>

            {/* ações */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              {/* cancelar */}
              <Link
                href="/profile"
                className="flex-1 rounded-lg border border-white/10 py-3 text-center font-semibold transition hover:bg-white/5"
              >
                Cancelar
              </Link>

              {/* salvar */}
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex-1 rounded-lg bg-purple-600 py-3 font-semibold transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Salvando..."
                  : "Salvar alterações"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}