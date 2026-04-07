import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";


export default function BottomHeader({ }) {
  return (
    <View style={styles.content}>
      <Text style={styles.texto}>Pesquisar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  texto: {
    color: "white",
    fontSize: 18,
    paddingHorizontal: 40,
    paddingVertical: 10,
  }
})
