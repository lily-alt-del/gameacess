import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Header({ pfp }) {
  return (
    <View style={styles.content}>
      <View style={styles.logo}>
        <Image source={pfp} style={styles.pfp} />
        <Text style={styles.name}>AccessGames</Text>
      </View>
      <FontAwesome name="bars" size={25} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingBlock: 30,
    paddingInline: 40,
    justifyContent: "space-between",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  pfp: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "white",
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  }
});
