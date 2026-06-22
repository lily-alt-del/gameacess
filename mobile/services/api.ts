// mobile/services/api.ts

// Como você está usando o Expo Web, o localhost funciona perfeitamente!
export const API_URL = "http://localhost:3001";

// 1. FUNÇÃO BASE PARA REQUISIÇÕES (GET, PUT, DELETE, etc.)
export async function apiFetchMobile<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  // Pega o token direto do localStorage do navegador (já que estamos no modo Web)
  const token = typeof window !== "undefined" ? localStorage.getItem("mobile_token") : null;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        // Injeta o token JWT para o NestJS saber quem está fazendo a requisição
        Authorization: token ? `Bearer ${token}` : "",
        ...(options?.headers || {}),
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(data?.message || "Erro na requisição mobile");
    }

    return data;
  } catch (error) {
    console.error("Erro na requisição Mobile:", error);
    throw error;
  }
}

// 2. FUNÇÃO DE LOGIN DO MOBILE (Adicionada aqui para facilitar!)
export async function loginMobile(credentials: { email: string; password: string }) {
  // Bate na rota do JWT do NestJS que corrigimos antes
  const data = await apiFetchMobile("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  // Se o backend autenticou com sucesso, guarda o token na memória do navegador
  if (data && data.token) {
    localStorage.setItem("mobile_token", data.token);
    console.log("Sucesso! Token do Mobile salvo no localStorage.");
  }

  return data;
}

//register mobile
export async function registerMobile(data: { name: string; email: string; password: string }) {
  // Bate na rota de criação de usuários do seu NestJS (/users)
  return apiFetchMobile("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}