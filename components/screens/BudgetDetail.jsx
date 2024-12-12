import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatDate } from "../utils/dateUtils"; // Import the utility function
import { formatCurrency } from "../utils/currencyUtils";
import DefaultLayout from "../layout/DefaultLayout";
import Backbar from "../layout/Backbar";

export default function BudgetDetail({ route }) {
  const { budgetItem } = route.params;
  const remainingAmount = budgetItem.amount - budgetItem.spent;
  const spentPercentage = (budgetItem.spent / budgetItem.amount) * 100;

  return (
    <DefaultLayout>
      <Backbar name={`${budgetItem.name} Details`} url="Details" />
      <View style={styles.container}>
        <Text style={styles.title}>{budgetItem.name} Details</Text>
        <View style={styles.card}>
          <Text style={styles.detailText}>
            Total Amount:{" "}
            <Text style={styles.remainingAmount}>
              {formatCurrency(budgetItem.amount)} PKR
            </Text>
          </Text>
          <Text style={styles.detailText}>
            Amount Spent:{" "}
            <Text style={styles.amount}>
              {formatCurrency(budgetItem.spent)} PKR
            </Text>
          </Text>
          <Text style={styles.detailText}>
            Remaining:{" "}
            <Text style={styles.remainingAmount}>
              {formatCurrency(remainingAmount)} PKR
            </Text>
          </Text>
          <View style={styles.progressContainer}>
            <View
              style={[styles.progressBar, { width: `${spentPercentage}%` }]}
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(spentPercentage)}% Spent
          </Text>
          <Text style={styles.detailText}>
            Duration:{" "}
            <Text style={styles.highlight}>{budgetItem.duration}</Text>
          </Text>
          {budgetItem.categories && budgetItem.categories.length > 0 && (
            <Text style={styles.detailText}>
              Categories:{" "}
              <Text style={styles.highlight}>
                {budgetItem.categories.join(", ")}
              </Text>
            </Text>
          )}
          {budgetItem.startDate && budgetItem.endDate && (
            <Text style={styles.detailText}>
              Date Range:{" "}
              <Text style={styles.highlight}>
                {formatDate(budgetItem.startDate)} -{" "}
                {formatDate(budgetItem.endDate)}
              </Text>
            </Text>
          )}
        </View>
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#34c759",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  amount: {
    fontWeight: "bold",
    color: "#FF5722",
  },
  remainingAmount: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#34c759", // A contrasting color for remaining amount
  },
  progressContainer: {
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#34c759",
  },
  progressText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },
  highlight: {
    fontWeight: "600",
    color: "#666",
  },
});
