import { apiFetch } from "./api";

export async function getCart() {
  return apiFetch("/cart");
}

export async function addToCart(productId: number, quantity: number) {
  return apiFetch("/cart/add", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
}

export async function updateCartItem(id: number, quantity: number) {
  return apiFetch(`/cart/item/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ quantity }),
  });
}

export async function removeCartItem(id: number) {
  return apiFetch(`/cart/item/${id}`, {
    method: "DELETE",
  });
}