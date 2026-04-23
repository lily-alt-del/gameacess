import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import Footer from '../../components/Footer'; 

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
              {/* 2. AJUSTE: Ao usar require, passamos o item.imagem direto no source */}
              <Image 
                source={item.imagem} 
                style={styles.image} 
              />
            </View>
            
            <Text style={styles.productName} numberOfLines={2}>
              {item.nome}
            </Text>
            <Text style={styles.productPrice}>
              {item.preco}
            </Text>
          </TouchableOpacity>
        )}
        
        ListFooterComponent={<Footer />}
      />
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
    fontWeight: 'bold', // Caso a fonte Anton não carregue, mantém o estilo
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
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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
});