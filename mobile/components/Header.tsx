import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function Header() {
  return (
    <View style={styles.headerContainer}>
      
      {/* LOGO: Adicionado activeOpacity={0.7} para imitar o hover:opacity-80 */}
      <Link href="/" asChild>
        <TouchableOpacity activeOpacity={0.7} style={styles.logoContainer}>
          <Image source={require('../assets/images/logoaccess1.gif')} style={styles.logoImage} />
          <Text style={styles.logoText}>AccessGame</Text>
        </TouchableOpacity>
      </Link>

      {/* ÍCONES */}
      <View style={styles.iconsContainer}>
        
        <Link href="/carrinho" asChild>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
            <Ionicons name="cart-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </Link>

        <TouchableOpacity activeOpacity={0.7} style={styles.iconButton}>
          <Ionicons name="person-outline" size={28} color="#fff" />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0f0a1b',
    // 1. MAIOR GAP NAS BORDAS E HEADER MAIS ALTO:
    paddingHorizontal: Platform.OS === 'web' ? '15%' : 20, // Aumentei de 20 para 30 (afasta mais da beirada)
    paddingVertical: Platform.OS === 'web' ? 47 : 20,   // Aumentei de 15 para 25 (deixa a barra bem mais alta)
    borderBottomWidth: 1,
    borderBottomColor: '#6b21a8', 
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // Aumentei um pouquinho o espaço entre a foto e o texto
  },
  logoImage: {
    // 2. AUMENTEI A LOGO PARA ACOMPANHAR A ALTURA DO HEADER
    width: 45, 
    height: 45,
    resizeMode: 'contain',
  },
  logoText: {
    color: '#e9d5ff', 
    fontSize: 22, // Texto ligeiramente maior
    fontFamily: 'Anton', 
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20, // Aumentei a distância entre o carrinho e o perfil
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});