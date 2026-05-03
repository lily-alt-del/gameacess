'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from '@/services/cart';

export default function CartPage() {
  const { user } = useUser();
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔓 NÃO LOGADO
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl text-white">
            Você precisa estar logado para acessar o carrinho
          </h1>

          <Link
            href="/login"
            className="text-purple-400 text-lg font-semibold hover:text-purple-300 underline"
          >
            Entrar na sua conta
          </Link>
        </div>
      </div>
    );
  }

  // 🔄 Buscar carrinho
  useEffect(() => {
    async function fetchCart() {
      try {
        const data = await getCart();
        setCart(data);
      } catch (error) {
        console.error("Erro ao buscar carrinho:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  // 🔄 Atualizar quantidade
  async function handleUpdate(id: number, quantity: number) {
    await updateCartItem(id, quantity);
    const updated = await getCart();
    setCart(updated);
  }

  // ❌ Remover item
  async function handleRemove(id: number) {
    await removeCartItem(id);
    const updated = await getCart();
    setCart(updated);
  }

  if (loading) {
    return <p className="text-white p-10">Carregando carrinho...</p>;
  }

  if (!cart || cart.items.length === 0) {
    return <p className="text-white p-10">Seu carrinho está vazio.</p>;
  }

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Seu Carrinho</h1>

      <div className="flex flex-col gap-4">
        {cart.items.map((item: any) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-zinc-900 p-4 rounded-lg"
          >
            <div>
              <h2 className="font-semibold">{item.product.name}</h2>
              <p className="text-purple-300">
                R$ {item.product.price}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* diminuir */}
              <button
                onClick={() =>
                  handleUpdate(item.id, item.quantity - 1)
                }
                className="px-2 bg-purple-700 rounded"
              >
                -
              </button>

              <span>{item.quantity}</span>

              {/* aumentar */}
              <button
                onClick={() =>
                  handleUpdate(item.id, item.quantity + 1)
                }
                className="px-2 bg-purple-700 rounded"
              >
                +
              </button>

              {/* remover */}
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-400 ml-4"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* total */}
      <div className="mt-6 text-xl">
        Total: R$ {cart.total}
      </div>
    </div>
  );
}