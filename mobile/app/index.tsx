import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeMobile() {
  return (
    <View style={styles.safeContainer}>

      {/* MIOLO DA PÁGINA (Provisório) */}
      <View style={styles.content}>
        <Text style={styles.title}>Página Inicial</Text>
        <Text style={styles.subtitle}>
          O Header já está funcional! Clique no ícone do carrinho lá em cima para testar a navegação.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0f0a1b',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#a1a1aa', // cinza
    fontSize: 16,
    textAlign: 'center',
  }
});