'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
} | null;

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
  loading: boolean; // 💡 1. Adicionado o loading aqui na tipagem global do contexto!
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true); // 💡 2. Criamos o estado iniciando como true

  // Persistência simples
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // 💡 3. Assim que ele checa o localStorage, o carregamento termina!
  }, []);

  const saveUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/'; // redireciona pra home após logout
  };

  // 💡 4. Passamos o valor real do loading dentro do Provider
  return (
    <UserContext.Provider value={{ user, setUser: saveUser, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}