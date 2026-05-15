export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3001";

export async function apiFetch<T = any>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_URL}${endpoint}`;

  // token JWT
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  // debug
  console.log("API_URL:", API_URL);
  console.log("Request URL:", url);
  console.log("JWT Token:", token);

  try {
    const response = await fetch(url, {
      ...options,

      headers: {
        "Content-Type": "application/json",

        // JWT
        Authorization: token
          ? `Bearer ${token}`
          : "",

        ...(options?.headers || {}),
      },
    });

    // tenta converter resposta
    const data = await response
      .json()
      .catch(() => null);

    // token inválido / expirado
    if (response.status === 401) {
      console.error("Token inválido");

      // limpa login
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // redireciona login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      throw new Error(
        "Sessão expirada. Faça login novamente."
      );
    }

    // outros erros
    if (!response.ok) {
      console.error("Erro da API:", data);

      throw new Error(
        data?.message || "Erro na requisição"
      );
    }

    return data;
  } catch (error) {
    console.error(
      "Erro na requisição:",
      error
    );

    throw error;
  }
}