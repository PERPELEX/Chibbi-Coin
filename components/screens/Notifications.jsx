// src/screens/NotificationsScreen.jsx
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Notifications({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.text}>Notifications</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#02192B",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
  },
});
