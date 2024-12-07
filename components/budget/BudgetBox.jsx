// src/screens/BudgetBox.js
import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ProgressBar } from "react-native-paper";
import { DataContext } from "../contexts/DataContext";

export default function BudgetBox() {
  const { data } = useContext(DataContext);

  if (!data.budget || data.budget.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Budgets</Text>
        <Text style={styles.subtitle}>No budgets created</Text>
        <TouchableOpacity>
          <Text style={styles.createBudgetButton}>CREATE BUDGET</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budgets</Text>
      <Text style={styles.subtitle}>
        How much I can spend to meet my budget?
      </Text>

      {data.budget.map((budgetItem, index) => {
        const progress = budgetItem.spent / budgetItem.amount;
        return (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{budgetItem.name}</Text>
            <View style={styles.budgetRow}>
              <Text style={styles.budgetText}>{budgetItem.name} budget</Text>
              <Text style={styles.amount}>
                {budgetItem.spent} / {budgetItem.amount} PKR
              </Text>
            </View>
            <ProgressBar progress={progress} color="#34c759" />
          </View>
        );
      })}

      <TouchableOpacity>
        <Text style={styles.createBudgetButton}>CREATE BUDGET</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34c759", // Green title
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34c759", // Green section title
    marginBottom: 8,
  },
  budgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  budgetText: {
    fontSize: 14,
    color: "#333",
  },
  amount: {
    fontSize: 14,
    color: "#333",
  },
  createBudgetButton: {
    fontSize: 14,
    color: "#34c759",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
});
