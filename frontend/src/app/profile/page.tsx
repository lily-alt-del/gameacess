"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const router = useRouter();

  // 🔒 Proteção de rota
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // 🚪 Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // 👈 se você estiver salvando no localStorage
    router.push("/");
  };

  if (!user) return null;

  return (
    <>
      {/* HEADER */}
      <div className="bg-purple-900 border-b-4 border-purple-500 h-[150] text-purple-950 text-3xl flex items-center px-5">
        <Link href="/">
          <i className="bi bi-arrow-left text-purple-950"></i>
        </Link>
      </div>

      {/* AVATAR */}
      <div style={{ marginTop: -50, paddingLeft: 50 }}>
        <div className="h-[100] w-[100] rounded-full overflow-hidden border-4 border-purple-500 bg-purple-600" >
          <Image
            src={user.avatar || "/default-avatar.png"}
            alt="Avatar"
            width={100}
            height={100}
            className="object-cover w-full h-full"
            
          />
        </div>
      </div>

      {/* INFO */}
      <div className="pl-10 mt-3" style={{ paddingLeft: 40, marginBottom: 30 }}>
        <h1 className="text-2xl font-bold text-white">
          {user.name}
        </h1>
        <p className="text-sm text-purple-300">
          {user.email}
        </p>
      </div>

      {/* BOTÃO LOGOUT */}
      <div className="pl-10 mt-6" style={{ paddingLeft: 40 }}>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white rounded-md cursor-pointer" style={{ padding: 5 }}
        >
          Sair da conta
        </button>
      </div>
    </>
  );
}