import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { apiFetchMobile } from '../../services/api'; // Ajuste a quantidade de ../ se necessário
import Toast from 'react-native-toast-message';
import Footer from '../../components/Footer';

export default function ProductDetailsPage() {
  const { id } = useLocalSearchParams(); // 🏷️ Captura dinamicamente o ID do produto clicado
  const router = useRouter();
  
  const [mod, setMods] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 1. Busca os detalhes do produto específico direto do NestJS
  useEffect(() => {
    if (id) {
      apiFetchMobile(`/mods/${id}`) // Confirme se sua rota no NestJS é /produtos/:id ou /product/:id
        .then(data => setMods(data))
        .catch(error => {
          console.error("Erro ao buscar detalhes do mod:", error);
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: 'Não foi possível carregar os detalhes do mod.',
          });
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  // 2. Função de adicionar ao carrinho integrada ao seu Backend
  const handleAddToCart = async () => {
    try {
      // Faz o POST para a rota do carrinho que o seu backend gerencia
      await apiFetchMobile('/cart', {
        method: 'POST',
        body: JSON.stringify({
          modId: mod.id // Envia o ID numérico esperado pelo Prisma
        })
      });

      // Exibe o Toast estilizado idêntico ao que você usou em camisetas.tsx
      Toast.show({
        type: 'success',
        text1: 'Adicionado! 🛒',
        text2: `${mod.title} foi para o seu carrinho.`,
        position: 'top',
        visibilityTime: 2500,
      });
    } catch (error) {
      console.error("Erro ao salvar no carrinho do banco:", error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Faça login ou verifique sua conexão para adicionar ao carrinho.',
      });
    }
  };

  if (loading) {
    return (
      <View style={[styles.safeContainer, styles.center]}>
        <ActivityIndicator size="large" color="#9333ea" />
      </View>
    );
  }

  if (!mod) {
    return (
      <View style={[styles.safeContainer, styles.center]}>
        <Text style={styles.errorText}>Produto não encontrado.</Text>
      </View>
    );
  }

  // Tratamento da imagem: se vier uma URL string da API usa uri, se for asset local resolve nativamente
  const imageSource = typeof mod.imageUrl === 'string' ? { uri: mod.imageUrl } : mod.imageUrl;

  return (
    <View style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Botão de voltar */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Voltar</Text>
        </TouchableOpacity>

        {/* Container da Imagem */}
        <View style={styles.imageContainer}>
          <Image source={ mod.imageUrl } style={styles.image} />
        </View>
        
        {/* Informações */}
        <Text style={styles.productName}>{mod.title}</Text>
        <Text style={styles.productPrice}>
          {typeof mod.price === 'number' ? `R$ ${mod.price.toFixed(2)}` : mod.price}
        </Text>
        
        <Text style={styles.productDescription}>
          {mod.description || 'Este incrível item está disponível no estoque da AccessGame prono para entrega.'}
        </Text>

        {/* Botão de Compra */}
        <TouchableOpacity 
          style={styles.buyButton} 
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.buyButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>

        <Footer />
      </ScrollView>

      {/* Renderiza o Toast de confirmação na raiz da tela */}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0f0a1b',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#9333ea',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    borderRadius: 16,
    width: '100%',
    height: 660 ,
    aspectRatio: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 25,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20
  },
  productName: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    color: '#4ade80',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 16,
  },
  productDescription: {
    color: '#a1a1aa',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  buyButton: {
    backgroundColor: '#9333ea',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  }
});