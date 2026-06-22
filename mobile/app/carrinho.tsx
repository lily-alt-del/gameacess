import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { apiFetchMobile } from '../services/api';
import { useRouter } from 'expo-router';

// 1. Interfaces mantidas idênticas às do seu Backend/Front
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

export default function CartMobile() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Mock temporário para simular a validação de usuário que você tinha no Context do Front
  // (Caso você use uma validação global no Mobile, pode substituir aqui)
  const [hasUser, setHasUser] = useState(true); 

  // 2. Buscar o carrinho usando a apiFetchMobile genérica
  async function loadCart() {
    try {
      setLoading(true);
      const data = await apiFetchMobile('/cart', { method: 'GET' });
      setCart(data);
    } catch (error) {
      console.error('Erro ao carregar carrinho no Mobile:', error);
    } finally {
      setLoading(false);
    }
  }

  // 3. Atualizar quantidade
  async function updateQuantity(itemId: number, quantity: number) {
    try {
      await apiFetchMobile(`/cart/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity }),
      });
      loadCart(); // Recarrega os dados atualizados
    } catch (error) {
      console.error(error);
    }
  }

  // 4. Remover item do carrinho
  async function removeItem(itemId: number) {
    try {
      await apiFetchMobile(`/cart/${itemId}`, {
        method: 'DELETE',
      });
      loadCart();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (hasUser) {
      loadCart();
    }
  }, [hasUser]);

  // Estado de carregamento visual nativo
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#9333ea" />
        <Text style={styles.loadingText}>Carregando seu carrinho...</Text>
      </View>
    );
  }

  // Estado caso o usuário precise logar
  if (!hasUser) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.warningText}>
          Faça login ou cadastre-se para acessar o carrinho
        </Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/login')}>
          <Text style={styles.loginButtonText}>Ir para Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Cálculo do valor total global do carrinho
  const total = cart?.items?.reduce((acc, item) => acc + item.mod.price * item.quantity, 0) || 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Carrinho</Text>

      {cart?.items && cart.items.length > 0 ? (
        <View style={styles.itemsList}>
          {cart.items.map((item) => (
            <View key={item.id} style={styles.cartCard}>
              <Image source={{ uri: item.mod.imageUrl }} style={styles.productImage} />
              
              <View style={styles.infoContainer}>
                <Text style={styles.productTitle} numberOfLines={2}>{item.mod.title}</Text>
                <Text style={styles.productPrice}>R$ {item.mod.price.toFixed(2)}</Text>

                <View style={styles.actionsRow}>
                  {/* Controles de Quantidade */}
                  <View style={styles.quantityControls}>
                    <TouchableOpacity 
                      style={styles.quantityButton} 
                      onPress={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    
                    <TouchableOpacity 
                      style={styles.quantityButton} 
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Botão Remover */}
                  <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
                    <Text style={styles.removeButtonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.emptyText}>Seu carrinho está vazio.</Text>
      )}

      {/* Seção do Total */}
      {cart?.items && cart.items.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>R$ {total.toFixed(2)}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0a1b',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24,
  },
  loadingText: {
    color: '#a1a1aa',
    marginTop: 12,
    fontSize: 16,
  },
  warningText: {
    color: '#a1a1aa',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyText: {
    color: '#a1a1aa',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 40,
  },
  loginButton: {
    backgroundColor: '#9333ea',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemsList: {
    gap: 16,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#161127',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#1f1a2f',
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  productTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    color: '#4ade80',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272237',
    borderRadius: 6,
    padding: 4,
  },
  quantityButton: {
    width: 28,
    height: 28,
    backgroundColor: '#3b354f',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
  removeButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: '#272237',
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: '#a1a1aa',
    fontSize: 20,
    fontWeight: '600',
  },
  totalPrice: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
});