// src/components/AmountInput.jsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const AmountInput = ({ amount, setAmount }) => {
  return (
    <View style={styles.amountContainer}>
      <TouchableOpacity style={styles.currencyButton}>
        <Text style={styles.currencyText}>USD</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.amountInput}
        value={amount}
        placeholder="0,00"
        placeholderTextColor="#C1C1C1"
        keyboardType="numeric"
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFF",
  },
  currencyButton: {
    padding: 10,
    backgroundColor: "#2BCB79",
    borderRadius: 20,
    marginRight: 10,
  },
  currencyText: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
  },
  amountInput: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
  },
});

export default AmountInput;
