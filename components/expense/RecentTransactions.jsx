// src/components/RecentTransactions.js
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataContext } from "../contexts/DataContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function RecentTransactions() {
  const { data } = useContext(DataContext);

  return (
    <View style={styles.section}>
      {data.recentTransactions.map((tx) => (
        <View
          key={tx.id}
          style={[
            styles.transaction,
            tx.type === "added"
              ? styles.transactionAdded
              : styles.transactionDeducted,
          ]}
        >
          <Text style={styles.transactionName}>{tx.name}</Text>
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionAmount}>
              ${tx.amount.toFixed(2)}
            </Text>
            {tx.type === "added" ? (
              <Icon name="arrow-up" size={20} color="#2BCB79" />
            ) : (
              <Icon name="arrow-down" size={20} color="#FF6B6B" />
            )}
          </View>
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
    borderLeftWidth: 5, // Add left border width
  },
  transactionAdded: {
    borderLeftColor: "#2BCB79", // Green for added transactions
  },
  transactionDeducted: {
    borderLeftColor: "#FF6B6B", // Red for deducted transactions
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
});
