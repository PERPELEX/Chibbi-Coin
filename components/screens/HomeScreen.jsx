// src/screens/HomeScreen.js
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FullPage from "../expense/FullPage";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FullPage />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    padding: 16,
  },
});
