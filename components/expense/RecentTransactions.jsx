// src/components/RecentTransactions.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function RecentTransactions({ transactions }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      {transactions.map((tx) => (
        <View key={tx.id} style={styles.transaction}>
          <Text style={styles.transactionName}>{tx.name}</Text>
          <Text style={styles.transactionAmount}>${tx.amount.toFixed(2)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  transactionName: {
    fontSize: 14,
  },
  transactionAmount: {
    fontSize: 14,
  },
});
