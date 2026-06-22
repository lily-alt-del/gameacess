import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput,   
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  ImageBackground,
  Alert // 👈 Importado para mostrar erros na tela se falhar
} from 'react-native';
import { Link, useRouter } from 'expo-router'; // 👈 Importado o useRouter para redirecionar
import { loginMobile } from '../services/api'; // 👈 Importe sua função de login da API (ajuste o caminho se necessário)

export default function LoginPage() {
  const router = useRouter(); // 👈 Hook para navegação após logar
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  // 🔌 ESTADOS DA API: Capturam o que o usuário digita
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Para desabilitar o botão enquanto processa

  const backgroundImage = require('../assets/images/background.jpg');

  // 🔥 FUNÇÃO DISPARADA AO CLICAR EM ENTRAR
  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      // Envia os dados para o NestJS através do serviço criado
      const data = await loginMobile({ email, password });
      
      console.log("Login com sucesso no Mobile!", data);
      
      // Se deu certo, redireciona para a página principal da loja do app
      router.replace('/'); 
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground 
      source={backgroundImage} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView 
          style={styles.keyboardContainer} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            
            <Link href="/" asChild>
              <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backText}>← Voltar para a loja</Text>
              </TouchableOpacity>
            </Link>

            <View style={styles.card}>
              <Text style={styles.title}>Entrar</Text>
              <Text style={styles.subtitle}>Acesse sua conta para continuar suas compras.</Text>

              {/* Campo Email */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="seu@email.com"
                  placeholderTextColor="#a855f7"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email} // 🔌 Conectado ao estado
                  onChangeText={setEmail} // 🔌 Atualiza o estado ao digitar
                />
              </View>

              {/* Campo Senha */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Senha</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.inputPassword}
                    placeholder="••••••••"
                    placeholderTextColor="#a855f7"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    value={password} // 🔌 Conectado ao estado
                    onChangeText={setPassword} // 🔌 Atualiza o estado ao digitar
                  />
                  <TouchableOpacity 
                    style={styles.eyeButton} 
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '🙈'}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Lembrar de mim */}
              <TouchableOpacity 
                style={styles.rememberContainer} 
                activeOpacity={0.7}
                onPress={() => setRemember(!remember)}
              >
                <View style={[styles.checkbox, remember && styles.checkboxChecked]}>
                  {remember && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.rememberText}>Lembrar de mim</Text>
              </TouchableOpacity>

              {/* Botão Entrar */}
              <TouchableOpacity 
                style={[styles.loginButton, loading && { opacity: 0.7 }]} 
                activeOpacity={0.8}
                onPress={handleLogin} // 🔥 Aciona a chamada da API
                disabled={loading} // Bloqueia cliques repetidos enquanto carrega
              >
                <Text style={styles.loginButtonText}>
                  {loading ? 'Carregando...' : 'Entrar'}
                </Text>
              </TouchableOpacity>

              {/* Divisor "ou" */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>ou</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Links Inferiores */}
              <View style={styles.footerLinks}>
                <View style={styles.registerContainer}>
                  <Text style={styles.noAccountText}>Não tem conta? </Text>
                  <Link href="/register" asChild>
                    <TouchableOpacity>
                      <Text style={styles.registerText}>Cadastre-se</Text>
                    </TouchableOpacity>
                  </Link>
                </View>

                <TouchableOpacity>
                  <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              </View>

            </View>

            <Text style={styles.footerText}>
              Ao entrar, você concorda com nossos Termos de Serviço e Política de Privacidade
            </Text>

          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

// ... Os seus estilos do StyleSheet permanecem idênticos abaixo ...
const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' },
  keyboardContainer: { flex: 1 },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  backButton: { marginBottom: 20, marginTop: 60 },
  backText: { color: '#c084fc', fontSize: 16, fontWeight: '600' },
  card: { backgroundColor: 'rgba(255, 255, 255, 0.06)', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)', shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#e9d5ff', fontSize: 14, marginBottom: 24 },
  inputGroup: { marginBottom: 20 },
  label: { color: '#e9d5ff', fontSize: 14, marginBottom: 8 },
  input: { backgroundColor: '#1a1625', borderWidth: 1, borderColor: '#3b2f5b', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 14, color: '#fff', fontSize: 16 },
  passwordContainer: { position: 'relative', justifyContent: 'center' },
  inputPassword: { backgroundColor: '#1a1625', borderWidth: 1, borderColor: '#3b2f5b', borderRadius: 8, paddingLeft: 16, paddingRight: 50, paddingVertical: 14, color: '#fff', fontSize: 16 },
  eyeButton: { position: 'absolute', right: 16, height: '100%', justifyContent: 'center' },
  eyeIcon: { fontSize: 18 },
  rememberContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 1, borderColor: '#c084fc', marginRight: 10, justifyContent: 'center', alignItems: 'center' },
  checkboxChecked: { backgroundColor: '#9333ea', borderColor: '#9333ea' },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  rememberText: { color: '#d8b4fe', fontSize: 14 },
  loginButton: { backgroundColor: '#9333ea', borderRadius: 8, paddingVertical: 14, alignItems: 'center', marginBottom: 24 },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#3b2f5b' },
  dividerText: { color: '#c084fc', marginHorizontal: 16 },
  footerLinks: { alignItems: 'center', gap: 12 },
  registerContainer: { flexDirection: 'row' },
  noAccountText: { color: '#c084fc' },
  registerText: { color: '#d8b4fe', fontWeight: 'bold' },
  forgotPasswordText: { color: '#c084fc' },
  footerText: { color: '#d1d1d6', fontSize: 12, textAlign: 'center', marginTop: 24, paddingHorizontal: 20, marginBottom: 20 }
});