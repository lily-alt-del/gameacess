'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
} | null;

type UserContextType = {
  user: User;
  loading: boolean;
  setUser: (user: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  const saveUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem('user');
    localStorage.removeItem('token');

    window.location.href = '/'; // redireciona pra home após logout
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        setUser: saveUser,
        logout,
      }}
    >
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
