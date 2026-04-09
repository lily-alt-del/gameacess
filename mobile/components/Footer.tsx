import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Linking, Platform } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      
      {/* SEÇÃO 1: Redes Sociais */}
      <View style={styles.section}>
        <Text style={styles.titleText}>NOS SIGA NAS REDES SOCIAIS</Text>
        <View style={styles.socialRow}>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="logo-facebook" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="logo-instagram" size={32} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <FontAwesome6 name="x-twitter" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* SEÇÃO 2: Sobre Nós (O Link Roxo) */}
      <View style={styles.section}>
        <Link href="/sobrenos" asChild>
          <TouchableOpacity activeOpacity={0.6} style={styles.linkContainer}>
            <Text style={[styles.titleText, { color: '#a855f7' }]}>SOBRE NÓS</Text>
            <Ionicons name="arrow-forward" size={20} color="#a855f7" style={{ marginLeft: 5 }} />
          </TouchableOpacity>
        </Link>

        {/* Newsletter / WhatsApp */}
        <View style={styles.newsletterRow}>
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="logo-whatsapp" size={35} color="#25D366" />
          </TouchableOpacity>
          
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder="Email" 
              placeholderTextColor="#ccc" 
              style={styles.input}
            />
            <View style={styles.divider} />
            <TouchableOpacity>
              <Ionicons name="send" size={18} color="#ccc" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* SEÇÃO 3: Textos Legais */}
      <View style={styles.legalSection}>
        <Text style={styles.copyrightText}>© 2026 Access Game. Todos os direitos reservados</Text>
        <Text style={styles.legalText}>
          Política de privacidade | Termos de utilização | Access Game / CNPJ: XX.XXX.XXX/YYYY-ZZ / Rua: XXXXXXXXX, ZZZ - Bairro: XXXXX / Caraguatatuba / SP CEP: XXXXX-ZZZ
        </Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 25,
    paddingTop: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#6b21a8',
    marginTop: 'auto', // Garante que empurre para o fim se necessário
  },
  section: {
    marginBottom: 5,
  },
  titleText: {
    fontFamily: 'Anton', // Usando a fonte que configuramos
    color: '#fff',
    fontSize: 22,
    letterSpacing: 1,
    marginBottom: 15,
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsletterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 5,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#52525b',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    borderWidth: 1,
    borderColor: '#71717a',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#71717a',
    marginHorizontal: 10,
  },
  legalSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  copyrightText: {
    color: '#ccc',
    fontSize: 12,
    marginBottom: 8,
  },
  legalText: {
    color: '#666',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 16,
  },
});