'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';

interface CartItem {
  id: number;
  quantity: number;

  mod: {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
  };
}

interface Cart {
  id: number;
  items: CartItem[];
}

export default function CartPage() {
  const { user, loading } = useUser();

  const [cart, setCart] = useState<Cart | null>(null);

  async function loadCart() {
    const token = localStorage.getItem('token');

    console.log('TOKEN NO CARRINHO: ', token);

    const response = await fetch('http://localhost:3001/cart', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('STATUS CART: ', response.status);

    const data = await response.json();

    console.log('DATA CART: ', data);

    setCart(data);
  }

  async function updateQuantity(itemId: number, quantity: number) {
    const token = localStorage.getItem('token');

    try {
      await fetch(`http://localhost:3001/cart/${itemId}`, {
        method: 'PUT',

        headers: {
          'Content-Type': 'application/json',

          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          quantity,
        }),
      });

      loadCart();
    } catch (error) {
      console.error(error);
    }
  }

  async function removeItem(itemId: number) {
    const token = localStorage.getItem('token');

    try {
      await fetch(`http://localhost:3001/cart/${itemId}`, {
        method: 'DELETE',

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadCart();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!loading && user) {
      loadCart();
    }
  }, [loading, user]);

  if (loading) {
    return <div className='p-10 text-white'>Carregando...</div>;
  }

  if (!user) {
    return (
      <main className='flex min-h-[70vh] flex-col items-center justify-center gap-6'>
        <h1 className='text-center text-2xl text-gray-600 '>
          Faça login ou cadastre-se para acessar o carrinho
        </h1>
      </main>
    );
  }

  if (!cart) {
    return <div className='p-10 text-white'>Carregando...</div>;
  }

  const total =
    cart?.items?.reduce(
      (acc, item) => acc + item.mod.price * item.quantity,
      0,
    ) || 0;

  return (
    <>
      <main className='mx-auto max-w-6xl p-10 min-h-100'>
        <h1 className='mb-8 text-4xl font-bold text-white'>Carrinho</h1>
        <br />
        <div className='flex flex-col gap-6'>
          {cart.items?.map((item) => (
            <div
              key={item.id}
              className='flex gap-4 rounded-xl bg-zinc-900 p-4'
            >
              <img
                src={item.mod.imageUrl}
                alt={item.mod.title}
                className='w-32 rounded-lg'
              />

              <div>
                <h2 className='text-xl text-white'>{item.mod.title}</h2>

                <p className='text-green-400'>R$ {item.mod.price}</p>

                <div className='mt-2 flex items-center gap-3'>
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(item.id, item.quantity - 1);
                      }
                    }}
                    className='h-8 w-8 rounded bg-zinc-700 text-white'
                  >
                    -
                  </button>

                  <span className='text-white'>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className='h-8 w-8 rounded bg-zinc-700 text-white'
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className='mt-3 rounded bg-red-600 px-3 py-1 text-white'
                  >
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <br />
        <div className='mt-10 text-right'>
          <h2 className='text-3xl font-bold text-white'>
            Total: R$
            {total.toFixed(2)}
          </h2>
        </div>
      </main>
    </>
  );
}