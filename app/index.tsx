import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import BASE_URL from "../src/constants/baseUrl";

export default function Index() {
  let getCars = axios({
    method: "get",
    url: BASE_URL,
  }).then((resposta) => {
    console.log(resposta.data);
  });

  return (
    <View style={styles.container}>
      <View>
        <Text>CARROS</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
