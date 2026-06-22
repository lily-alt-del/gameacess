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
  } | null;

  product: {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
  } | null;
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

  async function updateQuantity(productId: number, quantity: number) {
    const token = localStorage.getItem('token');

    try {
      await fetch(`http://localhost:3001/cart/${productId}`, {
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
        <h1 className='text-center text-2xl text-gray-600'>
          Faça login ou cadastre-se para acessar o carrinho
        </h1>
      </main>
    );
  }

  if (!cart) {
    return <div className='p-10 text-white'>Carregando...</div>;
  }

  const total =
    cart?.items?.reduce((acc, item) => {
      const price = item.mod?.price ?? item.product?.price ?? 0;

      return acc + price * item.quantity;
    }, 0) || 0;

  return (
    <>
      <main className=' min-h-100 place-self-center' style={{ paddingTop: 30 }}>
        <h1 className='mb-8 text-4xl font-bold text-white'>Carrinho</h1>
        <br />
        <div className='flex flex-col gap-7 min-w-6xl'>
          {cart.items?.map((item) => (
            <div
              key={item.id}
              className='flex gap-4 rounded-xl p-4 border'
            >
              <img
                src={item.mod?.imageUrl ?? item.product?.imageUrl ?? ''}
                alt={item.mod?.title ?? item.product?.title ?? ''}
                className='w-32 rounded-lg'
              />

              <div style={{ paddingBlock: 20 }}>
                <h2 className='text-xl text-white'>
                  {item.mod?.title ?? item.product?.title}
                </h2>

                <p className='text-green-400'>
                  R$ {(item.mod?.price ?? item.product?.price ?? 0).toFixed(2)}
                </p>

                <div className='mt-2 flex items-center gap-3'>
                  {item.product ? (
                    <>
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
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className='h-8 w-8 rounded bg-zinc-700 text-white'
                      >
                        +
                      </button>
                    </>
                  ) : (
                    <span className='text-zinc-400'>Mod único</span>
                  )}

                  <button
                    onClick={() => removeItem(item.id)}
                    className='rounded bg-red-600 px-3 py-1 text-white'
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
        <div className='mt-10 flex justify-end gap-5 items-center' style={{ paddingBottom: 50 }}>
          <h2 className='text-3xl font-bold text-white'>
            Total: R$
            {total.toFixed(2)}
          </h2>
          <button className='text-lg cursor-pointer rounded border border-blue-500 text-blue-500 transition hover:border-blue-500 hover:bg-blue-500 hover:text-[#0f0a1b]'
                style={{ padding: 8 }}>
            Finalizar Compra
          </button>
        </div>
      </main>
    </>
  );
}
