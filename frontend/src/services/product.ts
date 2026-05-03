import { apiFetch } from "./api";

export async function getProducts() {
  return apiFetch("/products");
}