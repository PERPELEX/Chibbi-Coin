// src/screens/DetailsScreen.js
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import DefaultLayout from "../layout/DefaultLayout";
import Titlebar from "../layout/Titlebar";
import Footer from "../layout/Footer";
import BudgetBox from "../budget/BudgetBox";
import GoalBox from "../goals/GoalBox";

export default function DetailsScreen() {
  return (
    <DefaultLayout>
      <Titlebar title="Details" />
      <View style={styles.color}>
        <ScrollView
          contentContainerStyle={styles.container} // Move layout styles here
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.subContainer}>
            <BudgetBox />
            <GoalBox />
          </View>
        </ScrollView>
      </View>
      <Footer />
    </DefaultLayout>
  );
}

const styles = StyleSheet.create({
  color: {
    flex: 1,
    backgroundColor: "#2BCB79",
  },
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
    backgroundColor: "2BCB79",
  },
});
