// src/components/Balance.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Balance({ balance }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>YOUR BALANCE</Text>
      <Text style={styles.balance}>${balance.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
});
