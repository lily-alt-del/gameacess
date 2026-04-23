import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import Head from 'expo-router/head';
import Header from '../components/Header';

// 1. IMPORTAÇÕES DA FONTE
import { useFonts, Anton_400Regular } from '@expo-google-fonts/anton';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Impede que a tela de carregamento suma antes da fonte estar pronta
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  // 2. CARREGANDO A FONTE (E apelidando ela de "Anton")
  const [fontsLoaded, error] = useFonts({
    Anton: Anton_400Regular, 
  });

  // 3. EFEITO PARA ESCONDER A TELA DE CARREGAMENTO
  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  // Se a fonte ainda não carregou, não desenha nada na tela
  if (!fontsLoaded && !error) {
    return null; 
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0a1b" />
      <Header />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0a1b',
  }
});