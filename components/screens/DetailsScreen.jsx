// src/screens/DetailsScreen.js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DefaultLayout from "../layout/HomeLayout";
import BudgetBox from "../budget/BudgetBox";
import GoalBox from "../goals/GoalBox";

export default function DetailsScreen() {
  return (
    <DefaultLayout>
      <View style={styles.container}>
        <Text style={styles.TitleText}>Details</Text>
        <View style={styles.subContainer}>
          <BudgetBox />
          <GoalBox />
        </View>
      </View>
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "start",
    justifyContent: "start",
    backgroundColor: "#f2fff1",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 16,
  },
  TitleText: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "#000",
    paddingVertical: 10,
  },
  subContainer: {
    gap: 20,
  },
});
