import { apiFetch } from "./api";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  avatar?: string; // 👈 ESSENCIAL
}) {
  return apiFetch("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  return apiFetch("/users/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateUser(
  id: number,
  data: {
    name?: string;
    avatar?: string;
  }
) {
  return apiFetch(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}