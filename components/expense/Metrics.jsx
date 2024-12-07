// src/components/Metrics.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Metrics({ income, expense }) {
  return (
    <View style={styles.row}>
      <View style={styles.metric}>
        <Text style={styles.metricLabel}>Income</Text>
        <Text style={styles.metricValue}>${income.toFixed(2)}</Text>
      </View>
      <View style={styles.metric}>
        <Text style={styles.metricLabel}>Expense</Text>
        <Text style={styles.metricValue}>${expense.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  metric: {
    flex: 1,
    alignItems: "center",
  },
  metricLabel: {
    fontSize: 14,
    color: "#666",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
