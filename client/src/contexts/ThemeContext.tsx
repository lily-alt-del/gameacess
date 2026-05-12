import React, { createContext, useContext, useEffect, useState } from "react";

// Define os tipos de tema permitidos
type Theme = "light" | "dark";

// Define a estrutura dos dados que estarão no Contexto
interface ThemeContextType {
  theme: Theme;            // Tema atual
  toggleTheme?: () => void; // Função opcional para trocar o tema
  switchable: boolean;     // Indica se o tema pode ser alterado pelo usuário
}

// Cria o contexto propriamente dito
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define as propriedades que o componente Provider aceita
interface ThemeProviderProps {
  children: React.ReactNode; // Elementos filhos que serão envolvidos
  defaultTheme?: Theme;      // Tema inicial padrão
  switchable?: boolean;      // Habilita ou não a troca de tema
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  // Inicializa o estado do tema
  const [theme, setTheme] = useState<Theme>(() => {
    // Se for alterável, tenta buscar a preferência salva no navegador
    if (switchable) {
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  // Efeito executado sempre que o tema ou a permissão de troca mudam
  useEffect(() => {
    const root = document.documentElement; // Pega o elemento <html>
    
    // Adiciona ou remove a classe "dark" para estilização via CSS
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Salva a escolha do usuário no LocalStorage se permitido
    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]);

  // Define a função de alternar apenas se 'switchable' for verdadeiro
  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  return (
    // Disponibiliza o tema e a função de troca para toda a aplicação
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para facilitar o uso do tema em outros componentes
export function useTheme() {
  const context = useContext(ThemeContext);
  // Garante que o hook só seja usado dentro de um ThemeProvider
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
