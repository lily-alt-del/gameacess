import React, { useState } from 'react'; // 1. Importamos o useState
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import Footer from '../../components/Footer';

const ofertasSemana = [
  { id: 1, nome: "Headset Gamer Pro", preco: "R$ 79,89", precoAntigo: "R$ 89,99", desconto: "10%", imagem: { uri: 'https://t2.tudocdn.net/622197?w=824&h=494' } },
  { id: 3, nome: "Mouse Gamer Wireless", preco: "R$ 99,95", precoAntigo: "R$ 100,90", desconto: "10%", imagem: { uri: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400' } },
  { id: 4, nome: "Mouse Ergonômico", preco: "R$ 84,00", precoAntigo: "R$ 120,00", desconto: "30%", imagem: { uri: 'https://netcomputadores.com.br/dbimg/produtos/em550gpl_101899_g.jpg' } },
];

const roupas = [
  { id: 101, nome: "Moletom Access Game", preco: "R$ 130,00", imagem: { uri: 'https://placehold.co/400x500/0f0a1b/fff.png?text=Moletom' } },
  { id: 102, nome: "Camiseta Access Game", preco: "R$ 19,00", imagem: { uri: 'https://placehold.co/400x500/0f0a1b/fff.png?text=Camiseta' } },
  { id: 103, nome: "Babylook Access Game", preco: "R$ 19,00", imagem: { uri: 'https://placehold.co/400x500/0f0a1b/fff.png?text=Babylook' } },
];

const perifericos = [
  { id: 201, nome: "Mouse Adaptado Ergonômico", preco: "R$ 206,00", imagem: { uri: 'https://http2.mlstatic.com/D_628791-MLB93481032231_092025-O.jpg' } },
  { id: 202, nome: "Mouse Adaptado (Pés)", preco: "R$ 119,90", imagem: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbu99Cy3CxOXHJ0SrC4VwZ329uKNrue_ZqrQ&s' } },
  { id: 204, nome: "Mouse Vertical Sem Fio", preco: "R$ 120,00", imagem: { uri: 'https://cdn.awsli.com.br/2547/2547358/produto/236257449/mouse-sem-fio-vertical-multilaser-bt-mo382--5--vfkyj61hb2.jpg' } },
  { id: 206, nome: "Controle Adaptado PS5", preco: "R$ 150,30", imagem: { uri: 'https://gmedia.playstation.com/is/image/SIEPDC/access-controller-image-block-01-en-12may23' } },
];

export default function ProdutosPage() {
  // 2. Estado para guardar o texto que o usuário digita
  const [pesquisa, setPesquisa] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const addCart = async (product: any) => {
    try {
      const stored = await AsyncStorage.getItem('cart');
      let cart = stored ? JSON.parse(stored) : [];
      cart.push({ id: product.id, nome: product.nome, preco: product.preco, imagem: product.imagem });
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      
      Toast.show({
        type: 'success',
        text1: 'Adicionado! 🛒',
        text2: `${product.nome} foi para o carrinho.`,
        position: 'top',
        visibilityTime: 2500,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // 3. Funções que filtram as listas ignorando letras maiúsculas/minúsculas
  const ofertasFiltradas = ofertasSemana.filter(item => 
    item.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const roupasFiltradas = roupas.filter(item => 
    item.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const perifericosFiltrados = perifericos.filter(item => 
    item.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  // Verificação para caso NENHUM produto seja encontrado
  const nenhumProdutoEncontrado = ofertasFiltradas.length === 0 && roupasFiltradas.length === 0 && perifericosFiltrados.length === 0;

  return (
    <View style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* BARRA DE PESQUISA */}
        <View style={styles.searchContainer}>
          <TextInput 
  placeholder="Pesquisar loja" 
  placeholderTextColor="#71717a"
  style={[styles.searchInput, isFocused ? { borderColor: '#9333ea' } : null]}
  value={pesquisa}
  onChangeText={(texto) => setPesquisa(texto)}
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
  clearButtonMode="while-editing"
  selectionColor="#9333ea" // <-- Deixa a barra de digitação roxa
  underlineColorAndroid="transparent" // <-- Remove linha padrão do Android
/>
        </View>

        {/* BANNER DE ALERTA / FRETE */}
        <View style={styles.alertBanner}>
          <Text style={styles.alertBannerText}>⚡ FRETE GRÁTIS A PARTIR DE R$ 350,00 ⚡</Text>
        </View>

        {/* FEEDBACK CASO NÃO ENCONTRE NADA */}
        {nenhumProdutoEncontrado && (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color="#71717a" />
            <Text style={styles.emptyText}>Nenhum produto encontrado para "{pesquisa}"</Text>
          </View>
        )}

        {/* ================= SEÇÃO: OFERTAS DA SEMANA ================= */}
        {ofertasFiltradas.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>⚡ OFERTAS DA SEMANA</Text>
            <View style={styles.grid}>
              {ofertasFiltradas.map((item) => (
                <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.card}>
                  <View style={styles.imageContainer}>
                    <View style={styles.discountBadge}><Text style={styles.discountText}>-{item.desconto}</Text></View>
                    <Image source={item.imagem} style={styles.image} />
                    <TouchableOpacity style={styles.floatingIconBtn} onPress={() => addCart(item)}>
                      <Ionicons name="cart-outline" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.productName} numberOfLines={2}>{item.nome}</Text>
                  <Text style={styles.oldPrice}>{item.precoAntigo}</Text>
                  <Text style={styles.productPrice}>{item.preco}</Text>
                  <TouchableOpacity style={styles.buyButton} onPress={() => addCart(item)}>
                    <Text style={styles.buyButtonText}>Comprar</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* ================= SEÇÃO: CAMISETAS E MOLETONS ================= */}
        {roupasFiltradas.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>CAMISETAS E MOLETONS</Text>
            <View style={styles.grid}>
              {roupasFiltradas.map((item) => (
                <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.card}>
                  <View style={styles.imageContainer}>
                    <Image source={item.imagem} style={styles.image} />
                    <TouchableOpacity style={styles.floatingIconBtn} onPress={() => addCart(item)}>
                      <Ionicons name="cart-outline" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.productName} numberOfLines={2}>{item.nome}</Text>
                  <Text style={styles.productPrice}>{item.preco}</Text>
                  <TouchableOpacity style={styles.buyButton} onPress={() => addCart(item)}>
                    <Text style={styles.buyButtonText}>Comprar</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* ================= SEÇÃO: PERIFÉRICOS ================= */}
        {perifericosFiltrados.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>PERIFÉRICOS DE ACESSIBILIDADE</Text>
            <View style={styles.grid}>
              {perifericosFiltrados.map((item) => (
                <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.card}>
                  <View style={styles.imageContainer}>
                    <Image source={item.imagem} style={styles.image} />
                    <TouchableOpacity style={styles.floatingIconBtn} onPress={() => addCart(item)}>
                      <Ionicons name="cart-outline" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.productName} numberOfLines={2}>{item.nome}</Text>
                  <Text style={styles.productPrice}>{item.preco}</Text>
                  <TouchableOpacity style={styles.buyButton} onPress={() => addCart(item)}>
                    <Text style={styles.buyButtonText}>Comprar</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <Footer />
      </ScrollView>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0f0a1b',
  },
  scrollContent: {
    paddingTop: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
searchInput: {
  backgroundColor: '#1f1a2f',
  color: '#fff',
  borderRadius: 25,
  paddingVertical: 10,
  paddingHorizontal: 20,
  fontSize: 15,
  borderWidth: 1,          // <-- Precisa ter isso aqui
  borderColor: '#3b2d54',  // Cor padrão quando NÃO está focado
  },
    searchInputFocused: {
  borderColor: '#9333ea', // Roxo idêntico ao botão comprar
},
  alertBanner: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 25,
  },
  alertBannerText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 15,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
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
    position: 'relative',
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#2563eb',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 10,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productName: {
    color: '#d4d4d8',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
    lineHeight: 18,
    height: 36,
  },
  oldPrice: {
    color: '#71717a',
    textDecorationLine: 'line-through',
    fontSize: 12,
    marginBottom: 2,
  },
  productPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#9333ea',
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
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#71717a',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});