// src/components/UpcomingExpenses.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function UpcomingExpenses({ expenses }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Upcoming Expenses</Text>
      {expenses.map((expense) => (
        <View key={expense.id} style={styles.expense}>
          <Text style={styles.expenseName}>{expense.name}</Text>
          <Text style={styles.expenseAmount}>${expense.amount.toFixed(2)}</Text>
          <Text style={styles.expenseDate}>{expense.date}</Text>
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
  expense: {
    paddingVertical: 8,
  },
  expenseName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  expenseAmount: {
    fontSize: 14,
  },
  expenseDate: {
    fontSize: 12,
    color: "#666",
  },
});
