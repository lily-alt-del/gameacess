import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'; // <-- Adicionado 'Image' aqui
import Footer from '../components/Footer';

export default function HomeMobile() {
  // 1. PRIMEIRO: Estados da API
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. SEGUNDO: Chamada do useEffect para a API
  useEffect(() => {
    api.get('/produtos') 
      .then(response => {
        setProdutos(response.data); 
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
    <ScrollView 
      style={styles.safeContainer} 
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* 2. MIOLO DA PÁGINA */}
      <View style={styles.content}>
        
        {/* SEÇÃO NOVIDADES (CARROSSEL) */}
        <Text style={styles.sectionTitle}>NOVIDADES</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.carousel}
        >
          {novidades.map(item => (
            <View key={item.id} style={styles.carouselCard}>
              <Image source={item.img} style={styles.carouselImage} />
              <Text style={styles.gameTitle}>{item.title}</Text>
            </View>
          ))}
        </ScrollView>

        {/* SEÇÃO NOTÍCIAS */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>ÚLTIMAS NOTÍCIAS</Text>
        {noticias.map(item => (
          <View key={item.id} style={styles.newsCard}>
            <Image source={item.img} style={styles.newsImage} />
            <View style={styles.newsInfo}>
              <Text style={styles.newsDate}>{item.data}</Text>
              <Text style={styles.newsTitle}>{item.title}</Text>
            </View>
          </View>
        ))}

        {/* SEÇÃO: PRODUTOS DO BANCO (NESTJS + PRISMA) - AGORA NO LUGAR CERTO! */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>PRODUTOS EM DESTAQUE</Text>
        
        {loading ? (
          <Text style={{ color: '#a1a1aa', marginLeft: 20 }}>Carregando produtos...</Text>
        ) : (
          <View style={styles.grid}>
            {produtos.map((item: any) => (
              <View key={item.id} style={styles.productCard}>
                <Image source={{ uri: item.imagem }} style={styles.productImage} />
                <Text style={styles.productName}>{item.nome}</Text>
                <Text style={styles.productPrice}>R$ {item.preco}</Text>
              </View>
            ))}
          </View>
        )}

      </View>

      {/* 3. FOOTER */}
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0f0a1b',
  },
content: {
  paddingTop: 100, // Espaço para o Header
  paddingBottom: 20,
},
sectionTitle: {
  color: '#fff',
  fontSize: 22,
  fontWeight: '900',
  marginLeft: 20,
  marginBottom: 15,
  letterSpacing: 1,
},
// Estilos do Carrossel
carousel: {
  paddingLeft: 20,
},
carouselCard: {
  marginRight: 15,
  width: 280,
},
carouselImage: {
  width: '100%',
  height: 160,
  borderRadius: 12,
  backgroundColor: '#1f1a2f',
},
gameTitle: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  marginTop: 8,
},
// Estilos das Notícias
newsCard: {
  backgroundColor: '#161127',
  marginHorizontal: 20,
  borderRadius: 12,
  marginBottom: 15,
  overflow: 'hidden',
},
newsImage: {
  width: '100%',
  height: 180,
},
newsInfo: {
  padding: 15,
},
newsDate: {
  color: '#9333ea', // Roxo AccessGame
  fontSize: 11,
  fontWeight: '900',
  marginBottom: 5,
},
newsTitle: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
},
grid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
},
productCard: {
  width: '48%',
  backgroundColor: '#161127',
  borderRadius: 12,
  padding: 10,
  marginBottom: 15,
},
productImage: {
  width: '100%',
  height: 120,
  borderRadius: 8,
  backgroundColor: '#fff',
  resizeMode: 'contain',
},
productName: {
  color: '#fff',
  fontSize: 14,
  fontWeight: 'bold',
  marginTop: 8,
},
productPrice: {
  color: '#9333ea',
  fontSize: 16,
  fontWeight: 'bold',
  marginTop: 4,
},
});

