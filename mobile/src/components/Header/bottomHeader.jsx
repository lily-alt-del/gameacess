import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";

export default function BottomHeader({ }) {
  return (
    <View style={styles.content}>
      <View style={{ paddingStart: "7%", flexDirection: "row", alignItems: "center", gap: 3 }}>
      <input type="text" placeholder="Pesquisar" style={styles.pesquisa} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    borderBottomWidth: 1,
    borderBottomColor: "#6e11b0",
  },
  pesquisa: {
    backgroundColor: "#0f0a1b",
    fontSize: 18,
    margin: 10,
    paddingVertical: 5,
    paddingInline: 15,
    borderRadius: 5,
    borderColor: "#9644d1",
    width: "50%",
    height: 40,
  }
})
