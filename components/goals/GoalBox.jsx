// src/screens/GoalBox.js
import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ProgressBar } from "react-native-paper";
import { DataContext } from "../contexts/DataContext";

export default function GoalBox() {
  const { data } = useContext(DataContext);

  if (!data.goals || data.goals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Goals</Text>
        <Text style={styles.subtitle}>No goals created</Text>
        <TouchableOpacity>
          <Text style={styles.createGoalButton}>CREATE GOAL</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goals</Text>
      <Text style={styles.subtitle}>
        How much I have saved towards my goals?
      </Text>

      {data.goals.map((goalItem, index) => {
        const progress = goalItem.saved / goalItem.target;
        return (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{goalItem.name}</Text>
            <View style={styles.goalRow}>
              <Text style={styles.goalText}>{goalItem.name} goal</Text>
              <Text style={styles.amount}>
                {goalItem.saved} / {goalItem.target} PKR
              </Text>
            </View>
            <ProgressBar progress={progress} color="#34c759" />
          </View>
        );
      })}

      <TouchableOpacity>
        <Text style={styles.createGoalButton}>CREATE GOAL</Text>
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
  goalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  goalText: {
    fontSize: 14,
    color: "#333",
  },
  amount: {
    fontSize: 14,
    color: "#333",
  },
  createGoalButton: {
    fontSize: 14,
    color: "#34c759",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
});
