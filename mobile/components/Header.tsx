import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [produtosAberto, setProdutosAberto] = useState(false);

  return (
    <View style={styles.headerWrapper}>
      {/* BARRA SUPERIOR FIXA */}
      <View style={styles.topBar}>
        
        {/* 1. ESQUERDA: Logo Isolada com a Imagem de volta! */}
        <Link href="/" asChild>
          <TouchableOpacity style={styles.logoContainer}>
            <Image 
              source={require('../assets/images/logoaccess1.gif')} // Verifique se o caminho da sua imagem é esse mesmo
              style={{ width: 100, height: 100, resizeMode: 'contain' }} 
            />
            <Text style={styles.logoText}>ACCESSGAME</Text>
          </TouchableOpacity>
        </Link>

        {/* 2. DIREITA: Agrupamento do Menu + Ícones */}
        <View style={styles.rightIconsGroup}>
          
          {/* Botão Sanduíche (Agora colado na esquerda do carrinho) */}
          <TouchableOpacity 
            onPress={() => setMenuAberto(!menuAberto)}
            style={styles.iconButton}
          >
            <Ionicons name={menuAberto ? "close" : "menu"} size={32} color="#fff" />
          </TouchableOpacity>

          {/* Carrinho */}
          <Link href="/carrinho" asChild>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="cart-outline" size={28} color="#fff" />
            </TouchableOpacity>
          </Link>
          
          {/* Perfil */}
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="person-outline" size={26} color="#fff" />
          </TouchableOpacity>
          
        </View>

      </View>

      {/* MENU FLUTUANTE */}
      {menuAberto && (
        <View style={styles.dropdownMenu}>
          
          <Link href="/" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>
          </Link>

          {/* ITEM PRODUTOS */}
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => setProdutosAberto(!produtosAberto)}
          >
            <Text style={[styles.menuText, produtosAberto && styles.textPurple]}>
              Produtos
            </Text>
            <Ionicons 
              name={produtosAberto ? "chevron-up" : "chevron-down"} 
              size={20} 
              color={produtosAberto ? "#A855F7" : "#fff"} 
            />
          </TouchableOpacity>

          {/* SUB-MENU (Com o "as any" para evitar a linha vermelha de erro) */}
          {produtosAberto && (
            <View style={styles.subMenu}>
              <Link href={"/produtos/camisetas" as any} asChild>
                <TouchableOpacity style={styles.subMenuItem}>
                  <Ionicons name="shirt-outline" size={18} color="#A855F7" />
                  <Text style={styles.subMenuText}>Camisetas</Text>
                </TouchableOpacity>
              </Link>
              
              <Link href={"/produtos/moletons" as any} asChild>
                <TouchableOpacity style={styles.subMenuItem}>
                  <MaterialCommunityIcons name="layers-outline" size={20} color="#A855F7" />
                  <Text style={styles.subMenuText}>Moletons</Text>
                </TouchableOpacity>
              </Link>

              <Link href={"/produtos/perifericos" as any} asChild>
                <TouchableOpacity style={styles.subMenuItem}>
                  <Ionicons name="game-controller-outline" size={18} color="#A855F7" />
                  <Text style={styles.subMenuText}>Periféricos</Text>
                </TouchableOpacity>
              </Link>

              <Link href={"/produtos/colecionaveis" as any} asChild>
                <TouchableOpacity style={styles.subMenuItem}>
                  <Ionicons name="cube-outline" size={18} color="#A855F7" />
                  <Text style={styles.subMenuText}>Colecionáveis</Text>
                </TouchableOpacity>
              </Link>
            </View>
          )}

          <Link href="/sobrenos" asChild>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Sobre Nós</Text>
            </TouchableOpacity>
          </Link>

        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#6b21a8',
    zIndex: 100, 
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Joga Logo pra esquerda e Ícones pra direita
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    color: '#d8b4fe',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Anton',
    textTransform: 'uppercase',
  },
  
  /* O agrupamento da direita */
  rightIconsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // Espaço entre o sanduíche, carrinho e perfil
  },
  iconButton: {
    padding: 5,
  },
  
  dropdownMenu: {
    position: 'absolute',
    top: '100%', 
    left: 0,
    right: 0,
    backgroundColor: '#0f0a1b',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#6b21a8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
  },
  menuText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPurple: {
    color: '#A855F7',
  },
  subMenu: {
    backgroundColor: '#09090b',
    borderRadius: 8,
    marginTop: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 12,
  },
  subMenuText: {
    color: '#d4d4d8',
    fontSize: 16,
  },
});