import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // O Expo já vem com essa biblioteca de ícones

// Mesmo mock da Web, apenas adaptando a imagem para o require() do mobile
const itensMock = [
  { id: 1, nome: "Controle Adaptativo Pro", preco: 349.90, quantidade: 1, imagem: require('../assets/images/icon.png') },
  { id: 2, nome: "Cabo Adaptador USB-C", preco: 59.90, quantidade: 2, imagem: require('../assets/images/icon.png') },
  { id: 3, nome: "Mod de Acessibilidade p/ Jogo X", preco: 29.90, quantidade: 1, imagem: require('../assets/images/icon.png') },
];

export default function MeuCarrinho() {
  const subtotal = itensMock.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

  return (
    <View style={styles.safeContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        
        {/* Título */}
        <Text style={styles.pageTitle}>
          MEU <Text style={styles.textPurple}>CARRINHO</Text>
        </Text>

        {/* Lista de Produtos */}
        <View style={styles.sectionHeader}>
          <Ionicons name="cart-outline" size={24} color="#A855F7" />
          <Text style={styles.sectionTitle}>Produtos no seu pedido</Text>
        </View>

        {itensMock.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            {/* Imagem */}
            <Image source={item.imagem} style={styles.itemImage} />
            
            {/* Detalhes do Produto */}
            <View style={styles.itemDetails}>
              <Text style={styles.itemName} numberOfLines={2}>{item.nome}</Text>
              <Text style={styles.itemUnitPrice}>Unid: R$ {item.preco.toFixed(2)}</Text>
              
              {/* Controles de Quantidade e Preço Total */}
              <View style={styles.itemRow}>
                <View style={styles.qtdContainer}>
                  <TouchableOpacity>
                    <Text style={styles.qtdButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qtdText}>{item.quantidade}</Text>
                  <TouchableOpacity>
                    <Text style={styles.qtdButton}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.itemTotal}>R$ {(item.preco * item.quantidade).toFixed(2)}</Text>
              </View>
            </View>

            {/* Botão de Lixeira */}
            <TouchableOpacity style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={22} color="#71717a" />
            </TouchableOpacity>
          </View>
        ))}

        {/* Resumo do Pedido */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo do Pedido</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R$ {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Frete</Text>
            <Text style={styles.summaryValue}>Calculando...</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Desconto</Text>
            <Text style={[styles.summaryValue, { color: '#4ade80' }]}>R$ 0,00</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R$ {subtotal.toFixed(2)}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>FINALIZAR COMPRA</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continuar Comprando</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  pageTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 30,
  },
  textPurple: {
    color: '#A855F7',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#09090b', // bg-zinc-950
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#18181b', // border-zinc-900
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#27272a',
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemUnitPrice: {
    color: '#a1a1aa',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#27272a',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    gap: 12,
  },
  qtdButton: {
    color: '#A855F7',
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtdText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemTotal: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 5,
  },
  summaryCard: {
    marginTop: 30,
    backgroundColor: '#09090b',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.4)', // border-purple-900/40
  },
  summaryTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
    paddingBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#d4d4d8', // text-zinc-300
    fontSize: 16,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#27272a',
    marginVertical: 15,
  },
  totalLabel: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  totalValue: {
    color: '#A855F7',
    fontSize: 24,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#9333ea', // bg-purple-600
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  continueButton: {
    marginTop: 15,
    alignItems: 'center',
    paddingVertical: 10,
  },
  continueButtonText: {
    color: '#71717a',
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});