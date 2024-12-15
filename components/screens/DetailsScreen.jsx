// src/screens/DetailsScreen.js
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import HomeLayout from "../layout/HomeLayout";
import BudgetBox from "../budget/BudgetBox";
import GoalBox from "../goals/GoalBox";

export default function DetailsScreen() {
  return (
    <HomeLayout>
      <ScrollView
        contentContainerStyle={styles.container} // Move layout styles here
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.subContainer}>
          <BudgetBox />
          <GoalBox />
        </View>
      </ScrollView>
    </HomeLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "start", // Now inside contentContainerStyle
    justifyContent: "start", // Now inside contentContainerStyle
    backgroundColor: "#f2fff1",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  subContainer: {
    gap: 20,
  },
});
