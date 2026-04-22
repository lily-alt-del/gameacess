import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native'; // Importe tudo em uma linha só
import Footer from '../components/Footer';

export default function HomeMobile() {
  return (
    // 1. O ScrollView é o "pai" de tudo. 
    // O contentContainerStyle garante que o conteúdo ocupe a tela toda para o Footer descer.
    <ScrollView 
      style={styles.safeContainer} 
      contentContainerStyle={{ flexGrow: 1 }}
    >
      
      {/* 2. MIOLO DA PÁGINA */}
      <View style={styles.content}>
        <Text style={styles.title}>Página Inicial</Text>
        <Text style={styles.subtitle}>
          O Header já está funcional! Clique no ícone do carrinho lá em cima para testar a navegação.
        </Text>
        
        {/* Apenas um exemplo de espaço para testar o scroll */}
        <View style={{ height: 400 }} /> 
      </View>

      {/* 3. FOOTER (Dentro do ScrollView, no final de tudo) */}
      <Footer />

    </ScrollView> //PRECISA TER ESSE SCROLLVIEW PRA APARECE O FOOTER
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0f0a1b',
  },
  content: {
    flex: 1, // Faz o conteúdo principal "esticar" e empurrar o footer
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 100, // Espaço para não bater no Header fixo
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Anton', // Se já tiver carregado a fonte
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: 16,
    textAlign: 'center',
  }
});