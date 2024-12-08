// src/components/UpcomingTransactions.js
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataContext } from "../contexts/DataContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function UpcomingTransactions() {
  const { data } = useContext(DataContext);

  return (
    <View style={styles.section}>
      {data.upcomingTransactions.map((transaction) => (
        <View key={transaction.id} style={styles.transaction}>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionName}>{transaction.name}</Text>
            <Icon name="calendar" size={20} color="#666" />
            <Text style={styles.transactionDate}>{transaction.date}</Text>
          </View>
          <Text style={styles.transactionAmount}>
            ${transaction.amount.toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    flex: 1,
    marginBottom: 16,
    gap: 5,
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
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    borderLeftWidth: 5,
    borderLeftColor: "#FF6B6B", // Red for upcoming transactions
  },
  transactionName: {
    fontSize: 14,
    fontWeight: "600",
  },
  transactionDetails: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: "600",
  },
  transactionDate: {
    fontSize: 12,
    color: "#666",
  },
});
