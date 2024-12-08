// src/components/TransactionCategory.jsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TransactionCategory = ({ category, setCategory }) => {
  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        style={[
          styles.categoryButton,
          category === "expense" && styles.selectedCategory,
        ]}
        onPress={() => setCategory("expense")}
      >
        <Text
          style={[
            styles.categoryText,
            category === "expense" && styles.selectedCategoryText,
          ]}
        >
          Expense
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.categoryButton,
          category === "income" && styles.selectedCategory,
        ]}
        onPress={() => setCategory("income")}
      >
        <Text
          style={[
            styles.categoryText,
            category === "income" && styles.selectedCategoryText,
          ]}
        >
          Income
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
  },
  categoryButton: {
    width: "50%",
    padding: 16,
    backgroundColor: "#16B773",

    // borderRadius: 20,
    // marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: "#008256",
  },
  categoryText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedCategoryText: {
    color: "#FFF",
  },
});

export default TransactionCategory;
