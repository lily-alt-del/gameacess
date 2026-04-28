import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  KeyboardAvoidingView, Platform, ScrollView, ImageBackground 
} from 'react-native';
import { Link } from 'expo-router';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Estados do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const backgroundImage = require('../assets/images/background.jpg');

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <KeyboardAvoidingView style={styles.keyboardContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            {/* Botão Voltar para a loja */}
            <Link href="/" asChild>
              <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backText}>← Voltar para a loja</Text>
              </TouchableOpacity>
            </Link>

            <View style={styles.card}>
              <Text style={styles.title}>Cadastrar</Text>
              <Text style={styles.subtitle}>Crie sua conta para começar a comprar.</Text>

              {/* Nome Completo */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="Seu nome completo" 
                  placeholderTextColor="#a855f7"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="seu@email.com" 
                  placeholderTextColor="#a855f7" 
                  keyboardType="email-address" 
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Senha */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Senha</Text>
                <View style={styles.passwordContainer}>
                  <TextInput 
                    style={styles.inputPassword} 
                    placeholder="••••••••" 
                    placeholderTextColor="#a855f7" 
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
                    <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Confirmar Senha */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirmar Senha</Text>
                <View style={styles.passwordContainer}>
                  <TextInput 
                    style={styles.inputPassword} 
                    placeholder="••••••••" 
                    placeholderTextColor="#a855f7" 
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <TouchableOpacity style={styles.eyeButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <Text style={styles.eyeIcon}>{showConfirmPassword ? '👁️' : '🙈'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Termos (Checkbox customizado) */}
              <TouchableOpacity style={styles.termsContainer} activeOpacity={0.7} onPress={() => setTermsAccepted(!termsAccepted)}>
                <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
                  {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  Concordo com os Termos de Serviço e Política de Privacidade
                </Text>
              </TouchableOpacity>

              {/* Botão Cadastrar */}
              <TouchableOpacity style={styles.registerButton} activeOpacity={0.8}>
                <Text style={styles.registerButtonText}>Cadastrar</Text>
              </TouchableOpacity>

              {/* Divisor "ou" */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ou</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* ======= AQUI ESTÁ O PING-PONG PARA O LOGIN ======= */}
              <View style={styles.loginLinkContainer}>
                <Text style={styles.haveAccountText}>Já tem conta? </Text>
                <Link href="/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.loginLinkText}>Faça login</Text>
                  </TouchableOpacity>
                </Link>
              </View>

            </View>

            {/* Footer */}
            <Text style={styles.footerText}>
              Seus dados são protegidos e nunca serão compartilhados com terceiros
            </Text>

          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

// Estilos padronizados para manter a identidade visual do Login
const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' },
  keyboardContainer: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  backButton: { marginBottom: 20, marginTop: 40 },
  backText: { color: '#c084fc', fontSize: 14, fontWeight: '600' },
  card: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#c084fc', fontSize: 14, marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  label: { color: '#e9d5ff', fontSize: 14, marginBottom: 8, fontWeight: '500' },
  input: { backgroundColor: '#1a1625', borderWidth: 1, borderColor: '#3b2f5b', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12, color: '#fff', fontSize: 16 },
  passwordContainer: { position: 'relative', justifyContent: 'center' },
  inputPassword: { backgroundColor: '#1a1625', borderWidth: 1, borderColor: '#3b2f5b', borderRadius: 8, paddingLeft: 16, paddingRight: 50, paddingVertical: 12, color: '#fff', fontSize: 16 },
  eyeButton: { position: 'absolute', right: 16, height: '100%', justifyContent: 'center' },
  eyeIcon: { fontSize: 18 },
  termsContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginTop: 8 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: '#c084fc', marginRight: 10, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#9333ea', borderColor: '#9333ea' },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  termsText: { color: '#d8b4fe', fontSize: 12, flex: 1, lineHeight: 18 },
  registerButton: { backgroundColor: '#9333ea', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginBottom: 24 },
  registerButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#3b2f5b' },
  dividerText: { color: '#c084fc', marginHorizontal: 16 },
  loginLinkContainer: { flexDirection: 'row', justifyContent: 'center' },
  haveAccountText: { color: '#c084fc', fontSize: 14 },
  loginLinkText: { color: '#d8b4fe', fontSize: 14, fontWeight: 'bold' },
  footerText: { color: '#fff', fontSize: 12, textAlign: 'center', marginTop: 30, paddingHorizontal: 20 }
});