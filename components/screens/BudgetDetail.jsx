import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { DataContext } from "../contexts/DataContext"; // Import the context
import { formatDate } from "../utils/dateUtils"; // Import the utility function
import { formatCurrency } from "../utils/currencyUtils";
import DefaultLayout from "../layout/DefaultLayout";
import Backbar from "../layout/Backbar";

export default function BudgetDetail({ route }) {
  const { budgetItem } = route.params;
  const { deleteBudget } = useContext(DataContext); // Get deleteBudget from context

  const remainingAmount = budgetItem.amount - budgetItem.spent;
  const spentPercentage = (budgetItem.spent / budgetItem.amount) * 100;

  const handleDeleteBudget = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this budget?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteBudget(budgetItem.id), // Call deleteBudget on confirmation
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <DefaultLayout>
      <Backbar name={`${budgetItem.name} Details`} url="Details" />
      <View style={styles.container}>
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

        {/* Delete Budget Button */}
        <TouchableOpacity style={styles.button} onPress={handleDeleteBudget}>
          <Text style={styles.buttonText}>Delete Budget</Text>
        </TouchableOpacity>
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F1F8E9",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
    lineHeight: 22,
  },
  amount: {
    fontWeight: "bold",
    color: "#FF5722",
  },
  remainingAmount: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#2BCB79",
  },
  progressContainer: {
    height: 15,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 15,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#2BCB79",
  },
  progressText: {
    textAlign: "center",
    fontWeight: "500",
    color: "#333",
    marginTop: 5,
  },
  highlight: {
    fontWeight: "600",
    color: "#666",
  },
  button: {
    backgroundColor: "#2BCB79", // Red color for delete button
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
