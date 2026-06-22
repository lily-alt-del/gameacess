import React, { useState, useEffect } from 'react';
import { apiFetchMobile } from '../services/api'; 
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'; // 💡 Importado TouchableOpacity
import { useRouter } from 'expo-router'; // 💡 Importado o roteador do Expo
import Footer from '../components/Footer';

export default function HomeMobile() {
  const router = useRouter(); // 💡 Inicializando o roteador
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetchMobile('/produtos') 
      .then(data => {
        setProdutos(data); 
      })
      .catch(error => {
        console.error("Erro ao conectar com o NestJS:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const novidades = [
    { id: 1, title: 'Lies of P Overture', img: { uri: 'https://i.ytimg.com/vi/TkCOWLrh26s/hq720.jpg' } },
    { id: 2, title: 'Hollow Knight', img: { uri: 'https://cdn.awsli.com.br/800x800/229/229111/produto/346762626/1-tgg1vtswva.png' } },
    { id: 3, title: "No, I'm not a human", img: { uri: 'https://m.media-amazon.com/images/M/MV5BNjQ2YjhkNDQtMTIxOS00ZDgxLWFiNGEtOTFjZmNiODE1YzVjXkEyXkFqcGc@._V1_QL75_UY281_CR21,0,190,281_.jpg' } },
  ];

  const noticias = [
    { id: 1, title: 'Pokémon Ventos e Ondas chega em 2027', data: 'HÁ 3 DIAS', img: { uri: 'https://www.adrenaline.com.br/wp-content/uploads/2026/02/pokemon-ventos-ondas-oficial.jpg' } },
    { id: 2, title: 'Resident Evil Requiem destrói recorde', data: 'HÁ 5 DIAS', img: { uri: 'https://www.adrenaline.com.br/wp-content/uploads/2026/02/resident-evil-requiem-recorde-steam.jpg' } },
  ];

return (
    <ScrollView style={styles.safeContainer} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.content}>
        
        {/* ... Seções de Novidades e Últimas Notícias continuam aqui idênticas ... */}

        {/* SEÇÃO: PRODUTOS DO BANCO */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>PRODUTOS EM DESTAQUE</Text>
        
        {loading ? (
          <Text style={{ color: '#a1a1aa', marginLeft: 20 }}>Carregando produtos...</Text>
        ) : (
          <View style={styles.grid}>
            {produtos && produtos.map((item: any) => (
              /* 💡 AGORA CADA CARD É CLICÁVEL: */
              <TouchableOpacity 
                key={item.id} 
                style={styles.productCard}
                onPress={() => router.push(`/product/${item.id}`)} // ➡️ Leva para app/product/[id].tsx
                activeOpacity={0.7}
              >
                <Image source={{ uri: item.imagem }} style={styles.productImage} />
                <Text style={styles.productName}>{item.nome}</Text>
                <Text style={styles.productPrice}>R$ {item.preco.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

      </View>
      <Footer />
    </ScrollView>
  );
}

// ... Seus estilos do StyleSheet permanecem iguais abaixo ...
const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#0f0a1b' },
  content: { paddingTop: 100, paddingBottom: 20 },
  sectionTitle: { color: '#fff', fontSize: 22, fontWeight: '900', marginLeft: 20, marginBottom: 15, letterSpacing: 1 },
  carousel: { paddingLeft: 20 },
  carouselCard: { marginRight: 15, width: 280 },
  carouselImage: { width: '100%', height: 160, borderRadius: 12, backgroundColor: '#1f1a2f' },
  gameTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  newsCard: { backgroundColor: '#161127', marginHorizontal: 20, borderRadius: 12, marginBottom: 15, overflow: 'hidden' },
  newsImage: { width: '100%', height: 180 },
  newsInfo: { padding: 15 },
  newsDate: { color: '#9333ea', fontSize: 11, fontWeight: '900', marginBottom: 5 },
  newsTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20 },
  productCard: { width: '48%', backgroundColor: '#161127', borderRadius: 12, padding: 10, marginBottom: 15 },
  productImage: { width: '100%', height: 120, borderRadius: 8, backgroundColor: '#fff', resizeMode: 'contain' },
  productName: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  productPrice: { color: '#9333ea', fontSize: 16, fontWeight: 'bold', marginTop: 4 }
});