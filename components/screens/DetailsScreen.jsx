// src/screens/DetailsScreen.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BudgetBox from "../budget/BudgetBox";
import GoalBox from "../goals/GoalBox";

export default function DetailsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <BudgetBox />
        <GoalBox />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f2fff1",
  },
  container: {
    flex: 1,
    alignItems: "start",
    justifyContent: "start",
    gap: 40,
    padding: 16,
    // paddingTop: 40,
  },
});
