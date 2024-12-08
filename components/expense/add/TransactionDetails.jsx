// src/components/Details.jsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const TransactionDetails = ({ notes, setNotes }) => {
  return (
    <View style={styles.detailsContainer}>
      <TouchableOpacity style={styles.detailItem}>
        <Text style={styles.detailText}>🥑 Food & Drink</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.detailItem}>
        <Text style={styles.detailText}>📅 18 May 2020</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.detailItem}>
        <Text style={styles.detailText}>📝 Notes</Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          placeholder="Notes"
          placeholderTextColor="#C1C1C1"
          onChangeText={(text) => setNotes(text)}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: "#FFF",
    padding: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  notesInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC",
    marginLeft: 10,
  },
});

export default TransactionDetails;
