import { apiFetch } from "./api";

export async function checkout() {
  return apiFetch("/orders/checkout", {
    method: "POST",
  });
}

export async function getOrders() {
  return apiFetch("/orders");
}

export async function getOrderById(id: number) {
  return apiFetch(`/orders/${id}`);
}