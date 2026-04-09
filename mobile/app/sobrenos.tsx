import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Footer from '../components/Footer';

// No Mobile, as imagens precisam do 'require' se estiverem na pasta assets local
const equipe = [
  { id: '1', nome: "ARION PESSIN", descricao: "bla bla bla", imagem: require('../assets/images/integrantes/arion.png') },
  { id: '2', nome: "GABRIEL PASSARI", descricao: "bla bla bla", imagem: require('../assets/images/integrantes/gabriel.png') },
  { id: '3', nome: "HENRIQUE JOSHUA", descricao: "bla bla bla", imagem: require('../assets/images/integrantes/henrique.png') },
  { id: '4', nome: "LILY", descricao: "bla bla bla", imagem: require('../assets/images/integrantes/lily.png') },
  { id: '5', nome: "MARIA EDUARDA", descricao: "bla bla bla", imagem: require('../assets/images/integrantes/maria.png') },
  { id: '6', nome: "SABRINA KAORI", descricao: "bla bla bla", imagem: require('../assets/images/integrantes/sabrina.png') },
];

export default function SobreNos() {
  return (
    <View style={styles.safeContainer}>
      
      {/* 1. APENAS UM SCROLLVIEW ABRAÇANDO TUDO */}
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={{ flexGrow: 1 }}
      >
      
        {/* 2. UMA VIEW INTERNA PARA O CONTEÚDO (Para dar o padding) */}
        <View style={styles.content}>
          
          {/* SEÇÃO 1: JOGAR É PARA TODOS */}
          <View style={styles.section}>
            {/* Retângulo de Vídeo/Imagem */}
            <View style={styles.videoPlaceholder}>
              <Text style={{ color: '#555' }}>Placeholder Vídeo / Imagem</Text>
            </View>

            <Text style={styles.mainTitle}>
              JOGAR É PARA TODOS.{"\n"}
              <Text style={{ color: '#A855F7' }}>SEM EXCEÇÕES</Text>
            </Text>

            <View style={styles.textBlock}>
              <Text style={styles.paragraph}>
                Na Access Game, acreditamos que a diversidade de jogadores é o que torna a comunidade incrível, mas sabemos que nem todo jogo nasce pronto para todos os controles. Por isso, nosso foco é quebrar barreiras.
              </Text>
              <Text style={styles.paragraph}>
                Desenvolvemos mods de acessibilidade pensados sob medida para quem precisa de adaptações motoras, visuais ou cognitivas.
              </Text>
              
              {/* Missão com a bordinha roxa lateral */}
              <View style={styles.missionCard}>
                <Text style={styles.missionText}>
                  Nossa missão é simples: se você quer jogar, nós damos um jeito.
                </Text>
              </View>
            </View>
          </View>

          {/* SEÇÃO 2: INTEGRANTES */}
          <View style={styles.teamSection}>
            <View style={styles.teamHeader}>
              <Text style={styles.teamTitle}>CONHEÇA NOSSOS INTEGRANTES</Text>
              <View style={styles.divider} />
            </View>

            {/* CONTAINER EM FORMATO DE GRADE */}
            <View style={styles.teamGrid}>
              {equipe.map((membro) => (
                <View key={membro.id} style={styles.memberCardGrid}>
                  <Image source={membro.imagem} style={styles.avatarGrid} />
                  <View style={styles.memberInfoGrid}>
                    <Text style={styles.memberNameGrid}>{membro.nome}</Text>
                    <Text style={styles.memberDescGrid}>{membro.descricao}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Espaço extra no fim do conteúdo antes do Footer */}
          <View style={{ height: 40 }} />
        
        </View>

        {/* 3. O FOOTER AQUI NO FINALZINHO DO SCROLL */}
        <Footer />

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
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 40,
  },
  videoPlaceholder: {
    width: '100%',
    height: 220,
    backgroundColor: '#27272a',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#3f3f46',
  },
  mainTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    lineHeight: 34,
    marginBottom: 20,
  },
  textBlock: {
    gap: 15,
  },
  paragraph: {
    color: '#a1a1aa',
    fontSize: 16,
    lineHeight: 24,
  },
  missionCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#A855F7',
    paddingLeft: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    marginTop: 10,
  },
  missionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  teamSection: {
    marginTop: 50,
  },
  teamHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
  },
  teamTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#27272a',
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between', 
  },
  memberCardGrid: {
    width: '48%', 
    alignItems: 'center', 
    marginBottom: 35,
  },
  avatarGrid: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#27272a',
    marginBottom: 12, 
  },
  memberInfoGrid: {
    alignItems: 'center',
  },
  memberNameGrid: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  memberDescGrid: {
    color: '#a1a1aa', 
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 4,
  },
});