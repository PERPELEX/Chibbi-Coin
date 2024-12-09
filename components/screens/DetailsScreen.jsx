// src/screens/DetailsScreen.js
import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BudgetBox from "../budget/BudgetBox";
import GoalBox from "../goals/GoalBox";

const DATA = [
  { id: "1", component: <BudgetBox /> },
  { id: "2", component: <GoalBox /> },
  // Add more components here if needed
];

export default function DetailsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => item.component}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2fff1",
  },
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 16,
    gap: 40,
  },
});
