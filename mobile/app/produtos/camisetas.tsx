import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import Footer from '../../components/Footer'

const camisetas = [
  { id: 1, nome: "Camiseta Dinossauro", preco: "R$55,95", imagem: require('../../assets/images/camisetas/dino.png') },
  { id: 2, nome: "Camiseta Pacman", preco: "R$65,99", imagem: require('../../assets/images/camisetas/pacman.png') },
  { id: 3, nome: "Camiseta Bowser", preco: "R$45,98", imagem: require('../../assets/images/camisetas/bowser.png') },
  { id: 4, nome: "Camiseta Tetris", preco: "R$26,98", imagem: require('../../assets/images/camisetas/tetris.png') },
  { id: 5, nome: "Camiseta DonkeyKong", preco: "R$44,00", imagem: require('../../assets/images/camisetas/dk.png') },
  { id: 6, nome: "Camiseta Sonic", preco: "R$15,99", imagem: require('../../assets/images/camisetas/sonic.png') },
  { id: 7, nome: "Camiseta Fortnite", preco: "R$15,99", imagem: require('../../assets/images/camisetas/fortnite.png') },
  { id: 8, nome: "Camiseta Ordem Paranormal", preco: "R$25,45", imagem: require('../../assets/images/camisetas/ordem.png') },
];

export default function CamisetasPage() {

  const addCart = async (product: any) => {
    try {
      const stored = await AsyncStorage.getItem('cart');
      let cart = stored ? JSON.parse(stored) : [];

      cart.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      
      // 2. Chamada da notificação estilo web
      Toast.show({
        type: 'success',
        text1: 'Adicionado! 🛒',
        text2: `${product.nome} foi para o carrinho.`,
        position: 'top', // Pode mudar para 'bottom' se preferir embaixo
        visibilityTime: 2500, // Tempo que fica na tela (2,5 segundos)
      });
    } catch (error) {
      console.error("Erro ao salvar no carrinho:", error);
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Não foi possível adicionar ao carrinho.',
      });
    }
  };

  return (
    <View style={styles.safeContainer}>
      <FlatList
        data={camisetas}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        
        ListHeaderComponent={
          <Text style={styles.pageTitle}>CAMISETAS</Text>
        }
        
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.7} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image 
                source={item.imagem} 
                style={styles.image} 
              />
              
              <TouchableOpacity 
                style={styles.floatingIconBtn} 
                onPress={() => addCart(item)}
              >
                <Ionicons name="cart-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.productName} numberOfLines={2}>
              {item.nome}
            </Text>
            <Text style={styles.productPrice}>
              {item.preco}
            </Text>

            <TouchableOpacity 
              style={styles.buyButton} 
              onPress={() => addCart(item)}
            >
              <Text style={styles.buyButtonText}>Comprar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        
        ListFooterComponent={<Footer />}
      />

      {/* 3. Renderiza o componente Toast na tela (sempre no final) */}
      <Toast />
    </View>
  );
} 

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0f0a1b',
  },
  listContent: {
    paddingTop: 30,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 25,
    paddingHorizontal: 20,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  card: {
    width: '47%',
    marginBottom: 25,
  },
  imageContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 12,
    overflow: 'hidden',
    position: 'relative', // Essencial para o ícone flutuante
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  floatingIconBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fundo translúcido escuro
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  cartEmoji: {
    fontSize: 16,
  },
  productName: {
    color: '#d4d4d8',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6,
    lineHeight: 20,
  },
  productPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#9333ea', // Roxo similar ao bg-purple-600 que usamos no Tailwind
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});